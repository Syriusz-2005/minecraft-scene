import Scene from "./lib/Scene.js";
import ContinueWhen from "./lib/actions/ContinueWhen.js";
import RunCommand from "./lib/actions/RunCommand.js";
import { NAMESPACED_PATH, PATH } from "./PATH.js";
import Speaker from "./lib/utils/Speaker.js";
import DisplaySentence from "./lib/actions/DisplaySentence.js";
import DisplayText from "./lib/actions/DisplayText.js";
import TransformGroup from "./lib/utils/TransformGroup.js";
import Wait from "./lib/actions/Wait.js";
import Switch from "./lib/actions/Switch.js";
import { VMath, Vector } from "./lib/utils/Vector.js";
import DisplayMenu from "./lib/actions/DisplayMenu.js";
import Speech from "./lib/utils/Speech.js";
import ActionTree from "./lib/ActionTree.js";
import { ThePlayer } from "./speakers/ThePlayer.js";



const beggarScene = new Scene({
  NAMESPACED_PATH,
  PATH,
  sceneIndex: -10000,
  sceneName: 'beggar-begging',
  autoStart: true,
});

const beggarSentence = new TransformGroup('beggar');

const Beggar = new Speaker('Beggar', 'green');

const pos: Vector = [-295, 66, -64];

const beggarSpeech = new Speech(Beggar, pos, beggarSentence);

const playSpeakSound = 'execute as @a at @s run playsound minecraft:entity.villager.celebrate master @s ~ ~ ~ 1 1 1';

beggarScene.actionTree
  .then(new ContinueWhen('execute if entity @a[tag=w.player,x=-302,y=64,z=-65,dz=4,dx=7]'))
  .then(playSpeakSound)
  .then(beggarSpeech.say({text: 'A single coin for the pathetic beggar?'}))
  .then(new DisplayMenu({
    preText: '[{"text": "Give a coin to the beggar?"}]',
    options: [
      {
        content: 'Yes',
        then: new ActionTree(beggarScene)
          .then(new DisplaySentence(ThePlayer, '[{"text": "Sure, here you go."}]'))
          .then(new Wait(2))
          .then(playSpeakSound)
          .then(beggarSpeech.say({text: 'Thank you!'}))
      },
      {
        content: 'No',
        then: new ActionTree(beggarScene)
          .then(new DisplaySentence(ThePlayer, '[{"text": "Not now, I\'m sorry."}]'))
          .then(new Wait(3))
          .then(playSpeakSound)
          .then(beggarSpeech.say({text: 'Come back later, please.'}))
      }
    ],
    skipWhen: 'execute unless entity @a[tag=w.player,x=-302,y=64,z=-65,dz=4,dx=7]'
  }))
  .then(new ContinueWhen('execute unless entity @a[tag=w.player,x=-302,y=64,z=-65,dz=4,dx=7]'))
  .then(new Wait(2))
  .then(`kill @e[tag=${beggarSentence.groupTag}]`)
  .then('function w:generated/beggar-begging/0-0')

await beggarScene.compile();