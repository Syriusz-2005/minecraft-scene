import { Action } from "../ActionTree.js";
import MovePathfinderTo from "../actions/MovePathfinderTo.js";
import RunCommand from "../actions/RunCommand.js";
import { VMath, Vec2, Vector } from "./Vector.js";

export type PathOptions = {
  /**
   * @default {2}
   */
  successRadius?: number;
  /**
   * @default {0.7}
   */
  speed?: number;
}

export type PathfinderConfig = {
  id: string;
  options: PathOptions;
}

export type Behavior = {
  type: 'definite' | 'wander';
}

export default class Pathfinder {

  constructor(
    private config: PathfinderConfig
  ) {}

  public get Tag() {
    return `pathfinder.${this.config.id}`;
  }

  private get Selector() {
    return `@e[tag=${this.Tag}]`;
  }

  /**
   * 
   * @subtick
   */
  public setPosition(pos: Vector, rotation?: Vec2) {
    return new RunCommand(`tp ${this.Selector} ${VMath.toString(pos)}${rotation ? ` ${rotation[0]} ${rotation[1]}` : ''}`)
  }

  /**
   * @subtick
   */
  public terminatePathAndStartWandering() {
    return new RunCommand(`
      data remove entity ${this.Selector} WanderTarget
    `)
  }

  /**
   *@subtick 
   */
  public setPause(isPaused: boolean) {
    return new RunCommand(`
      data merge entity ${this.Selector} {NoAI: ${isPaused}}
    `)
  }


  /**
   * 
   * @blocking
   */
  public moveTo(pos: Vector, optionsOverride?: PathOptions): Action {
    const options = {...this.config.options, ...optionsOverride}

    return new MovePathfinderTo(this.Tag, pos, options);
  }
}