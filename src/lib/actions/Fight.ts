import { randomUUID } from "crypto";
import ActionTree, { Action, ActionConfig, CompileResult } from "../ActionTree.js";


export type FightConfig = {
  prepareEffect: Action | string;
  startEffect?: string;
  skipFirstTimePreparation: boolean;
  /**
   * @default {true}
   */
  setSpawnpoint?: boolean;
  endWhenSuccess: string;
}

export default class Fight implements Action {
  constructor(
    private fightConfig: FightConfig, 
  ) {}

  public async compile(config: ActionConfig): CompileResult {
    let index = config.functionIndex;
    const {scene} = config;
    const {fightConfig} = this;
    const spawnpointSet = fightConfig.setSpawnpoint === false ? false : true;

    const triesScoreholder = `#fight.${config.sceneIndex}.${config.branchIndex ?? 0}-${config.functionIndex} w.internal`;
    const delayedFightStartScore = `#fight.${config.sceneIndex}.${config.branchIndex ?? 0}-${config.functionIndex}.delayed w.internal`;

    const {name: prepareFightName, reference: prepareFightRef} = scene.getFunction(config.branchIndex, config.functionIndex, 'prepare-fight');
    
    const {name: startFightName, reference: startFightRef} = scene.getFunction(config.branchIndex, index, 'start-fight');


    if (typeof fightConfig.prepareEffect === 'string') {
      await scene.mkFile(prepareFightName, `
        ${fightConfig.prepareEffect}
        execute unless score ${delayedFightStartScore} matches 1.. run function ${startFightRef}
      `);
    } else {
      await scene.mkFile(prepareFightName, `
        function ${scene.getFunctionReference((config.branchIndex ?? 0) + 1, 0)}
      `);
      const {endFunctionIndex} = await fightConfig.prepareEffect.compile({
        ...config,
        branchIndex: (config.branchIndex ?? 0) + 1,
        functionIndex: 0,
      });
      await scene.appendToFile(`${(config.branchIndex ?? 0) + 1}-${endFunctionIndex}`, `
        #injected by Fight action  
        execute unless score ${delayedFightStartScore} matches 1.. run function ${startFightRef}
      `);
    }


    await ActionTree.appendAction(config, `
      ${spawnpointSet ? 'execute as @a[tag=w.player] at @s run spawnpoint @s ~ ~ ~' : ''}
      
      scoreboard players set ${delayedFightStartScore} 0
      ${fightConfig.skipFirstTimePreparation ? `
        execute unless score ${triesScoreholder} matches 1.. run function ${prepareFightRef}
      ` : `
        function ${prepareFightRef}
      `}
    `);

    const {name: fightTickName, reference: fightTickRef} = scene.getFunction(config.branchIndex, index, 'tick-fight');
    const {name: processDeathName, reference: processDeathRef} = scene.getFunction(config.branchIndex, index, 'process-death');
    const {name: processReborningName, reference: processReborningRef} = scene.getFunction(config.branchIndex, index, 'process-reborning');
    const {name: endFunctionName, reference: endFunctionRef} = scene.getFunction(config.branchIndex, ++index);

    await scene.mkFile(startFightName, `
      ${fightConfig.startEffect ?? ''}
      function ${fightTickRef}
    `);

    await scene.mkFile(fightTickName, `
      execute if entity @a[tag=w.player,scores={w.death=1..}] run function ${processDeathRef}
      execute if entity @a[tag=w.player,scores={w.death=1..}] run return 1


      execute store success score #fight.success w.internal run ${fightConfig.endWhenSuccess}
      execute if score #fight.success w.internal matches 1.. run function ${endFunctionRef}
      execute if score #fight.success w.internal matches 1.. run return 1

      schedule function ${fightTickRef} 1t
    `);

    await scene.mkFile(processDeathName, `
      scoreboard players set ${delayedFightStartScore} 1
      function ${prepareFightRef}

      schedule function ${processReborningRef} 3s
    `)

    await scene.mkFile(processReborningName, `
      function ${startFightRef}
    `);

    await scene.mkFile(endFunctionName, `
      #Run after Fight action
    `);

    return {
      endFunctionIndex: index,
    }
  }
}