import ActionTree, { Action, ActionConfig, CompileResult } from "../ActionTree.js";
import Speaker from "../utils/Speaker.js";



export default class DisplaySentence implements Action {


  constructor(
    private readonly source: Speaker,
    private readonly message: string,
  ) {}

  public async compile(config: ActionConfig): CompileResult {
    const {scene} = config;


    ActionTree.appendAction(config, `
      tellraw @a ${this.source.getJson(this.message)}
    `);

    return {
      endFunctionIndex: config.functionIndex,
    }
  }
}