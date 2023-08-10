import { Env } from "../Env";
import * as fs from 'fs/promises';

export type StateConfig = {
  /**
   * It is used in the score holder
   */
  name: string;

  default: number;
} & Env;

export default class StateMachine {
  public readonly scoreHolder: string;

  constructor(
    private readonly config: StateConfig,
  ) {
    this.scoreHolder = `%stateMachine.${config.name}`;
  }

  private getPath(file: string) {
    return `${this.config.PATH}/${file}`;
  }

  public async appendToFile(fileName: string, content: string) {
    await fs.appendFile(this.getPath(fileName), content.replace(/\n */g, '\n'));
  }

  public async init() {

    await this.appendToFile('reset-state-machines.mcfunction', `
      #file ${import.meta.url}
      scoreboard players set ${this.scoreHolder} w.internal ${this.config.default}
    `);

    
    return this;
  }

  public Update(value: number) {
    return `scoreboard players set ${this.scoreHolder} w.internal ${value}`
  }

  public UseTest(value: number | `${number}..` | `..${number}` | `${number}..${number}` ) {
    return `execute if score ${this.scoreHolder} w.internal matches ${value}`;
  }
}