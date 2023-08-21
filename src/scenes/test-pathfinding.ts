import { NAMESPACED_PATH, PATH, project } from "../PATH.js";
import Scene from "../lib/Scene.js";
import Restart from "../lib/actions/Restart.js";
import Pathfinder from "../lib/utils/Pathfinder.js";
import { Vector } from "../lib/utils/Vector.js";

const pathfinder = new Pathfinder({
  id: 'test-pathfinder',
  NAMESPACED_PATH,
  PATH,
  project,
  options: {
    speed: 1.2,
    successRadius: 2,
  }
});

await pathfinder.init();

const startPos: Vector = [-277.51, 79.00, 22.62];


const scene = new Scene({
  NAMESPACED_PATH,
  PATH,
  project,
  sceneIndex: -5603,
  sceneName: 'test-pathfinding',
  autoStart: true,
});

scene.actionTree
  .then(pathfinder.summon(startPos))
  .then(`
    #say created pathfinder
  `)
  .then(pathfinder.setPosition(startPos))
  .then(pathfinder.moveTo([-237, 79.00, 22.62]))
  .then(pathfinder.dispatch())
  .then(`
    #say the path is complete
  `)
  .then(new Restart())

await scene.compile();