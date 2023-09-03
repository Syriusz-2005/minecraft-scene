import { randomUUID } from "crypto";
import ActionTree, { Action, ActionConfig, CompileResult } from "../ActionTree.js";

export type MenuOption = {
  content: string;
  color?: string;
  then: Action;
}

export type MenuConfig = {
  preText?: string;
  options: MenuOption[];
  skipWhen?: string;
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
      {text: '\n\n\n'},
      {text: '> ', color: 'red', bold: true},
       ...(menuConfig.preText ? JSON.parse(menuConfig.preText) : []),
      {text: '\n\n'},
    ];

    const stateStore = `#display-menu.${randomUUID()}.state w.internal`;
    const skipStore = `#display-menu.${config.branchIndex ?? 0}-${config.functionIndex}.skip w.internal`;
    
    const {name: endFunctionName, reference: endFunctionReference} = scene.getFunction(config.branchIndex, index + 1);

    const {name: tickFunctionName, reference: tickFunctionReference} = scene.getFunction(config.branchIndex, index, 'display-menu-tick');

    await scene.mkFile(tickFunctionName, `
      execute if score ${stateStore} matches 0 run return 0

      ${menuConfig.skipWhen !== undefined ? `execute store success score ${skipStore} run ${menuConfig.skipWhen}` : `scoreboard players set ${skipStore} 0`}
      
      execute if score ${skipStore} matches 1.. run tellraw @a {"text":"Skipped the dialouge...", "color": "red"}
      execute if score ${skipStore} matches 1.. run scoreboard players set ${stateStore} 0
      execute if score ${skipStore} matches 1.. run function ${endFunctionReference}
      execute if score ${skipStore} matches 1.. run return 1

      schedule function ${tickFunctionReference} 1t
    `);
    

    let branchIndex = (config.branchIndex ?? 0) + 1;
    for (const option of menuConfig.options) {
      const {name, reference} = scene.getFunction(branchIndex, config.functionIndex);
      
      await scene.mkFile(name, `
        #run by display menu action
        execute if score ${stateStore} matches 0 run return 0
        
        scoreboard players set ${stateStore} 0
      `);

      text.push({
        text: ` [${option.content}]`,
        color: option.color ?? 'white',
        bold: true,
        clickEvent: {
          action: "run_command",
          value: `/schedule function ${reference} 1t`,
        }
      });

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
    
    text.push({
      text: '\n',
    })

    await ActionTree.appendAction(config, `
      # One means that the menu is active
      scoreboard players set ${stateStore} 1
      tellraw @a ${JSON.stringify(text)}

      ${menuConfig.skipWhen ? `function ${tickFunctionReference}` : ''}
    `);

    await scene.mkFile(endFunctionName, `
      #Run after display menu
    `)



    return {
      endFunctionIndex: index + 1,
    }
  }
}