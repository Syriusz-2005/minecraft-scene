import { NAMESPACED_PATH, PATH, project } from "../PATH.js";
import ActionTree from "../lib/ActionTree.js";
import Scene from "../lib/Scene.js";
import ContinueWhen from "../lib/actions/ContinueWhen.js";
import FreezePlayer from "../lib/actions/FreezePlayer.js";
import Restart from "../lib/actions/Restart.js";
import Switch from "../lib/actions/Switch.js";
import UnfreezePlayer from "../lib/actions/UnfreezePlayer.js";
import Wait from "../lib/actions/Wait.js";
import { isPlayerRecruited } from "../states/isPlayerRecruited.js";


const scene = new Scene({
  NAMESPACED_PATH,
  PATH,
  project,
  sceneIndex: 496,
  sceneName: 'city-camp-fast-travel',
  autoStart: true,
});

scene.actionTree
  .then(new Switch({
    branches: [
      {
        case: isPlayerRecruited.Matches(0),
        then: new ActionTree(scene)
          .then(new Restart())
      },
      {
        case: isPlayerRecruited.Matches(1),
        then: new ActionTree(scene)
          .then(`
            
          `)
          .then(new ContinueWhen(`execute positioned -144 65 -203 if entity @a[distance=..6]`, `
            particle minecraft:portal -144 65 -203 3 2 3 0 10
          `))
          .then(`
            say teleporting 
          `)
          .then(new Wait(1))
          .then(new FreezePlayer())
          .then(`say the view fades away, and the player sees the picture of a camp`)
          .then(new Wait(1))
          .then(new UnfreezePlayer())
          .then(`
            execute in minecraft:overworld run tp @a[tag=w.player] -227.16 72.00 -296.40 468.10 2.88
          `)
          .then(new Wait(1))
          .then(`
            say the view fades back in
          `)
          .then(new Restart())
      }
    ]
  }))
  .then(new Restart())

await scene.compile();