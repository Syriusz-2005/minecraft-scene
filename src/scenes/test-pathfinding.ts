import { NAMESPACED_PATH, PATH, project } from "../PATH.js";
import Scene from "../lib/Scene.js";
import Pathfinder from "../lib/utils/Pathfinder.js";

const pathfinder = new Pathfinder({
  id: 'test-pathfinder',
  NAMESPACED_PATH,
  PATH,
  project,
  options: {
    speed: .7,
    successRadius: 2,
  }
});

await pathfinder.init();


const scene = new Scene({
  NAMESPACED_PATH,
  PATH,
  project,
  sceneIndex: -5603,
  sceneName: 'test-pathfinding',
});

scene.actionTree
  .then(`
    say created pathfinder
  `)
  .then(pathfinder.setPosition([-277.51, 79.00, 22.62]))
  .then(pathfinder.moveTo([-237, 79.00, 22.62]))
  .then(`
    say the path is complete
  `)

await scene.compile();