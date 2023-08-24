import { NAMESPACED_PATH, PATH, project } from "../PATH.js";
import Scene from "../lib/Scene.js";
import ContinueWhen from "../lib/actions/ContinueWhen.js";
import FreezePlayer from "../lib/actions/FreezePlayer.js";
import Restart from "../lib/actions/Restart.js";
import Switch from "../lib/actions/Switch.js";
import UnfreezePlayer from "../lib/actions/UnfreezePlayer.js";
import Wait from "../lib/actions/Wait.js";



const scene = new Scene({
  NAMESPACED_PATH,
  PATH,
  project,
  sceneIndex: 486,
  sceneName: 'camp-city-fast-travel',
  autoStart: true,
});

scene.actionTree
  .then(`
    
  `)
  .then(new ContinueWhen(`execute positioned -220.15 72.00 -297.44 if entity @a[distance=..6]`, `
    particle minecraft:portal -220.15 72.00 -297.44 3 2 3 0 10
  `))
  .then(`
    say teleporting 
  `)
  .then(new Wait(1))
  .then(new FreezePlayer())
  .then(`say the view fades away, and the player sees the picture of a city`)
  .then(new Wait(1))
  .then(new UnfreezePlayer())
  .then(`
    execute in minecraft:overworld run tp @a[tag=w.player] -154.95 64.00 -195.83 408.75 4.97
  `)
  .then(new Wait(1))
  .then(`
    say the view fades back in
  `)
  .then(new Restart())

await scene.compile();