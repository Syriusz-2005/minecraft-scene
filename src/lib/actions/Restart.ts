import ActionTree, { Action, ActionConfig, CompileResult } from "../ActionTree.js";


export default class Restart implements Action {
  constructor() {}

  public async compile(config: ActionConfig): CompileResult {
    
    const ref = config.scene.getFunctionReference(0, 0);

    await ActionTree.appendAction(config, `
      function ${ref} 
      return 1
    `);


    return {
      endFunctionIndex: config.functionIndex,
    }
  }
}