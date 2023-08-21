import * as fs from 'fs/promises';


export default class Project {
  constructor(private readonly PATH: string) {}

  private getPath(file: string) {
    return `${this.PATH}/${file}`;
  }

  private async mkFile(fileName: string, content: string) {
    await fs.writeFile(this.getPath(fileName), content.replace(/\n */g, '\n'));
  }

  private async appendToFile(fileName: string, content: string) {
    await fs.appendFile(this.getPath(fileName), content.replace(/\n */g, '\n'));
  }

  public async init() {
    await this.mkFile('tick.mcfunction', `
      execute as @a[tag=w.freeze] at @s at @e[tag=w.freezer,sort=nearest,limit=1] run tp @s ~ ~ ~
      execute as @a[tag=w.freeze] run effect give @s jump_boost 1 128 true 

      #declare score_holder #timer.60t
      scoreboard players add #timer.60t w.internal 1
      execute if score #timer.60t w.internal matches 60.. run scoreboard players reset #timer.60t w.internal
    `);
  }
}