import { NAMESPACED_PATH, PATH, project } from "../PATH.js";
import ActionTree from "../lib/ActionTree.js";
import Scene from "../lib/Scene.js";
import ContinueWhen from "../lib/actions/ContinueWhen.js";
import Fight from "../lib/actions/Fight.js";
import FreezePlayer from "../lib/actions/FreezePlayer.js";
import RunScene from "../lib/actions/RunScene.js";
import UnfreezePlayer from "../lib/actions/UnfreezePlayer.js";
import UseCamera from "../lib/actions/UseCamera.js";
import UsePath from "../lib/actions/UsePath.js";
import Wait from "../lib/actions/Wait.js";
import { getClearLastFight } from "../lib/utils/ClearLastFight.js";
import { Miner2, minerSpeech } from "../speakers/MinerSpeech.js";
import { ThePlayer } from "../speakers/ThePlayer.js";
import { TheLordMurderActionScene } from "./TheLordMurderAction.js";

const summonSpiders = `
  ${getClearLastFight('w.lavaSpider.first')}

  execute positioned -249.84 1.00 -104.42 run summon minecraft:skeleton ~ ~ ~ {Tags:["w.lavaSpider.skeleton", "mob-abilities.cobweb-thrower","w.lavaSpider.first"],HandItems:[{},{}],DeathLootTable:"health:burglar",Attributes:[{Name:"minecraft:generic.follow_range",Base: 40}], NoAI:true}

  execute positioned -247.14 1.00 -110.61 run summon minecraft:skeleton ~ ~ ~ {Tags:["w.lavaSpider.skeleton", "mob-abilities.cobweb-thrower","w.lavaSpider.first"],HandItems:[{},{}],DeathLootTable:"health:burglar",Attributes:[{Name:"minecraft:generic.follow_range",Base: 40}], NoAI:true}

  execute positioned -246.64 1.00 -108.24 run summon minecraft:skeleton ~ ~ ~ {Tags:["w.lavaSpider.skeleton", "mob-abilities.cobweb-thrower", "w.lavaSpider.first"],HandItems:[{},{}],DeathLootTable:"health:burglar",Attributes:[{Name:"minecraft:generic.follow_range",Base: 40}], NoAI:true}
`;

const summonSpiders2 = `
  ${getClearLastFight('w.lavaSpider.second')}
  
  execute positioned -227.39 1.00 -99.81 run summon minecraft:skeleton ~ ~ ~ {Tags:["w.lavaSpider.skeleton", "mob-abilities.cobweb-thrower","w.lavaSpider.second"],HandItems:[{},{}],DeathLootTable:"health:burglar",Attributes:[{Name:"minecraft:generic.follow_range",Base: 40}], NoAI:true}

  execute positioned -228 1 -111 run summon minecraft:skeleton ~ ~ ~ {Tags:["w.lavaSpider.skeleton", "mob-abilities.cobweb-thrower","w.lavaSpider.second"],HandItems:[{},{}],DeathLootTable:"health:burglar",Attributes:[{Name:"minecraft:generic.follow_range",Base: 40}], NoAI:true}

  execute positioned -232 1 -113 run summon minecraft:skeleton ~ ~ ~ {Tags:["w.lavaSpider.skeleton", "mob-abilities.cobweb-thrower","w.lavaSpider.second"],HandItems:[{},{}],DeathLootTable:"health:burglar",Attributes:[{Name:"minecraft:generic.follow_range",Base: 40}], NoAI:true}

  execute positioned -230 1 -111 run summon minecraft:skeleton ~ ~ ~ {Tags:["w.lavaSpider.skeleton", "mob-abilities.cobweb-thrower","w.lavaSpider.second"],HandItems:[{},{}],DeathLootTable:"health:burglar",Attributes:[{Name:"minecraft:generic.follow_range",Base: 40}], NoAI:true}
`;

const summonSpiders3 = `
  ${getClearLastFight('w.lavaSpider.third')}


  summon minecraft:skeleton -250 -12 -120 {Tags:["w.lavaSpider.skeleton", "mob-abilities.cobweb-thrower","w.lavaSpider.third"],HandItems:[{},{}],DeathLootTable:"health:burglar",Attributes:[{Name:"minecraft:generic.follow_range",Base: 40}], NoAI:true}
  summon minecraft:skeleton -241 -12 -119 {Tags:["w.lavaSpider.skeleton", "mob-abilities.cobweb-thrower","w.lavaSpider.third"],HandItems:[{},{}],DeathLootTable:"health:burglar",Attributes:[{Name:"minecraft:generic.follow_range",Base: 40}], NoAI:true}
  summon minecraft:skeleton -241 -11 -126 {Tags:["w.lavaSpider.skeleton", "mob-abilities.cobweb-thrower","w.lavaSpider.third"],HandItems:[{},{}],DeathLootTable:"health:burglar",Attributes:[{Name:"minecraft:generic.follow_range",Base: 40}], NoAI:true}

`;

