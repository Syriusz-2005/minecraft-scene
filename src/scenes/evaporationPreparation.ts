import { NAMESPACED_PATH, PATH, project } from "../PATH.js";
import Scene from "../lib/Scene.js";
import ContinueWhen from "../lib/actions/ContinueWhen.js";
import Restart from "../lib/actions/Restart.js";
import UsePath from "../lib/actions/UsePath.js";
import Wait from "../lib/actions/Wait.js";
import { campCaptainSpeech } from "../speakers/Captain.js";
import { ThePlayer } from "../speakers/ThePlayer.js";


const scene = new Scene({
  NAMESPACED_PATH,
  PATH,
  project,
  sceneIndex: 8832,
  sceneName: 'evaporation-preparation',
});

scene.actionTree
  // .then(new UsePath({
  //   pos: [-327.5, 83, -338.5],
  //   radius: 1.5,
  // }))
  .then(new ContinueWhen(`execute positioned -317.5 87 -370.5 if entity @a[distance=..3]`))
  .then(campCaptainSpeech.sayAs({text: `You wanted to see me captain`}, ThePlayer))
  .then(new Wait(3))
  .then(campCaptainSpeech.say({text: `[captain's speech goes here]`}))
  .then(new Wait(5))
  .then(campCaptainSpeech.hide())
await scene.compile();

