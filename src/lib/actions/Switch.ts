import ActionTree, { Action, ActionConfig, CompileResult } from "../ActionTree.js";

export type SwitchBranch = {
  case: string;
  then: Action;
}

export type SwitchConfig = {
  branches: SwitchBranch[];
}

export default class Switch implements Action {
  constructor(
    private switchConfig: SwitchConfig,
  ) {}

  public async compile(config: ActionConfig): CompileResult {
    const {switchConfig} = this;

    const {scene} = config;
    let index = config.functionIndex;

    await ActionTree.appendAction(config, `

    `);

    const successStore = `#switch.${config.branchIndex ?? 0}-${config.functionIndex}.sucess`;

    const {name: endFunctionName, reference: endFunctionReference} = scene.getFunction(config.branchIndex, index + 1);

    let branchIndex = (config.branchIndex ?? 0) + 1;
    for (const branch of switchConfig.branches) {
      const {name, reference} = scene.getFunction(branchIndex, config.functionIndex);
      await ActionTree.appendAction(config, `
        execute store success score ${successStore} w.internal run ${branch.case}
        execute if score ${successStore} w.internal matches 1.. run function ${reference}
        execute if score ${successStore} w.internal matches 1.. run return 1
      `);

      const {endFunctionIndex} = await branch.then.compile({
        ...config,
        branchIndex,
      });

      await ActionTree.appendAction({
        ...config,
        branchIndex,
        functionIndex: endFunctionIndex,
      }, `
        function ${endFunctionReference}
      `);

      branchIndex++;
    }

    await scene.mkFile(endFunctionName, `
      #run after switch action
    `);

    return {
      endFunctionIndex: index + 1,
    }
  }
}