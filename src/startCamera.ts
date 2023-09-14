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
  .then(`
    tag @a add w.player
    tag @a remove w.initialized
  `)
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
    function effect:cursed_forest/remove_ambient
  `)
  .then(new Wait(2))
  .then(openingNarrativeSpeech.say({ text: 'A long long time ago, a kingdom lived at war...' }))
  .then(new Wait(5))
  .then(openingNarrativeSpeech.say({ text: 'The Emperor, ruler of this kingdom, one day spoke:' }))
  .then(new Wait(6))
  .then(openingNarrativeSpeech.say({ text: `Look around, this is our kingdom, crafted by our own hands, and now we must protect it from evil. The opposing kingdom looms as a threat to all of us, while the terrorists work to undermine us from the inside.` }))
  .then(new Wait(11))
  .then(openingNarrativeSpeech.say({ text: `In these trying times, we need all of you to stand together and fight for our land.` }))
  .then(new Wait(6))
  .then(openingNarrativeSpeech.say({ text: `Tomorrow, all men at the age of eighteen must assemble in the square to be recruited into the army.` }))
  .then(new Wait(3))
  .then(openingNarrativeSpeech.say({ text: `...` }))
  .then(new Wait(3))
  .then(openingNarrativeSpeech.say({ text: `That includes you.` }))
  .then(new Wait(6))
  .then(openingNarrativeSpeech.hide())
  .then(new RunScene(CastleTravelScene));
  
await startCamera.compile();
