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
  ) {
    this.config.project.appendScene(this);
  }


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

  /**
   * @deprecated to use as a public function
   */
  public async compile() {
    await fs.rm(this.getPath(), {recursive: true}).catch(err => {});
    await this.mkdir();

    await this.mkFile('load.mcfunction', `
      #declare score_holder #SCENE_${this.config.sceneName}
      scoreboard players set #SCENE_${this.config.sceneName} w.scenes ${this.config.sceneIndex}

      ${this.config.autoStart ? `function ${this.getFunctionReference(0, 0)}` : ''}
    `);

    await this.mkFile('tick.mcfunction', `
      execute if score #w.gameState w.scenes matches ${this.config.sceneIndex} run function ${this.getFunctionReference(0, 0)}
    `);

    await this.mkFile(`0-0.mcfunction`, `
      # Run by scene manager
      scoreboard players set #w.gameState w.scenes ${this.config.sceneIndex + 1}
    `);

    await this.actionTree.compile({
      ...this.config,
      functionIndex: 0,
      scene: this,
    })

  }
}