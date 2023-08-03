import ActionTree, { Action, ActionConfig } from "../ActionTree.js";

export default class Wait implements Action {
  constructor(
    private readonly timeSeconds: number
  ) {}
  
  public async compile(config: ActionConfig): Promise<{endFunctionIndex: number}> {
    const {scene} = config;

    let index = config.functionIndex;


    const functionName = scene.getFunctionName(config.branchIndex, ++index, 'wait');
    const waitFunctionReference = scene.getFunctionReference(config.branchIndex, index, 'wait');

    await ActionTree.appendAction(config, `
      function ${waitFunctionReference}
    `);

    const endFunctionReference = scene.getFunctionReference(config.branchIndex, ++index);
    const endFunctionName = scene.getFunctionName(config.branchIndex, index);

    await scene.mkFile(functionName, `
      schedule function ${endFunctionReference} ${this.timeSeconds}s
    `);


    await scene.mkFile(endFunctionName, `
      # Run by Wait action
    `)

    return {
      endFunctionIndex: index,
    }
  }
}