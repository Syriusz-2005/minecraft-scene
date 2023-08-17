import { NAMESPACED_PATH, PATH } from "../PATH.js";
import Scene from "../lib/Scene.js";


const scene = new Scene({
  NAMESPACED_PATH,
  PATH,
  sceneIndex: 1000,
  sceneName: 'emperor-speech-1',
});


scene.actionTree
  .then('tp @a[tag=w.player] -151 70 -106')
  .then('gamemode adventure @a[tag=w.player]')


await scene.compile();