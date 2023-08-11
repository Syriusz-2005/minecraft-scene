import { NAMESPACED_PATH, PATH } from "../PATH.js";
import ActionTree from "../lib/ActionTree.js";
import Scene from "../lib/Scene.js";
import FreezePlayer from "../lib/actions/FreezePlayer.js";
import UnfreezePlayer from "../lib/actions/UnfreezePlayer.js";
import UseCamera from "../lib/actions/UseCamera.js";
import Wait from "../lib/actions/Wait.js";



const scene = new Scene({
  NAMESPACED_PATH,
  PATH,
  sceneIndex: 1000,
  sceneName: 'emperor-speech-1',
});

//TODO: scene initialization

scene.actionTree
  .then('gamemode spectator @a[tag=w.player]')
  .then('execute in overworld run tp @a[tag=w.player] -511 64 13 -116 17.8')
  .then(new FreezePlayer())
  .then('effect give @a[tag=w.player] minecraft:blindness 5 1 true')
  .then(new Wait(.6))
  .then('effect give @a[tag=w.player] minecraft:darkness 5 1 true')
  .then(new Wait(3))
  .then(new UnfreezePlayer())
  .concurrently({awaitingMethod: 'all-finished'}, [
    new ActionTree(scene),


    new ActionTree(scene)
      .then(new UseCamera({
        anchorPoints: [
          {
            position: [-511, 64, 13],
            rotation: [-116, 17.8],
            durationTo: 1,
          },
          {
            position: [-459, 64, -8],
            rotation: [-100, 14.7],
            durationTo: 4,
          },
          {
            position: [-319, 103, -101],
            rotation: [-62, 12.3],
            durationTo: 7,
          },
          {
            durationTo: 6,
            position: [-132, 138, -158],
            rotation: [22.7, 20.4]
          }
        ]
      }))
      .then(new UseCamera({
        anchorPoints: [
          {
            position: [-41, 200, 81],
            durationTo: 1,
            rotation: [125.7, 41.7],
          },
          {
            position: [-170, 124, 14],
            rotation: [95.5, 35.8],
            durationTo: 8,
          },
          {
            position: [-219, 99, 9],
            rotation: [135.6, 69.6],
            durationTo: 3.5,
          }
        ]
      }))
  ])

//TODO: scene cleanup

await scene.compile();