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
    private readonly dim?: string,
  ) {}

  public async compile(config: ActionConfig): CompileResult {

    const text = this.source.getJson(this.message).replace(/'/g, "\\'");

    const tags: string[] = this.transformGroup ? [
      this.transformGroup.groupTag,
    ] : [];

    tags.push('w.text-display');

    const length = text.length;
    const line = 65;

    const transformDistance = 
      length <= line ? .3
      : length <= line * 2 ? .7
      : length <= line * 3 ? 1.1
      : length <= line * 4 ? 1.5
      : length <= line * 5 ? 2.1
      : 2.6

    await ActionTree.appendAction(config, `
      ${this.transformGroup ? `
        execute as @e[tag=${this.transformGroup.groupTag}] at @s run tp @s ~ ~${transformDistance} ~
      ` : ''}

      execute as @a at @s run playsound minecraft:entity.villager.ambient master @s
      execute in ${this.dim ?? 'overworld'} run summon text_display ${this.position[0]} ${this.position[1]} ${this.position[2]} {billboard: ${this.rotation ? '"fixed"' : '"vertical"'}, text: '${text}', teleport_duration: 4, Tags: ${JSON.stringify(tags)} ${this.rotation ? `, Rotation: [${this.rotation[0]}f, ${this.rotation[1]}f]` : ''}}
    `);

    return {
      endFunctionIndex: config.functionIndex,
    }
  }
}