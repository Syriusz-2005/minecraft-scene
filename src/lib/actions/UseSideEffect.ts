import { Action, ActionConfig, CompileResult } from "../ActionTree.js";



export default class UseSideEffect implements Action {
  constructor(
    private effect: Action,
  ) {}

  public async compile(config: ActionConfig): CompileResult {
    
    
    return {
      endFunctionIndex: config.functionIndex,
    }
  }
}