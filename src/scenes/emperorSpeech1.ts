import { NAMESPACED_PATH, PATH } from "../PATH";
import Scene from "../lib/Scene";



const scene = new Scene({
  NAMESPACED_PATH,
  PATH,
  sceneIndex: 1000,
  sceneName: 'emperor-speech-1',
});



await scene.compile();