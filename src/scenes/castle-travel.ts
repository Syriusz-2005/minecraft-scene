import { NAMESPACED_PATH, PATH } from "../PATH.js";
import Scene from "../lib/Scene.js";
import ContinueWhen from "../lib/actions/ContinueWhen.js";
import DisplaySentence from "../lib/actions/DisplaySentence.js";
import Wait from "../lib/actions/Wait.js";
import { ThePlayer } from "../speakers/ThePlayer.js";


const scene = new Scene({
  NAMESPACED_PATH,
  PATH,
  sceneIndex: 1000,
  sceneName: 'emperor-speech-1',
});


scene.actionTree
  .then('execute in minecraft:overworld run tp @a[tag=w.player] -194.70 79.00 -89.30 -1902.52 21.48')
  .then('clear @a[tag=w.player]')
  .then('gamemode adventure @a[tag=w.player]')
  .then('loot replace block -190 68 -89 container.0 loot w:notebook')
  .then('fill -188 71 -94 -189 72 -94 minecraft:barrier')
  .then('data modify entity da0157c2-7323-4ac6-a32d-06ccccf13945 Item set from block -190 68 -89 Items[{Slot:0b}]')
  .then(new Wait(3))
  .then(new DisplaySentence(ThePlayer, '{"text": "The last day in my preciouse home..."}'))
  .then(new Wait(3))
  .then(new DisplaySentence(ThePlayer, `{"text": "Let's move on before I think about the consequences of this new life situation"}`))
  .then(new Wait(4))
  .then(new DisplaySentence(ThePlayer, `{"text": "If only my dad was here to support me in such a moment. I would for sure use his help right now."}`))
  .then(new Wait(5))
  .then(new DisplaySentence(ThePlayer, `{"text": "Let's just take the notebook, the sword and go to the main square. Better be first or they'll put me in the worst unit possible. The ones that are used literally as canon fodders."}`))
  .then(new ContinueWhen(`execute if entity @a[tag=w.player,nbt={Inventory:[{id:"minecrfat:written_book"}]}]`))


await scene.compile();