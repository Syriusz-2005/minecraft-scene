import Scene from "./lib/Scene.js"
import UseCamera from "./lib/actions/UseCamera.js";
import { NAMESPACED_PATH, PATH, project } from "./PATH.js";

export {}

console.time('Compiled in');
import './misc.js'
import './scenes/castle-travel.js'
import './scenes/emperorSpeech1.js'
import './scenes/mine-entrance.js';
import './scenes/test-pathfinding.js';
import './scenes/time-before-recruitment.js';
import './scenes/city-camp-fast-travel.js';
import './scenes/camp-city-fast-travel.js';
import './models/lavaSpider.js'

const startCamera = new Scene({
  NAMESPACED_PATH,
  PATH,
  sceneIndex: -600,
  sceneName: 'start-camera',
  project,
});

startCamera.actionTree
  .then(new UseCamera({
    anchorPoints: [
      {
        durationTo: 1,
        position: [-200, -12, 47],
        rotation: [-164.7, 23.5],
        in: 'w:warland',
      },
      {
        durationTo: 7,
        position: [-187.5, 10.7, 57.6],
        rotation: [114, 58],
      },
      {
        durationTo: 4,
        position: [-187.6, 10.8, 57.7],
        rotation: [114.1, 58.1],
      }
    ]
  }))

await startCamera.compile();

console.timeEnd('Compiled in');
