import { NAMESPACED_PATH, PATH, project } from "../PATH.js";
import ActionTree from "../lib/ActionTree.js";
import Scene from "../lib/Scene.js";
import DisplayMenu from "../lib/actions/DisplayMenu.js";
import Exit from "../lib/actions/Exit.js";
import Restart from "../lib/actions/Restart.js";
import RunScene from "../lib/actions/RunScene.js";
import { startCamera } from "../startCamera.js";


const scene = new Scene({
  NAMESPACED_PATH,
  PATH,
  project,
  sceneIndex: 1309,
  sceneName: 'main-menu',
});

scene.actionTree
  .then(`
    tag @s add w.player
    gamemode spectator @s
    effect clear @s
    spectate 4b46e8fb-7bb9-4fc1-9014-17b8748f1bc1
    tellraw @a {"text": "\\n\\n\\n\\n\\n\\n\\n\\nThe Soul destroyers map\\nDemo 1\\n\\nMake sure you have the options set up correctly:\\n\\nFOV: max 80\\nbrightness: normal (50)\\nRender distance: 16 chunks\\nFOV effects: off (0%)\\nGraphics: Fabulous"}
    function animated_java:recruiter/remove/all
  `)
  .then(new DisplayMenu({
    preText: `[{"text":"Start the game when you are ready:"}]`,
    options: [
      {
        content: 'Play',
        color: 'gold',
        then: new ActionTree(scene)
          .then(new RunScene(startCamera))
          .then(new Exit())
      },
      {
        content: 'Credits',
        then: new ActionTree(scene)
          .then(`
            tellraw @a {"text": "\\n\\n\\n\\n\\n\\n\\n\\nDevelopers:\\n\\n _Syriusz_, kakti, Technicman, Catandon, mikib27, lukaszysz, Ciamciam, Watsug \\n"}

          `)
          .then(new DisplayMenu({
            options: [
              {
                content: 'Go back',
                then: new Restart(),
              }
            ]
          }))
      }
    ]
  }))

await scene.compile();