import ActionTree, { Action, ActionConfig, CompileResult } from "../ActionTree.js";
import Scene from "../Scene.js";


export default class RunScene implements Action {
  constructor(
    private readonly scene: Scene,
  ) {}

  public async compile(config: ActionConfig): CompileResult {
    

    await ActionTree.appendAction(config, `
      scoreboard players set #w.gameState w.scenes ${this.scene.config.sceneIndex}
    `);

    return {
      endFunctionIndex: config.functionIndex,
    }
  }
}