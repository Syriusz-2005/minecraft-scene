import { NAMESPACED_PATH, PATH, project } from "../mainProject.js";
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
  sceneIndex: 519,
  sceneName: 'city-crossroads-fast-travel',
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
          .then(new ContinueWhen(`execute positioned -478 63 -5 if entity @a[distance=..7]`, `
            particle minecraft:portal -478 63 -5 4 2 4 0 10
          `))
          .then(`
            say teleporting 
          `)
          .then(new Wait(1))
          .then(new FreezePlayer())
          .then(`say the view fades away, and the player sees the picture of a crossrods`)
          .then(new Wait(1))
          .then(new UnfreezePlayer())
          .then(`
            execute in minecraft:overworld run tp @a[tag=w.player] -1067.97 93.00 -149.56 456.90 2.12
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
