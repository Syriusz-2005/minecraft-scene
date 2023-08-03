import ActionTree from "./ActionTree.js";
import { Env } from "./Env";
import * as fs from 'fs/promises';

export type SceneConfig = {
  sceneName: string;
  sceneIndex: number;
} & Env;

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

    await this.mkFile(`0.mcfunction`, `
      # Run by scene manager
    `)

    this.actionTree.compile({
      ...this.config,
      functionIndex: 0,
      scene: this,
    })
  }
}