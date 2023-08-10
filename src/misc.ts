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



const beggarScene = new Scene({
  NAMESPACED_PATH,
  PATH,
  sceneIndex: -10000,
  sceneName: 'beggar-begging',
  autoStart: true,
});

const beggarSentence = new TransformGroup('beggar');

const Beggar = new Speaker('Beggar', 'green');

const pos: Vector = [-295, 66, -64]

beggarScene.actionTree
  .then(new ContinueWhen('execute if entity @a[tag=w.player,x=-302,y=64,z=-65,dz=4,dx=7]'))
  .then('execute as @a at @s run playsound minecraft:entity.villager.celebrate master @s ~ ~ ~ 1 1 1')
  .then(new DisplayText(pos, Beggar, '[{"text": "A single coin for the pathetic beggar?"}]', beggarSentence))
  .then(new DisplayMenu({
    preText: '[{"text": "Give a coin to the beggar?"}]',
    options: [
      {
        content: 'Yes',
        then: new DisplayText(pos, Beggar, '[{"text": "Thank you!"}]', beggarSentence)
      },
      {
        content: 'No',
        then: new DisplayText(pos, Beggar, '[{"text": "Take your time and come back later!"}]', beggarSentence)
      }
    ]
  }))
  .then(new Wait(3))
  .then('execute as @a at @s run playsound minecraft:entity.villager.celebrate master @s ~ ~ ~ 1 1 1')
  .then(new ContinueWhen('execute unless entity @a[tag=w.player,x=-302,y=64,z=-65,dz=4,dx=7]'))
  .then(new Wait(2))
  .then(`kill @e[tag=${beggarSentence.groupTag}]`)
  .then('function w:generated/beggar-begging/0-0')

await beggarScene.compile();