const commonTags = 'Silent:true,HasVisualFire:false,PersistenceRequired:true,DeathLootTable:"health:burglar",NoAI:true,Invulnerable:true'
const summonArenaFight = `
  ${getClearLastFight('w.enemy.fight')}
  summon zombie -391.7 88 -341.1 {Rotation:[32f, 7f],Tags:["w.burglar", "w.no-fire", "mob-abilities.dasher", "w.enemy.fight"],${commonTags}}

  summon zombie -396 88 -327.6 {Rotation:[-173.10f, 6.41f],Tags:["w.burglar", "w.no-fire", "mob-abilities.dasher", "w.enemy.fight"],${commonTags}}

  summon zombie -403.5 88 -333.5 {Rotation:[-91f, 5f],Tags:["w.burglar", "w.no-fire", "mob-abilities.dasher", "w.enemy.fight"],${commonTags}}
`;

const summonArena2Fight = `
  ${getClearLastFight('w.enemy.fight')}

  ${summonArenaFight}

  summon minecraft:skeleton -400 88 -340.5 {Tags:["w.lavaSpider.skeleton", "mob-abilities.cobweb-thrower","w.enemy.fight"],HandItems:[{},{}],DeathLootTable:"health:burglar", NoAI:true,Attributes:[{Name:"minecraft:generic.follow_range",Base: 40}],ArmorItems: [{}, {}, {}, {id: "minecraft:leather_helmet",Count:1}]}
  summon minecraft:skeleton -404 88 -329 {Tags:["w.lavaSpider.skeleton", "mob-abilities.cobweb-thrower","w.enemy.fight"],HandItems:[{},{}],DeathLootTable:"health:burglar", NoAI:true,Attributes:[{Name:"minecraft:generic.follow_range",Base: 40}],ArmorItems: [{}, {}, {}, {id: "minecraft:leather_helmet",Count:1}]}
`;

const scene = new Scene({
  NAMESPACED_PATH,
  PATH,
  project,
  sceneIndex: 5910,
  sceneName: 'the-mine',
});

export {scene as TheMineScene};

