import ActionTree, { Action, ActionConfig, CompileResult } from "../ActionTree.js";

export default class LogFunctions implements Action {
  constructor(
  
  ) {}

  public async compile(config: ActionConfig): CompileResult {
    

    await config.scene.appendToFile(`../log.mcfunction`, `
      tellraw @a [{"color": "aqua", "text": "function ${config.sceneName}/${config.branchIndex ?? 0}-${config.functionIndex}", "clickEvent": {"action": "suggest_command", "value": "/function ${config.scene.getFunctionReference(config.branchIndex, config.functionIndex)}"}}]
    `);

    return {
      endFunctionIndex: config.functionIndex,
    }
  } 
}