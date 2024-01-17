import { NAMESPACED_PATH, PATH, project } from "../mainProject.js";
import ActionTree from "../lib/ActionTree.js";
import Scene from "../lib/Scene.js";
import FreezePlayer from "../lib/actions/FreezePlayer.js";
import RunScene from "../lib/actions/RunScene.js";
import UnfreezePlayer from "../lib/actions/UnfreezePlayer.js";
import Pathfinder from "../lib/utils/Pathfinder.js";
import { horsePath } from "../models/Lord.js";
import { guard1Path, guard2Path, guard3Path } from "../models/LordsGuard.js";
import { Evaporation2Scene } from "./EvaporationPt2.js";





await guard1Path.init();
await guard2Path.init();
await guard3Path.init();
await horsePath.init();

const scene = new Scene({
  NAMESPACED_PATH,
  PATH,
  project: project,
  sceneIndex: 2567,
  sceneName: 'evaporation',
});

scene.actionTree
  .then(`
    kill @e[tag=mechanics.witness]
    kill @e[tag=w.lord.skeleton]
    kill @e[tag=w.lordHorse]
    kill @e[tag=mechanics.hiding_spot]
    time set 20000
    scoreboard players set $stealthTime w.internal 1200
    scoreboard players set @a mechanics.exposure 0
    summon horse -1058.55 86.00 -268.76 {Tags: ["w.lordHorse"],NoAI:true,Passengers:[{id: "minecraft:villager",Silent:true,Invulnerable:true,Tags:["w.lord.skeleton"]}]}

    execute in minecraft:overworld run tp @a[tag=w.player] -1076.39 92.00 -193.30 -174.01 10.87
    scoreboard players set @a[tag=w.player] mechanics.exposure 0
    execute as @a[tag=w.player] at @s run spawnpoint @s
  `)
  .then(new FreezePlayer())
  .then(horsePath.summon([-1058.55, 86.00, -268.76]))
  .then(horsePath.setPosition([-1058.55, 86.00, -268.76]))
  .then(horsePath.connect(`@e[tag=w.lordHorse]`))

  .then(guard1Path.summon([-1058.55, 85.00, -272.76]))
  .then(guard2Path.summon([-1057, 85.00, -272.76]))
  .then(guard3Path.summon([-1058, 85.00, -274.76]))


  .concurrently({awaitingMethod: 'all-finished'}, [
    new ActionTree(scene)
      .then(horsePath.moveTo([-1069, 90, -240]))
      .then(horsePath.setPause(true))

    ,new ActionTree(scene)
      .then(guard1Path.moveTo([-1069, 90, -243]))
      .then(guard1Path.setPause(true))

    ,new ActionTree(scene)
      .then(guard2Path.moveTo([-1067, 90, -243]))
      .then(guard2Path.setPause(true))

    ,new ActionTree(scene)
      .then(guard3Path.moveTo([-1069, 90, -246]))
      .then(guard3Path.setPause(true))
  ])
  .then(horsePath.setPause(false))
  .then(guard1Path.setPause(false))
  .then(guard2Path.setPause(false))
  .then(guard3Path.setPause(false))


  .concurrently({awaitingMethod: 'all-finished'}, [
    new ActionTree(scene)
      .then(horsePath.moveTo([-1074, 91, -217]))
      .then(horsePath.setPause(true))

    ,new ActionTree(scene)
      .then(guard1Path.moveTo([-1074, 91, -220]))
      .then(guard1Path.setPause(true))

    ,new ActionTree(scene)
      .then(guard2Path.moveTo([-1072, 91, -220]))
      .then(guard2Path.setPause(true))

    ,new ActionTree(scene)
      .then(guard3Path.moveTo([-1074, 91, -223]))
      .then(guard3Path.setPause(true))
  ])
  .then(horsePath.setPause(false))
  .then(guard1Path.setPause(false))
  .then(guard2Path.setPause(false))
  .then(guard3Path.setPause(false))


  .concurrently({awaitingMethod: 'all-finished'}, [
    new ActionTree(scene)
      .then(horsePath.moveTo([-1097, 90, -207]))
      .then(horsePath.setPause(true))
    
    ,new ActionTree(scene)
      .then(guard1Path.moveTo([-1097, 90, -210]))
      .then(guard1Path.setPause(true))

    ,new ActionTree(scene)
      .then(guard2Path.moveTo([-1095, 91, -210]))
      .then(guard2Path.setPause(true))

    ,new ActionTree(scene)
      .then(guard3Path.moveTo([-1097, 91, -212]))
      .then(guard3Path.setPause(true))
  ])
  .then(horsePath.setPause(false))
  .then(guard1Path.setPause(false))
  .then(guard2Path.setPause(false))
  .then(guard3Path.setPause(false))


  .concurrently({awaitingMethod: 'all-finished'}, [
    new ActionTree(scene)
      .then(horsePath.moveTo([-1129, 89, -210], {speed: 0.43}))
      .then(horsePath.setPause(true))
    
    ,new ActionTree(scene)
      .then(guard1Path.moveTo([-1127, 89, -210]))
      .then(guard1Path.setPause(true))

    ,new ActionTree(scene)
      .then(guard2Path.moveTo([-1127, 91, -212]))
      .then(guard2Path.setPause(true))
    
    ,new ActionTree(scene)
      .then(guard3Path.moveTo([-1124, 91, -210]))
      .then(guard3Path.setPause(true))
  ])
  .then(horsePath.setPause(false))
  .then(guard1Path.setPause(false))
  .then(guard2Path.setPause(false))
  .then(guard3Path.setPause(false))

  .then(new RunScene(Evaporation2Scene))


export { horsePath };
