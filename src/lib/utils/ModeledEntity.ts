import Project from "../Project.js";
import * as fs from 'fs/promises';

export type ModeledEntityConfig = {
  modelName: string;
  skeletonEntityTag: string;
  /**
   * @default "walk"
   */
  walkAnimation?: string;
  /**
   * @default "damage"
   */
  damageVariant?: string;
    /**
   * @default "main"
   */
  mainVariant?: string;
  /**
   * @default "attack"
   */
  attackAnimation?: string;
}

export default class ModeledEntity {
  constructor(
    private project: Project,
    private config: ModeledEntityConfig,
  ) {}

  public async init() {
    const {project, config} = this;
    const {
      modelName, 
      skeletonEntityTag,
      walkAnimation = 'walk', 
      mainVariant = 'main', 
      damageVariant = 'damage', 
      attackAnimation = 'attack',
    } = config;

    await fs.mkdir(project.Path + '/entity').catch(() => {});
    await fs.mkdir(project.Path + `/entity/${modelName}`).catch(() => {});
    await fs.mkdir(project.Path + `../../../advancements`).catch(() => {});
    await fs.mkdir(project.Path + `../../../advancements/generated`).catch(() => {});

    const modelTag = `aj.${modelName}.root`;

    await project.addFile(`../../advancements/generated/${modelName}_attacked.json`, JSON.stringify({
      "criteria": {
        "hit_player": {
          "trigger": "entity_hurt_player",
          "conditions": {
            "damage": {
              "source_entity": {
                "nbt": `{Tags:[\"${skeletonEntityTag}\"]}`,
              }
            }
          }
        }
      },
      "requirements": [
        ["hit_player"]
      ],
      "rewards": {
        "function": `w:generated/entity/${modelName}/on-default-attack`
      },
    }));

    await project.addFile(`/entity/${modelName}/on-default-attack.mcfunction`, `
      advancement revoke @s only w:generated/${modelName}_attacked
      #applying the attack animation

      execute as @e[tag=${modelTag}] if score @s w.modelId = #temp.modelId w.internal run function animated_java:${modelName}/animations/${attackAnimation}/play
    `);

    await project.addFile(`/entity/${modelName}/assign-model.mcfunction`, `
      scoreboard players add %lastModelId w.internal 1
      effect give @s invisibility infinite 1 true
      scoreboard players operation @s w.modelId = %lastModelId w.internal
      data merge entity @s {Silent:true,PersistenceRequired:true}

      function animated_java:${modelName}/summon
      execute as @e[tag=${modelTag},tag=!w.after-summoning] run scoreboard players operation @s w.modelId = %lastModelId w.internal
      
      execute as @e[tag=${modelTag},distance=..10] if score @s w.modelId = %lastModelId w.internal run tag @s add w.after-summoning
    `);

    await project.addFile(`/entity/${modelName}/apply-damage-variant.mcfunction`, `
      function animated_java:${modelName}/apply_variant/${damageVariant}
      tag @e[tag=w.entity.current,limit=1] add w.damage-applied
    `);

    await project.addFile(`/entity/${modelName}/apply-main-variant.mcfunction`, `
      execute as @e[tag=${modelTag}] if score @s w.modelId = #temp.modelId w.internal run function animated_java:${modelName}/apply_variant/${mainVariant}
      tag @s remove w.damage-applied
    `);

    await project.addFile(`/entity/${modelName}/tick-as-entity.mcfunction`, `
      execute unless score @s w.modelId matches -2143124312..2132323132 run function w:generated/entity/${modelName}/assign-model
      scoreboard players operation #temp.modelId w.internal = @s w.modelId
      execute store result score #temp.currentHealth w.internal run data get entity @s Health
      execute store result score #temp.hitTime w.internal run data get entity @s HurtTime

      tag @s add w.entity.current
      execute as @e[tag=${modelTag}] if score @s w.modelId = #temp.modelId w.internal at @e[tag=w.entity.current,sort=nearest,limit=1] facing entity @p eyes run tp @s ~ ~ ~ ~ 0
      
      execute unless score #temp.hitTime w.internal matches 0 as @e[tag=${modelTag}] if score @s w.modelId = #temp.modelId w.internal run function w:generated/entity/${modelName}/apply-damage-variant
      execute if entity @s[tag=w.damage-applied] if score #temp.hitTime w.internal matches 0 run function w:generated/entity/${modelName}/apply-main-variant

      tag @s remove w.entity.current

      execute store result score @s w.modelSkeleton.lastHp run data get entity @s Health
    `);

    await project.addFile(`/entity/${modelName}/tick-as-model.mcfunction`, `
      scoreboard players operation #temp.modelId w.internal = @s w.modelId
      scoreboard players set #temp.modelCount w.internal 0

      execute as @e[tag=${skeletonEntityTag}] if score @s w.modelId = #temp.modelId w.internal run scoreboard players add #temp.modelCount w.internal 1

      execute store result score @s w.cx run data get entity @s Pos[0] 2000
      execute store result score @s w.cy run data get entity @s Pos[1] 2000
      execute store result score @s w.cz run data get entity @s Pos[2] 2000

      scoreboard players set #temp.isWalking w.internal 0

      execute unless score @s w.cx = @s w.x run scoreboard players set #temp.isWalking w.internal 1
      execute unless score @s w.cx = @s w.x run scoreboard players set #temp.isWalking w.internal 1
      execute unless score @s w.cx = @s w.x run scoreboard players set #temp.isWalking w.internal 1

      execute if score #temp.isWalking w.internal matches 1 run function animated_java:${modelName}/animations/${walkAnimation}/resume
      execute if score #temp.isWalking w.internal matches 0 run function animated_java:${modelName}/animations/${walkAnimation}/stop

      execute store result score @s w.x run data get entity @s Pos[0] 2000
      execute store result score @s w.y run data get entity @s Pos[1] 2000
      execute store result score @s w.z run data get entity @s Pos[2] 2000

      execute if score #temp.modelCount w.internal matches 0 run function animated_java:${modelName}/remove/this
      execute if score #temp.modelCount w.internal matches 0 run return 1
    `);

    await project.appendtoTick(`
      execute as @e[tag=${skeletonEntityTag}] at @s run function w:generated/entity/${modelName}/tick-as-entity
      execute as @e[tag=${modelTag}] at @s run function w:generated/entity/${modelName}/tick-as-model
    `);
  }
}