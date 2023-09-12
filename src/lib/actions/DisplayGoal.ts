import ActionTree, { Action, ActionConfig, CompileResult } from "../ActionTree.js";
import { TextComponent } from "../types/TextComponent.js";
import Speaker from "../utils/Speaker.js";


export default class DisplayGoal implements Action {
  constructor(
    private readonly content: TextComponent[],
  ) {}

  public async compile(config: ActionConfig): CompileResult {
    const {scene} = config;
    let index = config.functionIndex;
    const {content} = this;

    const text = new Speaker('New quest', 'gold', true).getJson(JSON.stringify(content)).replace(/'/g, "\\'");
    
    await ActionTree.appendAction(config, `
      tellraw @a ${text}
    `);

    return {
      endFunctionIndex: index,
    }
  }
}