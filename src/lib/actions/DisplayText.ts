import ActionTree, { Action, ActionConfig, CompileResult } from "../ActionTree.js";
import Speaker from "../utils/Speaker.js";
import TransformGroup from "../utils/TransformGroup.js";
import { Vec2 } from "../utils/Vector.js";


export default class DisplayText implements Action {
  constructor(
    private readonly position: readonly [number, number, number],
    private readonly source: Speaker,
    private readonly message: string,
    private readonly transformGroup?: TransformGroup,
    private readonly rotation?: Vec2,
  ) {}

  public async compile(config: ActionConfig): CompileResult {

    const text = this.source.getJson(this.message);

    const tags: string[] = this.transformGroup ? [
      this.transformGroup.groupTag,
    ] : [];

    tags.push('w.text-display');

    const length = text.length;

    const transformDistance = 
      length <= 30 ? .4
      : length <= 60 ? .8
      : length <= 80 ? 1.2
      : 1.6

    await ActionTree.appendAction(config, `
      ${this.transformGroup ? `
        execute as @e[tag=${this.transformGroup.groupTag}] at @s run tp @s ~ ~${transformDistance} ~
      ` : ''}

      summon text_display ${this.position[0]} ${this.position[1]} ${this.position[2]} {billboard: ${this.rotation ? '"fixed"' : '"vertical"'}, text: '${text}', teleport_duration: 4, Tags: ${JSON.stringify(tags)} ${this.rotation ? `, Rotation: [${this.rotation[0]}f, ${this.rotation[1]}f]` : ''}}
    `);

    return {
      endFunctionIndex: config.functionIndex,
    }
  }
}