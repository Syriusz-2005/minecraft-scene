import { NAMESPACED_PATH, PATH } from "../PATH.js";
import Scene from "../lib/Scene.js";
import ContinueWhen from "../lib/actions/ContinueWhen.js";
import DisplaySentence from "../lib/actions/DisplaySentence.js";
import FreezePlayer from "../lib/actions/FreezePlayer.js";
import UsePath from "../lib/actions/UsePath.js";
import Wait from "../lib/actions/Wait.js";
import { fishSellerSpeech } from "../speakers/FishSeller.js";
import { ThePlayer } from "../speakers/ThePlayer.js";


const scene = new Scene({
  NAMESPACED_PATH,
  PATH,
  sceneIndex: 1300,
  sceneName: 'castle-travel',
});


scene.actionTree
  .then('execute in minecraft:overworld run tp @a[tag=w.player] -194.70 79.00 -89.30 -1902.52 21.48')
  .then(`summon item_frame -190 72 -89 {Invisible:true,Facing:1b}`)
  .then('clear @a[tag=w.player]')
  .then('gamemode adventure @a[tag=w.player]')
  .then('loot replace block -190 68 -89 container.0 loot w:notebook')
  .then('fill -188 71 -94 -189 72 -94 minecraft:barrier')
  .then('execute positioned -189.55 71.87 -89.00 run data modify entity @e[type=item_frame,sort=nearest,limit=1,distance=..2] Item set from block -190 68 -89 Items[{Slot:0b}]')
  .then(new Wait(3))
  .then(new DisplaySentence(ThePlayer, '{"text": "The last day in my precious home..."}'))
  .then(new Wait(3))
  .then(new DisplaySentence(ThePlayer, `{"text": "Let's move on before I think about the consequences of this new life situation"}`))
  .then(new Wait(4))
  .then(new DisplaySentence(ThePlayer, `{"text": "If only my dad was here with me. I would really use his help right now."}`))
  .then(new Wait(5))
  .then(new DisplaySentence(ThePlayer, `{"text": "Let's just take the notebook, the sword and go to the main square. Better be first or they'll put me in the worst unit possible. The ones that are used literally as canon fodders."}`))
  .then(new ContinueWhen(`execute if entity @a[tag=w.player,nbt={Inventory:[{id:"minecraft:written_book"}]}]`))
  .then('fill -188 71 -94 -189 72 -94 air')
  .then(new DisplaySentence(ThePlayer, `{"text": "Let's go!"}`))
  .then(new UsePath({
    pos: [-214.09, 70.00, -90.18],
    radius: 2,
  }))
  .then(new FreezePlayer())
  .then(new Wait(1))
  .then(fishSellerSpeech.say({text: `Hey, where are ye going?`}))
  .then(new Wait(3))
  .then(new DisplaySentence(ThePlayer, `{"text": "Haven't you listened to the emperor's speech yesterday? I'm 18 so I'm going to war! I'll be a recruit."}`))
  .then(new Wait(5))
  .then(fishSellerSpeech.say({text: `Ah, the endless war... That's such good news, maybe finally your training will pay off. I've heard that you know some neat tricks with a sword. Speaking of which, is that your father's sword?`}))
  .then(new Wait(6))
  .then(new DisplaySentence(ThePlayer, `{"text": "Yes, my father gave it along with his final notes."}`))
  .then(new Wait(4))
  .then(fishSellerSpeech.say({text: `He died for our kingdom! It's an honor and our duty! The emperor and his army are protecting us from evil!`}))
  .then(new Wait(5))
  .then(new DisplaySentence(ThePlayer, `{"text": "I'm not sure. Look around. The war has brought us poverty and loss."}`))
  .then(new Wait(4))
  .then(fishSellerSpeech.say({text: `No! The war is necessary to keep us safe! Regardless, I wish you luck and glory on the battlefield.`}))
  .then(new Wait(4))
  .then(new DisplaySentence(ThePlayer, `{"text": "Thank you."}`))

await scene.compile();