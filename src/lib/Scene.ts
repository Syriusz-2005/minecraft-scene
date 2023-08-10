import ActionTree from "./ActionTree.js";
import { Env } from "./Env";
import * as fs from 'fs/promises';

export type SceneConfig = {
  sceneName: string;
  sceneIndex: number;
  autoStart?: boolean;
} & Env;

/**
 * Scene has internal sceneIndex that may be used to determine the game state. Each scene must also reserve a `sceneIndex + 1` state as It corresponds to the scene in progress
 */
export default class Scene {

  public readonly actionTree = new ActionTree(this);

  constructor(
    public readonly config: SceneConfig,
  ) {}


  private getPath() {
    return `${this.config.PATH}/${this.config.sceneName}`;
  }
  
  public getFunctionReference(branch: number | undefined, index: number, extra?: string) {
    return `${this.config.NAMESPACED_PATH}/${this.config.sceneName}/${branch ?? 0}-${index}${extra ? `-${extra}` : ''}`;
  }

  public getFunctionName(branch: number | undefined, index: number, extra?: string) {
    return `${branch ?? 0}-${index}${extra ? `-${extra}` : ''}.mcfunction`;
  }

  public getFunction(branch: number | undefined, index: number, extra?: string) {
    return {
      name: this.getFunctionName(branch, index, extra),
      reference: this.getFunctionReference(branch, index, extra),
    }
  }

  private async mkdir() {
    await fs.mkdir(this.getPath(), {recursive: true});
  }

  public async mkFile(fileName: string, content: string) {
    await fs.writeFile(this.getPath() + '/' + fileName, content.replace(/\n */g, '\n'));
  }

  public async appendToFile(fileName: string, content: string) {
    await fs.appendFile(this.getPath() + '/' + fileName, content.replace(/\n */g, '\n'));
  }

  public async compile() {
    await fs.rm(this.getPath(), {recursive: true}).catch(err => {});
    await this.mkdir();

    await this.mkFile('../tick.mcfunction', `
      execute as @a[tag=w.freeze] at @s at @e[tag=w.freezer,sort=nearest,limit=1] run tp @s ~ ~ ~

      #declare score_holder #timer.60t
      scoreboard players add #timer.60t w.internal 1
      execute if score #timer.60t w.internal matches 60.. run scoreboard players reset #timer.60t w.internal
    `);

    await this.mkFile('load.mcfunction', `
      #declare score_holder #SCENE_${this.config.sceneName}
      scoreboard players set #SCENE_${this.config.sceneName} w.scenes ${this.config.sceneIndex}

      scoreboard objectives add w.internal dummy

      ${this.config.autoStart ? `function ${this.getFunctionReference(0, 0)}` : ''}
    `);

    await this.mkFile('tick.mcfunction', `
      execute if score #w.gameState w.scenes matches ${this.config.sceneIndex} run function ${this.getFunctionReference(0, 0)}
    `);

    await this.mkFile(`0-0.mcfunction`, `
      # Run by scene manager
      scoreboard players add #w.gameState w.scenes 1
    `);

    await this.actionTree.compile({
      ...this.config,
      functionIndex: 0,
      scene: this,
    })

  }
}