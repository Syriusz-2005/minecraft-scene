import { NAMESPACED_PATH, PATH, project } from "../PATH.js";
import ActionTree from "../lib/ActionTree.js";
import Scene from "../lib/Scene.js";
import DisplayGoal from "../lib/actions/DisplayGoal.js";
import UnfreezePlayer from "../lib/actions/UnfreezePlayer.js";
import { horsePath } from "../models/Lord.js";


const scene = new Scene({
  NAMESPACED_PATH,
  PATH,
  project,
  sceneIndex: 2569,
  sceneName: 'evaporation-pt-2',
});
export {scene as Evaporation2Scene}

scene.actionTree
  .then(`
    kill @e[tag=mechanics.witness]
    kill @e[tag=mechanics.hiding_spot]
    kill @e[tag=mechanics.final_hiding_spot]

    execute positioned -1076.69 92.00 -193.51 run function mechanics:visibility/summon_hiding_spot
    execute positioned -1096.70 90.00 -185.53 run function mechanics:visibility/summon_hiding_spot
    execute positioned -1090.38 92.00 -198.56 run function mechanics:visibility/summon_hiding_spot
    execute positioned -1096.59 91.00 -177.48 run function mechanics:visibility/summon_hiding_spot
    execute positioned -1113.00 89.00 -173.49 run function mechanics:visibility/summon_hiding_spot
    execute positioned -1125.59 88.88 -171.54 run function mechanics:visibility/summon_hiding_spot
    execute positioned -1134.70 88.00 -176.31 run function mechanics:visibility/summon_hiding_spot
    execute positioned -1125.54 88.00 -191.58 run function mechanics:visibility/summon_hiding_spot
    execute positioned -1108.70 88.00 -202.55 run function mechanics:visibility/summon_hiding_spot
    execute positioned -1115.29 88.00 -198.56 run function mechanics:visibility/summon_hiding_spot
    execute positioned -1127.70 90.00 -200.42 run function mechanics:visibility/summon_hiding_spot


    execute positioned -1134.57 89.00 -190.35 run function mechanics:visibility/summon_hiding_spot
    execute positioned -1134.57 89.00 -190.35 run function mechanics:visibility/summon_final_hiding_spot

    bossbar set stealthtime visible true
    bossbar set stealthtime players @a

    bossbar set stealth visible true
    bossbar set stealth players @a
  `)
  .then(new UnfreezePlayer())
  .then(`
    scoreboard players set $stealthTime w.internal 1200
    scoreboard players set @a mechanics.exposure 0
    execute positioned -1143 90 -193 run function mechanics:visibility/summon_witness
  `)
  .then(new DisplayGoal([{text: 'Sneak to the convoy before the time runs out.'}]))
  .then(horsePath.setPause(false))
  .then(horsePath.setPosition([-1124.48, 89.00, -211.82]))
  .concurrently({awaitingMethod: 'all-finished'}, [
    new ActionTree(scene)
      .then(horsePath.moveTo([-1141.22, 92.00, -203.93], {speed: 0.26}))
      .then(horsePath.setPause(true))


  ])
  .then(horsePath.setPause(false))
  .concurrently({awaitingMethod: 'all-finished'}, [
    new ActionTree(scene)
      .then(horsePath.moveTo([-1147.10, 89.00, -180], {speed: 0.2}))
      .then(horsePath.setPause(true))


  ])
  .then(`say finished!`)

await scene.compile();