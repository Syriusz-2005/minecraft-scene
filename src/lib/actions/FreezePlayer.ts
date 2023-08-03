import { Action, ActionConfig, CompileResult } from "../ActionTree";



export default class FreezePlayer implements Action {
  constructor(
    private readonly position?: [number, number, number],
  ) {}

  public async compile(config: ActionConfig): CompileResult {
    const {scene} = config;
    let index = config.functionIndex;

    await scene.appendToFile(`${index}.mcfunction`, `

      execute at @a[tag=w.player,tag=!w.freeze] run summon marker ${this.position?.[0] ?? '~'} ${this.position?.[1] ?? '~'} ${this.position?.[2] ?? '~'} {Tags: ["w.freezer"]}

      tag @a[tag=w.player] add w.freeze

      execute as @a[tag=w.freeze] run attribute @s generic.movement_speed modifier add 496bc503-8f07-4358-bd91-96de6b16f273 "freeze" -1 multiply
    `);

    return {
      endFunctionIndex: index,
    }
  }
}