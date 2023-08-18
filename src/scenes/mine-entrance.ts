import { NAMESPACED_PATH, PATH } from "../PATH.js";
import Scene from "../lib/Scene.js";


const scene = new Scene({
  NAMESPACED_PATH,
  PATH,
  sceneIndex: 1350,
  sceneName: 'mine-entrance',
});


scene.actionTree
  .then(`
    say hello
  `)

await scene.compile();