import ActionTree, { Action, ActionConfig, CompileResult } from "../ActionTree.js";
import * as Crypto from 'crypto';


export default class Repeat implements Action {
  private readonly uuid = Crypto.randomUUID();

  constructor(
    private readonly commands: string,
    private readonly forSeconds: number,
  ) {}

  public async compile(config: ActionConfig): CompileResult {
    const {scene} = config;

    let index = config.functionIndex;

    const scoreHolderName = `#w.repeat.${this.uuid}`;
    const repeatFunctionReference = scene.getFunctionReference(config.branchIndex, ++index, 'repeat')

    await ActionTree.appendAction(config, `
      scoreboard players reset ${scoreHolderName} w.internal
      function ${repeatFunctionReference}
    `);
    
    const repeaterFilename = scene.getFunctionName(config.branchIndex, index, 'repeat')
    await scene.mkFile(repeaterFilename, `
      ${this.commands}

      scoreboard players add ${scoreHolderName} w.internal 1
      execute if score ${scoreHolderName} w.internal matches ${this.forSeconds * 20}.. run function ${scene.getFunctionReference(config.branchIndex, index + 1)}
      execute if score ${scoreHolderName} w.internal matches ${this.forSeconds * 20}.. run return 1


      schedule function ${repeatFunctionReference} 1t
    `);

    const endingfunctionFilename = scene.getFunctionName(config.branchIndex, ++index);
    await scene.mkFile(endingfunctionFilename, `
      # Run After repeat action
    `)

    return {
      endFunctionIndex: index,
    }
  }
}