import ActionTree, { Action, ActionConfig, CompileResult } from "../ActionTree.js";
import { PathOptions } from "../utils/Pathfinder.js";
import { VMath, Vector } from "../utils/Vector.js";


export default class MovePathfinderTo implements Action {
  constructor(
    private pathfinderTag: string,
    private pos: Vector,
    private options: PathOptions,
  ) {}

  public async compile(config: ActionConfig): CompileResult {
    const {scene, functionIndex} = config;
    const {options, pos, pathfinderTag} = this;
    
    let index = functionIndex;

    const {name, reference} = scene.getFunction(config.branchIndex, ++index, 'wait-for-pathfinder');

    await ActionTree.appendAction(config, `
      #MovePathfinderTo action start

      execute as @e[tag=${pathfinderTag}] run data merge entity @s {WanderTarget: {X:${pos[0]},Y:${pos[1]},Z:${pos[2]}}}
      execute as @e[tag=${pathfinderTag}] run attribute @s minecraft:generic.movement_speed base set ${options.speed}
    
      function ${reference}
    `);

    const {name: endFunctionName, reference: endFunctionReference} = scene.getFunction(config.branchIndex, ++index);

    const successHolder = `#pathfinder.${config.branchIndex ?? 0}-${config.functionIndex}.${config.sceneIndex} w.internal`;

    await scene.mkFile(name, `
      execute store success score ${successHolder} run execute positioned ${VMath.toString(pos)} if entity @e[tag=${pathfinderTag},distance=..${options.successRadius}]

      execute if score ${successHolder} matches 1 run function ${endFunctionReference}
      execute if score ${successHolder} matches 1 run return 1
      
      schedule function ${reference} 1t
    `);

    await scene.mkFile(endFunctionName, `
      #run after Pathfinder path completion
    `);


    return {
      endFunctionIndex: index,
    }
  }
}