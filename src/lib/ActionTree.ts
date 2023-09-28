import Scene, { SceneConfig } from "./Scene.js";
import Concurrently from "./actions/Concurrently.js";
import LogFunctions from "./actions/LogFunction.js";
import RunCommand from "./actions/RunCommand.js";

export type ActionConfig = {
  functionIndex: number;
  branchIndex?: number;
  scene: Scene;
} & SceneConfig;

export type CompileResult = Promise<{endFunctionIndex: number}>

export type Action = {
  compile: (config: ActionConfig) => CompileResult;
}

export type ConcurrencyOptions = {
  awaitingMethod: 'instant-skip' | 'any-finished' | 'all-finished';
}

export default class ActionTree implements Action {
  private elements: Action[] = [];

  public static async appendAction( config: ActionConfig, content: string) {
    const branch = config.branchIndex ?? 0;
    await config.scene.appendToFile(`${branch}-${config.functionIndex}.mcfunction`, content);
  }
   
  constructor(
    private scene: Scene,
  ) {}

  public then(action: Action | string) {
    this.elements.push(typeof action === 'string' ? new RunCommand(action) : action);
    return this;
  }

  public concurrently(config: ConcurrencyOptions, actions: Action[]) {

    this.elements.push(new Concurrently(config, actions));

    return this;
  }

  public log() {
    this.elements.push(new LogFunctions());
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