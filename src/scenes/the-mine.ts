import { NAMESPACED_PATH, PATH, project } from "../PATH.js";
import Scene from "../lib/Scene.js";
import ContinueWhen from "../lib/actions/ContinueWhen.js";
import Wait from "../lib/actions/Wait.js";
import { Miner2, minerSpeech } from "../speakers/MinerSpeech.js";
import { ThePlayer } from "../speakers/ThePlayer.js";



const scene = new Scene({
  NAMESPACED_PATH,
  PATH,
  project,
  sceneIndex: 5910,
  sceneName: 'the-mine',
});


scene.actionTree
  .then(`
    item replace block -329 10 -112 container.13 with minecraft:flint_and_steel
    clone -286 21 -94 -281 25 -101 -286 7 -101
  `)
  .then(minerSpeech.sayAs({text: `I'm here to guard you, guys. You can safely destroy the wall.`}, ThePlayer))
  .then(new Wait(3))
  .then(minerSpeech.say({text: `Do it yourself then. We've heard disturbing noises from behind it.`}))
  .then(new Wait(3))
  .then(minerSpeech.sayAs({text: `The barrel with gunpowder is already in place. The flint and steel can be found behind the shaft.`}, Miner2))
  .then(new Wait(4))
  .then(new ContinueWhen(`execute positioned -289.04 8.00 -98.62 unless entity @a[tag=w.player,distance=..6]`))
  .then(minerSpeech.hide())
  .then(`
    say *The miners are changing their positions to some safer ones*
    say *You can safely fuse the tnt*
  `)
  .then(new ContinueWhen(`execute positioned -285.30 7.80 -95.25 if entity @e[type=tnt,distance=..40,nbt={Fuse:2s}]`))
  .then(`
    execute positioned -285.30 7.80 -95.25 run kill @e[type=tnt,distance=..40]
    execute positioned -285.30 7.80 -95.25 run function delta:api/explosion_emitter_particle
    clone -286 15 -94 -281 19 -101 -286 7 -101
    particle minecraft:cloud -282.78 9.00 -97.02 1 1 1 0.2 100
  `)
  
await scene.compile();