

import { Action, ActionConfig, CompileResult } from "../ActionTree";



export default class UnfreezePlayer implements Action {
  constructor() {}

  public async compile(config: ActionConfig): CompileResult {
    const {scene} = config;
    let index = config.functionIndex;

    await scene.appendToFile(`${index}.mcfunction`, `
      execute as @a[tag=w.freeze] run attribute @s generic.movement_speed modifier remove 496bc503-8f07-4358-bd91-96de6b16f273

      tag @a[tag=w.player] remove w.freeze


      kill @e[tag=w.freezer]
    `);

    return {
      endFunctionIndex: index,
    }
  }
}