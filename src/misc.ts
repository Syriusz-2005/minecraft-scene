import Scene from "./lib/Scene.js";
import ContinueWhen from "./lib/actions/ContinueWhen.js";
import { NAMESPACED_PATH, PATH } from "./PATH.js";
import Speaker from "./lib/utils/Speaker.js";
import DisplaySentence from "./lib/actions/DisplaySentence.js";
import TransformGroup from "./lib/utils/TransformGroup.js";
import Wait from "./lib/actions/Wait.js";
import { Vector } from "./lib/utils/Vector.js";
import DisplayMenu from "./lib/actions/DisplayMenu.js";
import Speech from "./lib/utils/Speech.js";
import ActionTree from "./lib/ActionTree.js";
import { ThePlayer } from "./speakers/ThePlayer.js";
import RunCommand from "./lib/actions/RunCommand.js";
import DisplayText from "./lib/actions/DisplayText.js";
import UsePath from "./lib/actions/UsePath.js";
import FreezePlayer from "./lib/actions/FreezePlayer.js";
import UnfreezePlayer from "./lib/actions/UnfreezePlayer.js";


const pathScene = new Scene({
  NAMESPACED_PATH,
  PATH,
  sceneIndex: 78,
  sceneName: 'path-test',
});

pathScene.actionTree
  .then(new UsePath({
    pos: [-250, 64, -76],
    radius: 3,
  }))
  .then(new UsePath({
    pos: [-260, 79, 16],
    radius: 3,
  }))
  .then('say anchor achieved!')

await pathScene.compile();


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
const playChatNotificationSound = 'execute as @a at @s run playsound minecraft:ui.toast.in master @s ~ ~ ~ 1 1 1';

beggarScene.actionTree
  .then(new ContinueWhen('execute if entity @a[tag=w.player,x=-302,y=64,z=-65,dz=4,dx=7]'))
  .then(playSpeakSound)
  .then(beggarSpeech.say({text: 'A single coin for the pathetic beggar?'}))
  .then(playChatNotificationSound)
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


// Bard 

const bardSentence = new TransformGroup('bard');

const bard = new Speaker('Bard', '#FF00FF');

const pos2137: Vector = [-250, 71, -39];

const bardSpeech = new Speech(bard, pos2137, bardSentence);

const bardScene = new Scene({
  NAMESPACED_PATH,
  PATH,
  sceneIndex: 2137,
  sceneName: 'kaktis-first-scene',
  autoStart: true,
});

const commandPart = 'execute as kakti at @s run playsound minecraft:block.note_block.banjo master @s ~ ~ ~'

bardScene.actionTree
  .then(new ContinueWhen('execute if entity @a[tag=w.player,x=-248,y=69,z=-39,dz=5,dx=-3]'))
  .then(playChatNotificationSound)
  .then('tellraw @a {"text": "*Your gaze falls on the bard who is just beginning to play*", "color": "#D3D3D3"}')
  //.then(new FreezePlayer())
  .then(new Wait(3))
  
  .then(`${commandPart} 100 .8`)
  .then(`${commandPart} 100 1`)
  .then(`${commandPart} 100 1.2`)

  .then(bardSpeech.say({text: 'The minstrel boy to the war is gone'}))
  .then(new Wait(2))

  .then(`${commandPart} 100 1.05`)
  .then(`${commandPart} 100 1.35`)
  .then(`${commandPart} 100 1.6`)
  
  .then(bardSpeech.say({text: 'In the ranks of death you`ll find him'}))
  .then(new Wait(2))

  .then(`${commandPart} 100 .8`)
  .then(`${commandPart} 100 1`)
  .then(`${commandPart} 100 1.2`)

  .then(bardSpeech.say({text: 'His father`s sword he hath girded on'}))
  .then(new Wait(2))

  .then(`${commandPart} 100 1.05`)
  .then(`${commandPart} 100 1.35`)
  .then(`${commandPart} 100 1.6`)

  .then(bardSpeech.say({text: 'And his wild harp slung behind him'}))
  .then(new Wait(.5))

  //.then(new UnfreezePlayer())
  .then(playChatNotificationSound)
  .then(new DisplayMenu({
    preText: '[{"text": "What do you want to do?"}]',
    options: [
      {
        content: 'Toss him a coin',
        then: new ActionTree(bardScene)
          .then(playChatNotificationSound)
          .then(playSpeakSound)
          .then(bardSpeech.say({text: 'Thank you my friend'}))
          .then('tellraw @a {"text": "*The bard thanks you and bows to you slightly*", "color": "#D3D3D3"}')
      },
      {
        content: 'Clap',
        then: new ActionTree(bardScene)
          .then(playChatNotificationSound)
          .then('tellraw @a {"text": "*The bard smiles and start`s playing another song*", "color": "#D3D3D3"}')
      },
      {
        content: 'Do nothing',
        then: new ActionTree(bardScene)
          .then(playChatNotificationSound)
          .then('tellraw @a {"text": "*The bard start`s playing another song*", "color": "#D3D3D3"}')
      }
    ],
    skipWhen: 'execute unless entity @a[tag=w.player,x=-248,y=69,z=-39,dz=5,dx=-3]'
  }))

  .then(new ContinueWhen('execute unless entity @a[tag=w.player,x=-248,y=69,z=-39,dz=5,dx=-3]'))
  .then(`kill @e[tag=${bardSentence.groupTag}]`)
  .then('function w:generated/kaktis-first-scene/0-0')

await bardScene.compile();


