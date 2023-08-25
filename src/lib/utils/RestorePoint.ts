import ActionTree, { Action, ActionConfig, CompileResult } from "../ActionTree.js";


/**
 * Offers a 'goto' mechanic.
 * In case of the snapshot not beeing set before the restore action, it will reset the whole scene
 */
export default class RestorePoint {
  private functionIndex?: number = undefined;
  private branchIndex?: number = undefined;

  constructor() {}

  public setSnapshot(): Action {
    return {
      compile: async (config: ActionConfig): CompileResult => {
        this.functionIndex = config.functionIndex;
        this.branchIndex = config.branchIndex;
        return {
          endFunctionIndex: config.functionIndex,
        }
      },
    }
  }

  public restore(): Action {
    return {
      compile: async (config: ActionConfig): CompileResult => {

        await ActionTree.appendAction(config, `
          function ${config.scene.getFunctionReference(this.branchIndex, this.functionIndex ?? 0)}
          return 1
        `);

        return {
          endFunctionIndex: config.functionIndex,
        }
      }
    }
  }
}