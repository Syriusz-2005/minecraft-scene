import { NAMESPACED_PATH, PATH, project } from "../PATH.js";
import Scene from "../lib/Scene.js";


const scene = new Scene({
  NAMESPACED_PATH,
  PATH,
  project: project,
  sceneIndex: 2567,
  sceneName: 'evaporation',
});

scene.actionTree

await scene.compile();