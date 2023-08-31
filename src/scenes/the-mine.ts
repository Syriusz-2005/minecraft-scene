import { NAMESPACED_PATH, PATH, project } from "../PATH.js";
import Scene from "../lib/Scene.js";
import ContinueWhen from "../lib/actions/ContinueWhen.js";
import Fight from "../lib/actions/Fight.js";
import Wait from "../lib/actions/Wait.js";
import { Miner2, minerSpeech } from "../speakers/MinerSpeech.js";
import { ThePlayer } from "../speakers/ThePlayer.js";

const summonSpiders = `
  kill @e[tag=w.lavaSpider.first]
  execute positioned -249.84 1.00 -104.42 run summon minecraft:skeleton ~ ~ ~ {Tags:["w.lavaSpider.skeleton", "mob-abilities.cobweb-thrower","w.lavaSpider.first"],HandItems:[{},{}],DeathLootTable:"health:burglar",Attributes:[{Name:"minecraft:generic.follow_range",Base: 40}], NoAI:true}

  execute positioned -247.14 1.00 -110.61 run summon minecraft:skeleton ~ ~ ~ {Tags:["w.lavaSpider.skeleton", "mob-abilities.cobweb-thrower","w.lavaSpider.first"],HandItems:[{},{}],DeathLootTable:"health:burglar",Attributes:[{Name:"minecraft:generic.follow_range",Base: 40}], NoAI:true}

  execute positioned -246.64 1.00 -108.24 run summon minecraft:skeleton ~ ~ ~ {Tags:["w.lavaSpider.skeleton", "mob-abilities.cobweb-thrower", "w.lavaSpider.first"],HandItems:[{},{}],DeathLootTable:"health:burglar",Attributes:[{Name:"minecraft:generic.follow_range",Base: 40}], NoAI:true}
`;

const summonSpiders2 = `
  kill @e[tag=w.lavaSpider.second]
  execute positioned -227.39 1.00 -99.81 run summon minecraft:skeleton ~ ~ ~ {Tags:["w.lavaSpider.skeleton", "mob-abilities.cobweb-thrower","w.lavaSpider.second"],HandItems:[{},{}],DeathLootTable:"health:burglar",Attributes:[{Name:"minecraft:generic.follow_range",Base: 40}], NoAI:true}

  execute positioned -228 10 -111 run summon minecraft:skeleton ~ ~ ~ {Tags:["w.lavaSpider.skeleton", "mob-abilities.cobweb-thrower","w.lavaSpider.second"],HandItems:[{},{}],DeathLootTable:"health:burglar",Attributes:[{Name:"minecraft:generic.follow_range",Base: 40}], NoAI:true}

  execute positioned -232 1 -113 run summon minecraft:skeleton ~ ~ ~ {Tags:["w.lavaSpider.skeleton", "mob-abilities.cobweb-thrower","w.lavaSpider.second"],HandItems:[{},{}],DeathLootTable:"health:burglar",Attributes:[{Name:"minecraft:generic.follow_range",Base: 40}], NoAI:true}

  execute positioned -230 1 -111 run summon minecraft:skeleton ~ ~ ~ {Tags:["w.lavaSpider.skeleton", "mob-abilities.cobweb-thrower","w.lavaSpider.second"],HandItems:[{},{}],DeathLootTable:"health:burglar",Attributes:[{Name:"minecraft:generic.follow_range",Base: 40}], NoAI:true}
`;

const summonSpiders3 = `
  kill @e[tag=w.lavaSpider.third]


  summon minecraft:skeleton -250 -12 -120 {Tags:["w.lavaSpider.skeleton", "mob-abilities.cobweb-thrower","w.lavaSpider.third"],HandItems:[{},{}],DeathLootTable:"health:burglar",Attributes:[{Name:"minecraft:generic.follow_range",Base: 40}], NoAI:true}
  summon minecraft:skeleton -241 -12 -119 {Tags:["w.lavaSpider.skeleton", "mob-abilities.cobweb-thrower","w.lavaSpider.third"],HandItems:[{},{}],DeathLootTable:"health:burglar",Attributes:[{Name:"minecraft:generic.follow_range",Base: 40}], NoAI:true}
  summon minecraft:skeleton -241 -11 -126 {Tags:["w.lavaSpider.skeleton", "mob-abilities.cobweb-thrower","w.lavaSpider.third"],HandItems:[{},{}],DeathLootTable:"health:burglar",Attributes:[{Name:"minecraft:generic.follow_range",Base: 40}], NoAI:true}

`;

const scene = new Scene({
  NAMESPACED_PATH,
  PATH,
  project,
  sceneIndex: 5910,
  sceneName: 'the-mine',
});


scene.actionTree
  .then(`
    item replace block -329 10 -112 container.13 with minecraft:flint_and_steel
    clone -286 21 -94 -281 25 -101 -286 7 -101
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



  await scene.compile();