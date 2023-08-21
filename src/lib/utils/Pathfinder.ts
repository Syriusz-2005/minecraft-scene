import { Action } from "../ActionTree.js";
import MovePathfinderTo from "../actions/MovePathfinderTo.js";
import RunCommand from "../actions/RunCommand.js";
import { VMath, Vec2, Vector } from "./Vector.js";
import * as fs from 'fs/promises';
import { Env } from "../Env";
import Project from "../Project.js";

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
} & Env;

export type Behavior = {
  type: 'definite' | 'wander';
}

export default class Pathfinder {

  constructor(
    private config: PathfinderConfig
  ) {}

  public get Tag() {
    return `w.pathfinder.${this.config.id}`;
  }

  private get Selector() {
    return `@e[tag=${this.Tag}]`;
  }

  /**
   * @subtick
   */
  public summon(pos: Vector) {
    return new RunCommand(`
      summon wandering_trader ${VMath.toString(pos)} {Tags: ["${this.Tag}", "w.wandering-trader.pathfinder"],Invulnerable:true,Silent:true,ActiveEffects: [{Id:14,ShowParticles:false,Duration: 999999999}],PersistenceRequired:true} 
    `);
  }

  /**
   * @subtick
   */
  public dispatch() {
    return new RunCommand(`
      kill @e[tag=${this.Tag}]
    `)
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

  public connect(entitySelector: string) {
    return new RunCommand(`
      tag ${entitySelector} add ${this.Tag}.pathClient
    `);
  }

  public disconnect(entitySelector: string) {
    return new RunCommand(`
      tag ${entitySelector} remove ${this.Tag}.pathClient
    `);
  }

  /**
   * 
   * @blocking
   */
  public moveTo(pos: Vector, optionsOverride?: PathOptions): Action {
    const options = {...this.config.options, ...optionsOverride}

    return new MovePathfinderTo(this.Tag, pos, options);
  }

  private getPath(file: string) {
    return `${this.config.PATH}/${file}`;
  }

  public async appendToFile(fileName: string, content: string) {
    await fs.appendFile(this.getPath(fileName), content.replace(/\n */g, '\n'));
  }

  public async init() {
    await this.config.project.registerPathfinder(this);
  }
}