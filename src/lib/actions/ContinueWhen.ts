import ActionTree, { Action, ActionConfig, CompileResult } from "../ActionTree.js";


export default class ContinueWhen implements Action {
  constructor(
    /**
     * A command that must result in a success of failure (The most obvious one is /execute, especially /execute if function)
     * the success will make the action tree move to the next stage
     */
    private readonly conditionCommand: string,
    /**
     * Those commands will run for every tick until the condition command resolves to success
     */
    private readonly optionalLoopCommands: string = '',
  ) {}

  public async compile(config: ActionConfig): CompileResult {
    let index = config.functionIndex;
    
    const {scene} = config;

    const {name, reference} = scene.getFunction(config.branchIndex, ++index, 'continue-tick');

    await ActionTree.appendAction(config, `
      function ${reference}
    `);

    const scoreHolder = `#w.continue-when.${config.branchIndex ?? 0}-${config.functionIndex}`;

    const {name: endFunctionName, reference: endFunctionReference} = scene.getFunction(config.branchIndex, ++index);

    await scene.mkFile(name, `
      execute store success score ${scoreHolder} w.internal run ${this.conditionCommand}
      execute if score ${scoreHolder} w.internal matches 1.. run function ${endFunctionReference}
      execute if score ${scoreHolder} w.internal matches 1.. run return 1

      ${this.optionalLoopCommands}

      schedule function ${reference} 1t
    `);


    await scene.mkFile(endFunctionName, `
      #Run by ContinueWhen

    `)

    return {
      endFunctionIndex: index,
    }
  }
}