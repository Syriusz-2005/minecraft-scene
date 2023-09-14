import { NAMESPACED_PATH, PATH, project } from "../PATH.js";
import ActionTree from "../lib/ActionTree.js";
import Scene from "../lib/Scene.js";
import DisplayMenu from "../lib/actions/DisplayMenu.js";
import Exit from "../lib/actions/Exit.js";
import Restart from "../lib/actions/Restart.js";
import RunScene from "../lib/actions/RunScene.js";
import Wait from "../lib/actions/Wait.js";
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
    gamemode spectator @s
    effect clear @s
    spectate 4b46e8fb-7bb9-4fc1-9014-17b8748f1bc1
    tellraw @a {"text": "\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n"}
    tellraw @a {"text": "The Soul destroyers map", "color": "aqua", "bold": true, "underlined": true}
    tellraw @a {"text": "              Demo 1\\n", "color": "#8f8f8f"}
    tellraw @a {"text": "*Contains around 20 minutes of basic gameplay*", "color": "#8f8f8f"}
    function animated_java:recruiter/remove/all
    team join w.noCollision @a[tag=w.player]
    tag @s add w.initialized
    function effect:cursed_forest/apply_ambient
  `)
  .then(new Wait(1))
  .then(`
    execute as @e[tag=aj.demo_title.root] run function animated_java:demo_title/animations/loop/play
  `)
  .then(new DisplayMenu({
    disablePadding: true,
    options: [
      {
        content: 'Continue',
        color: 'gold',
        then: new ActionTree(scene)
          .then(`
            tellraw @a {"text": "\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n"}
            tellraw @a {"text": "Please, set up your game as follows:", "bold": true}
            tellraw @a {"text": "\\nFOV: max 80\\nbrightness: default (50)\\nRender distance: 16 chunks\\nFOV effects: off (0%)\\nGraphics: Fabulous"}
            tellraw @a {"text": "\\nIgnoring this settings may result in some serious problems on the map!","underlined":true,"color":"red"}
          `)
          .then(new DisplayMenu({
            disablePadding: true,
            preText: `[{"text": "Click continue after adjusting the settings accordingly"}]`,
            options: [
              {
                content: 'Continue',
                color: 'gold',
                then: new ActionTree(scene)
                  .then(`
                    tellraw @a {"text": "\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n"}
                  `)
                  .then(new DisplayMenu({
                    preText: `[{"text":"Start the game when you are ready:"}]`,
                    disablePadding: true,
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
                            tellraw @a {"text": "\\n\\n\\n\\n\\n\\n\\n\\n"}
                            tellraw @a {"text": "External resources:\\n"}
                            function w:utils/show_resources
                            tellraw @a {"text": "\\n\\nDevelopers:\\n\\n _Syriusz_, kakti, Technicman, Catandon, mikib27, lukaszysz, Ciamciam \\n"}
                
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
              }
            ]
          }))
      }
    ]
  }))

await scene.compile();