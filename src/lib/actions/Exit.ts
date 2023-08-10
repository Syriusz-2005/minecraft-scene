import ActionTree, { Action, ActionConfig, CompileResult } from "../ActionTree.js";


export default class Exit implements Action {
  constructor() {}

  public async compile(config: ActionConfig): CompileResult {
    
    await ActionTree.appendAction(config, 'return 1');


    return {
      endFunctionIndex: config.functionIndex,
    }
  }
}