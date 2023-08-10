import ActionTree, { Action, ActionConfig, CompileResult } from "../ActionTree.js";

export type MenuOption = {
  content: string;
  color?: string;
  then: Action;
}

export type MenuConfig = {
  preText?: string;
  options: MenuOption[];
}

export default class DisplayMenu implements Action {
  constructor(
    private readonly menuConfig: MenuConfig,
  ) {}

  public async compile(config: ActionConfig): CompileResult {
    const {menuConfig} = this;
    const {scene} = config;
    let index = config.functionIndex;

    const text: any[] = [
       ...(menuConfig.preText ? JSON.parse(menuConfig.preText) : []),
    ];
    
    const {name: endFunctionName, reference: endFunctionReference} = scene.getFunction(config.branchIndex, index + 1);


    let branchIndex = (config.branchIndex ?? 0) + 1;
    for (const option of menuConfig.options) {
      const {name, reference} = scene.getFunction(branchIndex, config.functionIndex);
      
      await scene.mkFile(name, `
        #run by display menu action
      `);

      text.push({
        text: `[${option.content}]`,
        color: option.color ?? 'white',
        bold: true,
        clickEvent: {
          action: "run_command",
          value: `/function ${reference}`,
        }
      })

      const {endFunctionIndex} = await option.then.compile({
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
    
    await ActionTree.appendAction(config, `
      tellraw @a ${JSON.stringify(text)}
    `);

    await scene.mkFile(endFunctionName, `
      #Run after display menu
    `)



    return {
      endFunctionIndex: index,
    }
  }
}