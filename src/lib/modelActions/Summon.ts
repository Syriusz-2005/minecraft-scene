import ActionTree, { Action, ActionConfig, CompileResult } from "../ActionTree.js";
import EntityModel from "../utils/EntityModel.js";
import Position from "../utils/Position.js";
import { Vector } from "../utils/Vector.js";


export default class SummonModel implements Action {
  constructor(
    private model: EntityModel,
    private at: Position,
  ) {}

  public async compile(config: ActionConfig): CompileResult {
    const {at} = this;

    await ActionTree.appendAction(config, `
      execute positioned ${at.pos[0]} ${at.pos[1]} ${at.pos[2]} rotated ${at.rotation[0]} ${at.rotation[1]} run function animated_java:${this.model.modelName}/summon

      execute positioned ${at.pos[0]} ${at.pos[1]} ${at.pos[2]} as @e[type=#animated_java:root,tag=aj.${this.model.modelName}.root,distance=..0.2] run tag @s add ${this.model.id}
    `);

    return {
      endFunctionIndex: config.functionIndex,
    }
  }
}