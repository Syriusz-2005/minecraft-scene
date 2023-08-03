import ActionTree from "./ActionTree.js";
import { Env } from "./Env";
import * as fs from 'fs/promises';

export type SceneConfig = {
  sceneName: string;
  sceneIndex: number;
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
  
  public getFunctionReference(functionName: string) {
    return `${this.config.NAMESPACED_PATH}/${this.config.sceneName}/${functionName}`;
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
    await this.mkdir();
    console.log('Compiled!');

    await this.mkFile('load.mcfunction', `
      #declare score_holder #SCENE_${this.config.sceneName}
      scoreboard players set #SCENE_${this.config.sceneName} w.scenes ${this.config.sceneIndex}
    `);

    await this.mkFile('tick.mcfunction', `
      execute if score #w.gameState w.scenes matches ${this.config.sceneIndex} run function ${this.getFunctionReference('0')}
    `)

    await this.mkFile(`0.mcfunction`, `
      # Run by scene manager
      scoreboard players add #w.gameState w.scenes 1
    `)

    this.actionTree.compile({
      ...this.config,
      functionIndex: 0,
      scene: this,
    })
  }
}