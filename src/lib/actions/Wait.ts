import { Action, ActionConfig } from "../ActionTree.js";

export default class Wait implements Action {
  constructor(
    private readonly timeSeconds: number
  ) {}
  
  public async compile(config: ActionConfig): Promise<{endFunctionIndex: number}> {
    const {scene} = config;

    let index = config.functionIndex;


    await scene.appendToFile(`${index}.mcfunction`, `
      function ${scene.getFunctionReference(`${++index}-wait`)}
    `);

    await scene.mkFile(`${index}-wait.mcfunction`, `
      schedule function ${scene.getFunctionReference(`${++index}`)} ${this.timeSeconds}s
    `);

    await scene.mkFile(`${index}.mcfunction`, `
      # Run by Wait action
    `)

    return {
      endFunctionIndex: index,
    }
  }
}