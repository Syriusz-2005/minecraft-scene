import ActionTree, { Action, ActionConfig, CompileResult } from "../ActionTree.js";

/**
 * Restarts the whole scene or just the current branch
 */
export default class Restart implements Action {
  constructor(private branchOnly = false) {}

  public async compile(config: ActionConfig): CompileResult {
    
    const branch = this.branchOnly ? config.branchIndex : 0; 

    const ref = config.scene.getFunctionReference(branch, 0);

    await ActionTree.appendAction(config, `
      function ${ref} 
      return 1
    `);


    return {
      endFunctionIndex: config.functionIndex,
    }
  }
}