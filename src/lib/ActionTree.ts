import Scene, { SceneConfig } from "./Scene.js";

export type ActionConfig = {
  functionIndex: number;
  scene: Scene;
} & SceneConfig;

export type CompileResult = Promise<{endFunctionIndex: number}>

export type Action = {
  compile: (config: ActionConfig) => CompileResult;
}

export default class ActionTree implements Action {
  private elements: Action[] = [];
   
  constructor(
    private scene: Scene,
  ) {}

  public then(action: Action) {
    this.elements.push(action);
    return this;
  }

  public async compile(config: ActionConfig): CompileResult {
    let currConfig = {...config};
    for (const element of this.elements) {
      currConfig = {
        ...currConfig,
        functionIndex: (await element.compile(currConfig)).endFunctionIndex,
      };
    }

    return {
      endFunctionIndex: currConfig.functionIndex,
    }
  }
}