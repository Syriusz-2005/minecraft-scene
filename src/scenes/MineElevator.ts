import { NAMESPACED_PATH, PATH, project } from "../PATH.js";
import Scene from "../lib/Scene.js";
import ContinueWhen from "../lib/actions/ContinueWhen.js";
import Restart from "../lib/actions/Restart.js";
import Wait from "../lib/actions/Wait.js";



const scene = new Scene({
  NAMESPACED_PATH,
  PATH,
  project,
  sceneIndex: -6120,
  sceneName: 'mine-elevator',
  autoStart: true,
});

scene.actionTree
  .then(new ContinueWhen(`execute positioned -322.63 64.00 -104.46 if entity @a[tag=w.player,distance=..1,tag=!w.player.justElevated]`))
  .then(`
    effect give @a minecraft:darkness 3
    effect give @a minecraft:blindness 3
    execute as @a at @s run playsound minecraft:entity.minecart.riding master @s ~ ~ ~
  `)
  .then(new Wait(2))
  .then(`
    execute at @a[tag=w.player] run teleport @p ~ ~-54 ~
  `)
  .then(new Restart())

await scene.compile();