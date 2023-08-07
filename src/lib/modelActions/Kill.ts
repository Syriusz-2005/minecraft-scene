import ActionTree, { Action, ActionConfig, CompileResult } from "../ActionTree.js";
import EntityModel from "../utils/EntityModel.js";


export class KillModel implements Action {
  constructor(
    private readonly model: EntityModel
  ) {}

  public async compile(config: ActionConfig): CompileResult {

    ActionTree.appendAction(config, `
      execute as @e[tag=${this.model.id}] run function animated_java:guardian_poc/remove/this
    `);

    return {
      endFunctionIndex: config.functionIndex,
    }
  }
}