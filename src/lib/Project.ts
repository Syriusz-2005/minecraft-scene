import * as fs from 'fs/promises';
import Pathfinder from './utils/Pathfinder.js';


export default class Project {
  constructor(
    private readonly PATH: string, 
    private readonly NAMESPACED_PATH: string
  ) {}

  private getPath(file: string) {
    return `${this.PATH}/${file}`;
  }

  public get Path() {
    return `${this.PATH}`;
  }

  private async mkFile(fileName: string, content: string) {
    await fs.writeFile(this.getPath(fileName), content.replace(/\n */g, '\n'));
  }

  private async appendToFile(fileName: string, content: string) {
    await fs.appendFile(this.getPath(fileName), content.replace(/\n */g, '\n'));
  }

  public async addFile(file: string, content: string) {
    return this.mkFile(file, content);
  }

  public async init() {
    await this.mkFile('tick.mcfunction', `
      execute as @a[tag=w.freeze] at @s at @e[tag=w.freezer,sort=nearest,limit=1] run tp @s ~ ~ ~
      execute as @a[tag=w.freeze] run effect give @s jump_boost 1 128 true 

      #declare score_holder #timer.60t
      scoreboard players add #timer.60t w.internal 1
      execute if score #timer.60t w.internal matches 60.. run scoreboard players reset #timer.60t w.internal
      
      execute as @a[scores={w.death=1..,w.death-ticks=1}] run title @s times 1t 30t 1t
      execute as @a[scores={w.death=1..,w.death-ticks=1}] run title @s title {"text": "You died!", "color": "red"}
      execute as @a[scores={w.death=1..,w.death-ticks=1}] run effect give @s blindness 3 1 true
      execute as @a[scores={w.death=1..,w.death-ticks=1}] run effect give @s night_vision 3 1 true
      execute as @a[scores={w.death=1..,w.death-ticks=1}] run tag @s add w.freeze
      execute as @a[scores={w.death=1..,w.death-ticks=1}] run effect give @s slowness 3 10 true
      execute as @a[scores={w.death=1..,w.death-ticks=1}] at @s align y run summon marker ~ ~ ~ {Tags: ["w.freezer"]}
      execute as @a[scores={w.death=1..}] run scoreboard players add @s w.death-ticks 1

      execute as @a[scores={w.death-ticks=59..}] run function ${this.NAMESPACED_PATH}/end-death

      execute as @e at @s run function ${this.NAMESPACED_PATH}/tick_as_all
    `);
    await this.mkFile('tick_as_all.mcfunction', `
      execute if entity @s[tag=w.wandering-trader.pathfinder] run data merge entity @s {HandItems: []}
    `);
    await this.mkFile('end-death.mcfunction', `
      tag @s remove w.death
      scoreboard players reset @s w.death-ticks
      scoreboard players reset @s w.death
      tag @s remove w.freeze
    `)
    return this;
  }

  public async registerPathfinder(pathfinder: Pathfinder) {
    await this.appendToFile('tick.mcfunction', `
      execute as @e[tag=${pathfinder.Tag},limit=1] at @s run tp @e[tag=${pathfinder.Tag}.pathClient] @s
    `);
  }

  public async appendtoTick(commands: string) {
    await this.appendToFile('tick.mcfunction', commands);
  }

  public async appendToAllEntities(commands: string) {
    await this.appendToFile('tick_as_all.mcfunction', commands);
  }
}