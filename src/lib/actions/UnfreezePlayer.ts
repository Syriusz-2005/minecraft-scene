

import ActionTree, { Action, ActionConfig, CompileResult } from "../ActionTree.js";



export default class UnfreezePlayer implements Action {
  constructor() {}

  public static get Commands() {
    return `
      execute as @a[tag=w.freeze] run attribute @s generic.movement_speed modifier remove 496bc503-8f07-4358-bd91-96de6b16f273
      tag @a[tag=w.player] remove w.freeze
      kill @e[tag=w.freezer]
    `
  }

  public async compile(config: ActionConfig): CompileResult {
    const {scene} = config;
    let index = config.functionIndex;

    await ActionTree.appendAction(config, `
      execute as @a[tag=w.freeze] run attribute @s generic.movement_speed modifier remove 496bc503-8f07-4358-bd91-96de6b16f273
      tag @a[tag=w.player] remove w.freeze
      kill @e[tag=w.freezer]
    `);

    return {
      endFunctionIndex: index,
    }
  }
}