scene.actionTree
  .then(`
    item replace block -329 10 -112 container.13 with minecraft:flint_and_steel
    clone -286 21 -94 -281 25 -101 -286 7 -101
    time add 400
    ${summonSpiders}
    ${summonSpiders2}
    ${summonSpiders3}
  `)
  .then(minerSpeech.sayAs({text: `I'm here to guard you, guys. You can safely destroy the wall.`}, ThePlayer))
  .then(new Wait(3))
  .then(minerSpeech.say({text: `Do it yourself then. We've heard disturbing noises from behind it.`}))
  .then(new Wait(3))
  .then(minerSpeech.sayAs({text: `The barrel with gunpowder is already in place. The flint and steel can be found behind the shaft.`}, Miner2))
  .then(new Wait(4))
  .then(new ContinueWhen(`execute positioned -289.04 8.00 -98.62 unless entity @a[tag=w.player,distance=..6]`))
  .then(minerSpeech.hide())
  .then(`
    say *The miners are changing their positions to some safer ones*
    say *You can safely fuse the tnt*
  `)
  .then(new ContinueWhen(`execute positioned -285.30 7.80 -95.25 if entity @e[type=tnt,distance=..40,nbt={Fuse:2s}]`))
  .then(`
    execute positioned -285.30 7.80 -95.25 run kill @e[type=tnt,distance=..40]
    execute positioned -285.30 7.80 -95.25 run function delta:api/explosion_emitter_particle
    clone -286 15 -94 -281 19 -101 -286 7 -101
    particle minecraft:cloud -282.78 9.00 -97.02 1 1 1 0.2 100
  `)
  .then(new ContinueWhen(`execute positioned -277.21 8.00 -100.41 if entity @a[tag=w.player,distance=..3]`))
  .then(new Fight({
    endWhenSuccess: `execute unless entity @e[tag=w.lavaSpider.first]`,
    skipFirstTimePreparation: true,
    prepareEffect: `
      ${summonSpiders}
    `,
    startEffect: `
      worldborder center -261.84 -106.56
      worldborder set 36
      
      execute as @e[tag=w.lavaSpider.first] run data merge entity @s {NoAI:false}
    `,
  }))
  .then(`
    worldborder set 999999
  `)
  .then(new ContinueWhen(`execute if entity @a[tag=w.player,x=-244,y=0,z=-112,dz=16,dx=2,dy=10]`))
  .then(new Fight({
    endWhenSuccess: `execute unless entity @e[tag=w.lavaSpider.second]`,
    skipFirstTimePreparation: true,
    prepareEffect: `
      ${summonSpiders2}
    `,
    startEffect: `
      execute as @e[tag=w.lavaSpider.second] run data merge entity @s {NoAI:false}
      worldborder center -233.55 -105.39
      worldborder set 26
    `
  }))
  .then(`
    worldborder set 99999
  `)
  .then(new ContinueWhen(`execute if entity @a[x=-235,y=-7,z=-131,dz=8,dy=10]`))
  .then(new Fight({
    endWhenSuccess: `execute unless entity @e[tag=w.lavaSpider.third]`,
    skipFirstTimePreparation: true,
    prepareEffect: `
      ${summonSpiders3}
    `,
    startEffect: `
      execute as @e[tag=w.lavaSpider.third] run data merge entity @s {NoAI:false}
      worldborder center -244 -120
      worldborder set 25
    `
  }))
  .then(`
    worldborder set 99999
  `)
  .then(new ContinueWhen(`execute positioned -222.38 -15.00 -66.19 if entity @a[distance=..4.3]`))
  .then(`
    spawnpoint @s
  `)
  .then(new UseCamera({
    anchorPoints: [
      {
        position: [-222.05, -13.04, -83.45],
        rotation: [-205.58, 17.99],
        durationTo: 1,
      },
      {
        position: [-220.3, -13, -69.5],
        rotation: [166, 10],
        durationTo: 4,
      }
    ]
  }))
  // .then(new FreezePlayer())
  .then(`
    execute in minecraft:overworld run tp @a[tag=w.player] -220.42 -14.00 -68.28 -306.38 13.24
    gamemode adventure @a[tag=w.player]
    say We've found it!
    say What?
    say We've found the magnetite!
    say There's also a giant spider nest over there, It might be dangerous!
    say Yes, better not interrupt the Mother, She usually lays somewhere near. Let's go back then. I will tell the miners that they can come and work once again as we have a precious mineral to extract...
    say Isn't it risky? It's close to the nest!
    say We will mine carefully. Let's go to the camp! And one more thing: Keep everything what you've seen here for yourself.
  `)
  .then(new ContinueWhen(`execute positioned -322.29 10.00 -104.36 if entity @a[tag=w.player,distance=..1]`))
  .then(`
    effect give @a minecraft:darkness 3
    effect give @a minecraft:blindness 3
    execute as @a at @s run playsound minecraft:entity.minecart.riding master @s ~ ~ ~
  `)
  .then(new Wait(2))
  .then(`
    tag @a[tag=w.player] add w.player.justElevated
    execute at @a[tag=w.player] run teleport @p ~ ~54 ~
  `)
  .then(new UsePath({
    pos: [-279, 80, -327],
    radius: 3,
  }))
  .then(`
    tag @a[tag=w.player] remove w.player.justElevated
  `)
  .concurrently({awaitingMethod: 'all-finished'}, [
    new ActionTree(scene)
      .then(new UsePath({
        pos: [-373, 88, -330],
        radius: 2,
      }))
      .then(`
        say Hello recruit: I'm the teacher around here. We need to test your fighting skills, step in the ring when you're ready.
      `)
      .then(new UsePath({
        pos: [-392, 88, -334],
        radius: 2,
      }))
      .then(`
        ${summonArenaFight}
        worldborder center -399.01 -334.01
        #worldborder set 19
      `)
      .then(`title @a title {"text": "3"}`)
      .then(new Wait(1))
      .then(`title @a title {"text": "2"}`)
      .then(new Wait(1))
      .then(`title @a title {"text": "1"}`)
      .then(new Wait(1))
      .then(`title @a title {"text": "Go!"}`)
      .then(new Fight({
        prepareEffect: `
          ${summonArenaFight}
        `,
        skipFirstTimePreparation: true,
        startEffect: `
          execute as @e[tag=w.enemy.fight] run data merge entity @s {NoAI:false,Invulnerable:false}
        `,
        endWhenSuccess: `execute unless entity @e[tag=w.enemy.fight]`
      }))
      .then(`
        say done
        ${summonArena2Fight}
      `)
      .then(`title @a title {"text": "3"}`)
      .then(new Wait(1))
      .then(`title @a title {"text": "2"}`)
      .then(new Wait(1))
      .then(`title @a title {"text": "1"}`)
      .then(new Wait(1))
      .then(`title @a title {"text": "Go!"}`)
      .then(new Fight({
        prepareEffect: `
          ${summonArena2Fight}
        `,
        skipFirstTimePreparation: true,
        startEffect: `
          execute as @e[tag=w.enemy.fight] run data merge entity @s {NoAI:false,Invulnerable:false}
        `,
        endWhenSuccess: `execute unless entity @e[tag=w.enemy.fight]`
      }))
      .then(`
        say Congratulations, that was great! You've got a potential to become the master of blade.
        say Now test yourself in the range.
      `)
    ,
    new ActionTree(scene)
      .then(new UsePath({
        pos: [-373, 88, -347],
        radius: 2,
      }))
  ])
  .then(`say The next day...`)
  .then(new RunScene(TheLordMurderActionScene))
 
  await scene.compile();