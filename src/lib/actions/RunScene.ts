import ActionTree, { Action, ActionConfig, CompileResult } from "../ActionTree.js";
import Scene from "../Scene.js";


export default class RunScene implements Action {
  constructor(
    private readonly scene: Scene,
  ) {}

  public async compile(config: ActionConfig): CompileResult {
    

    await ActionTree.appendAction(config, `
      function ${this.scene.config.NAMESPACED_PATH}/${this.scene.config.sceneName}/0-0
    `);

    return {
      endFunctionIndex: config.functionIndex,
    }
  }
}