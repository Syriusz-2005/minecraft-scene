import { Action, ActionConfig } from "../ActionTree";



export default class RunCommand implements Action {
  constructor(
    private readonly commands: string,
  ) {}

  public async compile(config: ActionConfig): Promise<{endFunctionIndex: number}> {
    const {scene} = config;

    await scene.appendToFile(`${config.functionIndex}.mcfunction`, `
      # commands generated by the RunCommand Action
      ${this.commands}
    `);

    return {
      endFunctionIndex: config.functionIndex,
    }
  }
}