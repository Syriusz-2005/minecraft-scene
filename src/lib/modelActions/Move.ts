import ActionTree, { Action, ActionConfig, CompileResult } from "../ActionTree.js";
import EntityModel from "../utils/EntityModel.js";
import { Vector } from "../utils/Vector.js";


export default class MoveModel implements Action {
  constructor(
    private model: EntityModel,
    private pos: Vector,
    private time: number,
  ) {}

  public async compile(config: ActionConfig): CompileResult {
    const {scene} = config;

    let index = config.functionIndex;
    const {name, reference} = scene.getFunction(config.branchIndex, index, 'move');

    const scoreHolderName = `#w.model.move.${config.branchIndex ?? 0}-${config.functionIndex}.tick`;
    const xDistanceScore = `#w.model.move.${config.branchIndex ?? 0}-${config.functionIndex}.distanceX`;
    const zDistanceScore = `#w.model.move.${config.branchIndex ?? 0}-${config.functionIndex}.distanceZ`;

    const {pos, time, model} = this;
    
    const ticks = Math.round(time * 20);
    const SCALE = 10000;

    const storage = `w:model/${config.branchIndex ?? 0}-${config.functionIndex}-${config.sceneIndex}`;

    await ActionTree.appendAction(config, `
      scoreboard players set ${scoreHolderName} w.internal 0

      execute store result score %posX w.internal run data get entity @e[tag=${model.id},limit=1] Pos[0] ${SCALE}
      execute store result score %posZ w.internal run data get entity @e[tag=${model.id},limit=1] Pos[2] ${SCALE}
      
      scoreboard players set %destinationX w.internal ${Math.round(pos[0] * SCALE)}
      scoreboard players set %destinationZ w.internal ${Math.round(pos[2] * SCALE)}

      scoreboard players operation ${xDistanceScore} w.internal = %destinationX w.internal
      scoreboard players operation ${zDistanceScore} w.internal = %destinationZ w.internal

      scoreboard players operation ${xDistanceScore} w.internal -= %posX w.internal
      scoreboard players operation ${zDistanceScore} w.internal -= %posZ w.internal

      scoreboard players set %ticksCount w.internal ${ticks}

      scoreboard players operation ${xDistanceScore} w.internal /= %ticksCount w.internal
      scoreboard players operation ${zDistanceScore} w.internal /= %ticksCount w.internal

      execute store result storage ${storage} xDeltaPerTick double 0.0001 run scoreboard players get ${xDistanceScore} w.internal
      execute store result storage ${storage} zDeltaPerTick double 0.0001 run scoreboard players get ${zDistanceScore} w.internal

      data modify storage ${storage} xDeltaPerTick set string storage ${storage} xDeltaPerTick 0 -1
      data modify storage ${storage} zDeltaPerTick set string storage ${storage} zDeltaPerTick 0 -1

      function ${reference} with storage ${storage}
    `);

    
    const {name: name1, reference: reference1} = scene.getFunction(config.branchIndex, index, 'as-model');
    const {name: name2, reference: reference2} = scene.getFunction(config.branchIndex, ++index);

    await scene.mkFile(name, `
    
      execute if score ${scoreHolderName} w.internal matches ${ticks}.. run function ${reference2}
      execute if score ${scoreHolderName} w.internal matches ${ticks}.. run return 1

      $execute as @e[tag=${model.id}] at @s facing ${pos[0]} ${pos[1]} ${pos[2]} run tp @s ~$(xDeltaPerTick) ~ ~$(zDeltaPerTick)
    
      scoreboard players add ${scoreHolderName} w.internal 1
      schedule function ${reference} 1t
    `);


    await scene.mkFile(name1, `
      
    `);


    await scene.mkFile(name2, `
      #run by move model action
    `);

    return {
      endFunctionIndex: index,
    }
  }
}