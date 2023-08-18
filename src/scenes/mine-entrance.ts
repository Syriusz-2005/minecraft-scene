import { NAMESPACED_PATH, PATH } from "../PATH.js";
import ActionTree from "../lib/ActionTree.js";
import Scene from "../lib/Scene.js";
import ContinueWhen from "../lib/actions/ContinueWhen.js";
import Restart from "../lib/actions/Restart.js";
import Switch from "../lib/actions/Switch.js";
import Wait from "../lib/actions/Wait.js";
import Speaker from "../lib/utils/Speaker.js";
import Speech from "../lib/utils/Speech.js";
import TransformGroup from "../lib/utils/TransformGroup.js";
import { Vector } from "../lib/utils/Vector.js";
import { isPlayerRecruited } from "../states/isPlayerRecruited.js";

const mineGuardSentence = new TransformGroup('mineGuard');

const mineGuard = new Speaker('mineGuard', '#800080');

const pos: Vector = [-320, 65, -95];
  
const mineGuardSpeech = new Speech(mineGuard, pos, mineGuardSentence);

const playSpeakSound = 'execute as @a at @s run playsound minecraft:entity.villager.celebrate master @s ~ ~ ~ 1 1 1';
const playChatNotificationSound = 'execute as @a at @s run playsound minecraft:ui.toast.in master @s ~ ~ ~ 1 1 1';
const positionSelector = '@a[tag=w.player,x=-325,y=64,z=-97,dz=15,dx=13,dy=2]';



const scene = new Scene({
  NAMESPACED_PATH,
  PATH,
  sceneIndex: 1350,
  sceneName: 'mine-entrance',
  autoStart: true,
});


scene.actionTree
  .then(new ContinueWhen(`execute if entity ${positionSelector}`))
  .then(new Switch({
      branches: [ 
        {
          case: isPlayerRecruited.Matches(0),
          then: new ActionTree(scene)
            .then(mineGuardSpeech.say({text: 'Stop right there!'}))
            .then(playSpeakSound)
            .then(new Wait(3))
            .then(mineGuardSpeech.say({text: 'Only soldiers and miners are allowed into this mine'}))
            .then(playSpeakSound)

            .then(new ContinueWhen(`execute unless entity ${positionSelector}`))
            .then(new Wait(2))
            .then(`kill @e[tag=${mineGuardSentence.groupTag}]`)
            .then(new Restart())
        },
      ]
    }))
    
  .then(new Restart())

await scene.compile();