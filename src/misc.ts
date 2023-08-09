import Scene from "./lib/Scene.js";
import ContinueWhen from "./lib/actions/ContinueWhen.js";
import RunCommand from "./lib/actions/RunCommand.js";
import { NAMESPACED_PATH, PATH } from "./PATH.js";
import Speaker from "./lib/utils/Speaker.js";
import DisplaySentence from "./lib/actions/DisplaySentence.js";
import DisplayText from "./lib/actions/DisplayText.js";
import TransformGroup from "./lib/utils/TransformGroup.js";
import Wait from "./lib/actions/Wait.js";



const beggarScene = new Scene({
  NAMESPACED_PATH,
  PATH,
  sceneIndex: -10000,
  sceneName: 'beggar-begging',
  autoStart: true,
});

const beggarSentence = new TransformGroup('beggar');

const Beggar = new Speaker('Beggar', 'green');



beggarScene.actionTree
  .then(new ContinueWhen('execute if entity @a[tag=w.player,x=-302,y=64,z=-65,dz=4,dx=7]'))
  .then(new DisplayText([-295, 66, -64], Beggar, '[{"text": "A single coin for the pathetic beggar?"}]', beggarSentence))
  .then(new Wait(3))
  .then(new DisplayText([-295, 66, -64], Beggar, '[{"text": "Thank you!"}]', beggarSentence))
  .then(new ContinueWhen('execute unless entity @a[tag=w.player,x=-302,y=64,z=-65,dz=4,dx=7]'))
  .then(new Wait(5))
  .then(new RunCommand(`kill @e[tag=${beggarSentence.groupTag}]`))
  .then(new RunCommand('function w:generated/beggar-begging/0-0'))

await beggarScene.compile();