import Project from "../Project.js";
import * as fs from 'fs/promises';

export type ModeledEntityConfig = {
  modelName: string;
  /**
   * @default "walk"
   */
  walkAnimation?: string;
  /**
   * @default "damage"
   */
  damageVariant?: string;
  skeletonEntityTag: string;
}

export default class ModeledEntity {
  constructor(
    private project: Project,
    private config: ModeledEntityConfig,
  ) {}

  public async init() {
    const {project, config} = this;
    const {walkAnimation = 'walk', modelName, damageVariant = 'damage', skeletonEntityTag} = config;

    await fs.mkdir(project.Path + '/entity').catch(() => {});
    await fs.mkdir(project.Path + `/entity/${modelName}`).catch(() => {});

    const modelTag = `aj.${modelName}.root`;

    await project.addFile(`/entity/${modelName}/assign-model.mcfunction`, `
      scoreboard players add %lastModelId w.internal 1
      effect give @s invisibility infinite 1 true
      scoreboard players operation @s w.modelId = %lastModelId w.internal

      function animated_java:${modelName}/summon
      execute as @e[tag=${modelTag},tag=!w.after-summoning] run scoreboard players operation @s w.modelId = %lastModelId w.internal
      
      execute as @e[tag=${modelTag},distance=..10] if score @s w.modelId = %lastModelId w.internal run tag @s add w.after-summoning

      #execute as @e[tag=${modelTag}] run function animated_java:lava_spider/remove/this
    `);

    await project.addFile(`/entity/${modelName}/tick-as-entity.mcfunction`, `
      execute unless score @s w.modelId matches -2143124312..2132323132 run function w:generated/entity/${modelName}/assign-model
      scoreboard players operation #temp.modelId w.internal = @s w.modelId

      tag @s add w.entity.current
      execute as @e[tag=${modelTag}] if score @s w.modelId = #temp.modelId w.internal run tp @s @e[tag=w.entity.current,sort=nearest,limit=1]
      tag @s remove w.entity.current
    `);

    await project.addFile(`/entity/${modelName}/tick-as-model.mcfunction`, `
      scoreboard players operation #temp.modelId w.internal = @s w.modelId
      scoreboard players set #temp.modelCount w.internal 0

      execute as @e[tag=${skeletonEntityTag}] if score @s w.modelId = #temp.modelId w.internal run scoreboard players add #temp.modelCount w.internal 1

      execute if score #temp.modelCount w.internal matches 0 run function animated_java:${modelName}/remove/this
      execute if score #temp.modelCount w.internal matches 0 run return 1
    `);

    await project.appendtoTick(`
      execute as @e[tag=${skeletonEntityTag}] at @s run function w:generated/entity/${modelName}/tick-as-entity
      execute as @e[tag=${modelTag}] at @s run function w:generated/entity/${modelName}/tick-as-model
    `);
  }
}