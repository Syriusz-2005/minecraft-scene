import { randomUUID } from "crypto";
import ActionTree, { Action, ActionConfig, CompileResult, ConcurrencyOptions } from "../ActionTree.js";


export default class Concurrently implements Action {
  constructor(
    private readonly config: ConcurrencyOptions, 
    private readonly actions: Action[]
  ) {}

  private readonly SUFFIX = 'await-for-concurrent-actions';


  public async compile(config: ActionConfig): CompileResult {
    const {scene} = config;
    let index = config.functionIndex;
    const {awaitingMethod} = this.config;

    type BranchResult = {branchIndex: number, endFunctionIndex: number}

    const actionResults: BranchResult[] = [];

    const successesCounter = `#w.concurrently.${config.sceneIndex}.${config.branchIndex ?? 0}-${config.functionIndex}`;

    await ActionTree.appendAction(config, `
      scoreboard players set ${successesCounter} w.internal 0
    `);
    
    let branchIndex = (config.branchIndex ?? 0) + 1;
    for (const action of this.actions) {
      await ActionTree.appendAction(config, `
        function ${scene.getFunctionReference(branchIndex, config.functionIndex)}
      `);

      const {endFunctionIndex} = await action.compile({
        ...config,
        branchIndex,
      });

      await ActionTree.appendAction({
        ...config, 
        branchIndex, 
        functionIndex: endFunctionIndex
      }, `
        scoreboard players add ${successesCounter} w.internal 1
      `);
      
      actionResults.push({
        branchIndex,
        endFunctionIndex,
      });

      index += endFunctionIndex - index;
      branchIndex++;
    }

    const repeatFunctionReference = scene.getFunctionReference(config.branchIndex, ++index, this.SUFFIX)
    const repeatFunctionNane = scene.getFunctionName(config.branchIndex, index, this.SUFFIX);

    await ActionTree.appendAction(config, `
      function ${repeatFunctionReference}
    `);

    const endingfunctionFilename = scene.getFunctionName(config.branchIndex, ++index);
    const endingFunctionReference = scene.getFunctionReference(config.branchIndex, index);
    await scene.mkFile(endingfunctionFilename, `
      # Run After Concurrently actions resolve for: ${awaitingMethod}
    `)

    await scene.mkFile(repeatFunctionNane, `
      ${awaitingMethod === 'any-finished' ? `
        execute if score ${successesCounter} w.internal matches 1.. run function ${endingFunctionReference}
        execute if score ${successesCounter} w.internal matches 1.. run return 1
      ` : awaitingMethod === 'all-finished' ? `
        execute if score ${successesCounter} w.internal matches ${this.actions.length} run function ${endingFunctionReference}
        execute if score ${successesCounter} w.internal matches ${this.actions.length} run return 1
      ` : `
        function ${endingFunctionReference}
        return 1
      `}

      schedule function ${repeatFunctionReference} 1t
    `);


    return {
      endFunctionIndex: index,
    }
  }
}