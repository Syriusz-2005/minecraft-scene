import { NAMESPACED_PATH, PATH, project } from "../PATH.js";
import ActionTree from "../lib/ActionTree.js";
import Scene from "../lib/Scene.js";
import Pathfinder from "../lib/utils/Pathfinder.js";

const horsePath = new Pathfinder({
  id: 'the-lord-horse',
  NAMESPACED_PATH,
  project,
  PATH,
  options: {
    speed: 0.37,
    successRadius: 3.5,
  }
});

const guard1Path = new Pathfinder({
  id: 'lord_guard_1',
  NAMESPACED_PATH,
  project,
  PATH,
  options: {
    speed: 0.54,
    successRadius: 3.5,
  },
  extraCustomTag: 'w.burglar',
});

const guard2Path = new Pathfinder({
  id: 'guard_2',
  NAMESPACED_PATH,
  project,
  PATH,
  options: {
    speed: 0.54,
    successRadius: 3.5,
  }
});

await guard1Path.init();
await guard2Path.init();
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
    summon horse -1058.55 86.00 -268.76 {Tags: ["w.lordHorse"],NoAI:true,Passengers:[{id: "minecraft:villager",Silent:true,Invulnerable:true,Tags:["w.lord.skeleton"]}]}
  `)
  .then(horsePath.summon([-1058.55, 86.00, -268.76]))
  .then(horsePath.setPosition([-1058.55, 86.00, -268.76]))
  .then(horsePath.connect(`@e[tag=w.lordHorse]`))

  .then(guard1Path.summon([-1058.55, 86.00, -272.76]))

  .concurrently({awaitingMethod: 'all-finished'}, [
    new ActionTree(scene)
      .then(horsePath.moveTo([-1069, 90, -240]))
      .then(horsePath.setPause(true))

    ,new ActionTree(scene)
      .then(guard1Path.moveTo([-1069, 90, -243]))
      .then(guard1Path.setPause(true))
  ])
  .then(horsePath.setPause(false))
  .then(guard1Path.setPause(false))

  .concurrently({awaitingMethod: 'all-finished'}, [
    new ActionTree(scene)
      .then(horsePath.moveTo([-1074, 91, -217]))
      .then(horsePath.setPause(true))

    ,new ActionTree(scene)
      .then(guard1Path.moveTo([-1074, 91, -220]))
      .then(guard1Path.setPause(true))

  ])
  .then(horsePath.setPause(false))
  .then(guard1Path.setPause(false))

  .concurrently({awaitingMethod: 'all-finished'}, [
    new ActionTree(scene)
      .then(horsePath.moveTo([-1097, 90, -207]))
      .then(horsePath.setPause(true))
    
    ,new ActionTree(scene)
      .then(guard1Path.moveTo([-1097, 90, -210]))
      .then(guard1Path.setPause(true))
  ])
  .then(horsePath.setPause(false))
  .then(guard1Path.setPause(false))

  .concurrently({awaitingMethod: 'all-finished'}, [
    new ActionTree(scene)
      .then(horsePath.moveTo([-1129, 89, -210]))
      .then(horsePath.setPause(true))
    
    ,new ActionTree(scene)
      .then(guard1Path.moveTo([-1127, 89, -210]))
      .then(guard1Path.setPause(true))
  ])
  .then(horsePath.setPause(false))
  .then(guard1Path.setPause(false))

  .then(horsePath.dispatch())
  .then(guard1Path.dispatch())

await scene.compile();