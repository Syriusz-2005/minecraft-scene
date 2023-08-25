import ActionTree, { Action, ActionConfig, CompileResult } from "../ActionTree.js";
import { VMath, Vector } from "../utils/Vector.js";


export type PathConfig = {
  pos: Vector;
  radius: number;
  tickSideEffect?: string;
}

export default class UsePath implements Action {
  constructor(
    private pathConfig: PathConfig,
  ) {}

  public async compile(config: ActionConfig): CompileResult {
    const {scene} = config;
    const {pathConfig} = this;
    let index = config.functionIndex;
    
    const {name, reference} = scene.getFunction(config.branchIndex, ++index, 'path-tick');

    await ActionTree.appendAction(config, `
      function ${reference}
    `);

    const {name: endFunctionName, reference: endFunctionReference} = scene.getFunction(config.branchIndex, ++index);

    const {name: positionedFunctionName, reference: positionedFunctionRef} = scene.getFunction(config.branchIndex, index, 'positioned-tick');


    await scene.mkFile(name, `

      execute positioned ${VMath.toString(pathConfig.pos)} if entity @p[tag=w.player,distance=..${pathConfig.radius}] run function ${endFunctionReference}
      execute positioned ${VMath.toString(pathConfig.pos)} if entity @p[tag=w.player,distance=..${pathConfig.radius}] run return 1


      execute positioned ${VMath.toString(pathConfig.pos)} run function ${positionedFunctionRef}

      schedule function ${reference} 1t
    `);

    await scene.mkFile(positionedFunctionName, `
      particle minecraft:glow_squid_ink ~ ~25 ~ .1 20 .1 0 13 force
      particle minecraft:happy_villager ~ ~ ~ ${pathConfig.radius / 2} 0 ${pathConfig.radius / 2} 0 1 normal

      ${pathConfig.tickSideEffect ?? ''}
    `);

    await scene.mkFile(endFunctionName, `
      execute as @a at @s run playsound minecraft:entity.experience_orb.pickup master @s ~ ~ ~
      particle minecraft:happy_villager ~ ~.3 ~ ${pathConfig.radius / 2} 0.3 ${pathConfig.radius / 2} 0 300 normal

      #Run after the UsePath
    `);

    return {
      endFunctionIndex: index,
    }
  }
}