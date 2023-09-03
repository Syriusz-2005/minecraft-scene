import Scene from "./lib/Scene.js";
import UseCamera from "./lib/actions/UseCamera.js";
import Wait from "./lib/actions/Wait.js";
import { openingNarrativeSpeech } from "./speakers/openingNarrative.js";
import RunScene from "./lib/actions/RunScene.js";
import { CastleTravelScene } from "./scenes/castle-travel.js";
import { NAMESPACED_PATH, PATH, project } from "./PATH.js";

const startCamera = new Scene({
  NAMESPACED_PATH,
  PATH,
  sceneIndex: -600,
  sceneName: 'start-camera',
  project,
});
export { startCamera };
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
  .then(`
    spectate @e[type=armor_stand,tag=w.menu2Marker,limit=1] @a[tag=w.player,limit=1]
  `)
  .then(new Wait(2))
  .then(openingNarrativeSpeech.say({ text: 'A long long time ago, a kingdom lived in war...' }))
  .then(new Wait(5))
  .then(openingNarrativeSpeech.say({ text: 'The emperor, ruler of this kingdom has one day spoken:' }))
  .then(new Wait(6))
  .then(openingNarrativeSpeech.say({ text: `Look around, this is our kingdom. We built It with our own hands, and now we must protect it from evil. The oponent kingdom is a threat to all of us, and the terrorists are destabilizing us from the inside.` }))
  .then(new Wait(11))
  .then(openingNarrativeSpeech.say({ text: `In those hard times, we need you, all of you to stand together and fight for our land.` }))
  .then(new Wait(6))
  .then(openingNarrativeSpeech.say({ text: `Tomorrow men at the age of eighteen must appear on the square to be recruited to the army.` }))
  .then(new Wait(6))
  .then(openingNarrativeSpeech.say({ text: `Including you.` }))
  .then(new Wait(6))
  .then(openingNarrativeSpeech.hide())
  .then(new RunScene(CastleTravelScene));
  
await startCamera.compile();
