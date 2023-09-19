import { NAMESPACED_PATH, PATH, project } from "../PATH.js";
import Scene from "../lib/Scene.js";
import FreezePlayer from "../lib/actions/FreezePlayer.js";
import Wait from "../lib/actions/Wait.js";



const scene = new Scene({
  NAMESPACED_PATH,
  PATH,
  project,
  sceneIndex: 2678,
  sceneName: 'evaporation_pt3',
});

scene.actionTree
  .then(`
    kill @e[tag=mechanics.witness]
    kill @e[tag=mechanics.hiding_spot]
    kill @e[tag=mechanics.final_hiding_spot]
  `)
  .then(new FreezePlayer())
  .then(`
    title @a times 10t 5s 10t 
    title @a title {"text": "The actions starts in", "color": "gold"}
    title @a subtitle {"text": "5"}
  `)
  .then(new Wait(1))
  .then(`
    title @a subtitle {"text": "4"}
  `)
  .then(new Wait(1))
  .then(`
    title @a subtitle {"text": "3"}
  `)
  .then(new Wait(1))
  .then(`
    title @a subtitle {"text": "2"}
  `)
  .then(new Wait(1))
  .then(`
    title @a subtitle {"text": "1"}
  `)
  .then(new Wait(1))
  .then(`
    worldborder center -1145 -191
    worldborder set 30
  `)


await scene.compile();