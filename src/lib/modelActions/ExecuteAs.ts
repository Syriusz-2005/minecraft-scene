import ActionTree, { Action, ActionConfig, CompileResult } from "../ActionTree.js";
import EntityModel from "../utils/EntityModel.js";
import Position from "../utils/Position.js";


export default class ExecuteAsModel implements Action {
  constructor(
    private model: EntityModel,
    private singleCommand: string,
  ) {}

  public async compile(config: ActionConfig): CompileResult {

    await ActionTree.appendAction(config, `
      execute as @e[tag=${this.model.id}] at @s run ${this.singleCommand}
    `);

    return {
      endFunctionIndex: config.functionIndex,
    }
  }
}