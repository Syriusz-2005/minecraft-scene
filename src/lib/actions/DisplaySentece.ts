import ActionTree, { Action, ActionConfig, CompileResult } from "../ActionTree.js";
import Speaker from "../Speaker.js";



export default class DisplaySentence implements Action {


  constructor(
    private readonly source: Speaker,
    private readonly message: string,
  ) {}

  public async compile(config: ActionConfig): CompileResult {
    const {scene} = config;

    const json = [
      {"text": "["}, 
      {"text": this.source.name, "color": this.source.color}, 
      {"text": "]: "},
      ...JSON.parse(this.message),
    ]

    ActionTree.appendAction(config, `
      tellraw @a ${JSON.stringify(json)}
    `);

    return {
      endFunctionIndex: config.functionIndex,
    }
  }
}