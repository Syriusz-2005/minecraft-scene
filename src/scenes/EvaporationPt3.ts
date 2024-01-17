import { NAMESPACED_PATH, PATH, project } from "../mainProject.js";
import Scene from "../lib/Scene.js";
import Fight from "../lib/actions/Fight.js";
import FreezePlayer from "../lib/actions/FreezePlayer.js";
import UnfreezePlayer from "../lib/actions/UnfreezePlayer.js";
import Wait from "../lib/actions/Wait.js";
import { getClearLastFight } from "../lib/utils/ClearLastFight.js";



const scene = new Scene({
  NAMESPACED_PATH,
  PATH,
  project,
  sceneIndex: 2678,
  sceneName: 'evaporation_pt3',
});

scene.actionTree
  .then(`
    kill @e[tag=mechanics.witness]
    kill @e[tag=mechanics.hiding_spot]
    kill @e[tag=mechanics.final_hiding_spot]
  `)
  .then(new FreezePlayer([-1134.46, 89.00, -190.53]))
  .then(`
    title @a times 10t 5s 10t 
    title @a title {"text": "The actions starts in", "color": "gold"}
    title @a subtitle {"text": "5"}
  `)
  .then(new Wait(1))
  .then(`
    title @a subtitle {"text": "4"}
  `)
  .then(new Wait(1))
  .then(`
    title @a subtitle {"text": "3"}
  `)
  .then(new Wait(1))
  .then(`
    title @a subtitle {"text": "2"}
  `)
  .then(new Wait(1))
  .then(`
    title @a subtitle {"text": "1"}
  `)
  .then(new Wait(1))
  .then(`
    worldborder center -1145 -191
    worldborder set 30
  `)
  .then(new UnfreezePlayer())
  .then(new Fight({
    prepareEffect: `
      ${getClearLastFight(['w.evaporation.enemy', "w.lordGuard.skeleton"])}
      summon skeleton -1143.41 89.00 -186.12 {Tags: ["w.lordGuard.skeleton", "w.evaporation.enemy", "ma.halberdAttacker"],HandItems:[{},{}],DeathLootTable:"health:burglar"}
      summon skeleton -1144.79 89.00 -182.97 {Tags: ["w.lordGuard.skeleton", "w.evaporation.enemy", "ma.halberdAttacker"],HandItems:[{},{}],DeathLootTable:"health:burglar"}
      summon skeleton -1143.40 88.00 -180.65 {Tags: ["w.lordGuard.skeleton", "w.evaporation.enemy", "ma.halberdAttacker"],HandItems:[{},{}],DeathLootTable:"health:burglar"}
    `,
    startEffect: `
      worldborder center -1145 -191
      worldborder set 30
      execute in minecraft:overworld run spawnpoint @a[tag=w.player] -1134 89 -190
    `,
    skipFirstTimePreparation: false,
    endWhenSuccess: `execute unless entity @e[tag=w.evaporation.enemy]`,
  }))
  .then(`
    worldborder set 999999
  `)
