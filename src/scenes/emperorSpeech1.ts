import { NAMESPACED_PATH, PATH, project } from "../PATH.js";
import ActionTree from "../lib/ActionTree.js";
import Scene from "../lib/Scene.js";
import FreezePlayer from "../lib/actions/FreezePlayer.js";
import UnfreezePlayer from "../lib/actions/UnfreezePlayer.js";
import UseCamera from "../lib/actions/UseCamera.js";
import Wait from "../lib/actions/Wait.js";

// commands for switching scenes
const cleanMarket = 'fill -287 68 -7 -273 68 -24 air'
const pasteScene = 'clone -278 -4 -8 -292 7 -25 -287 67 -24'
const pasteMarket = 'clone -294 -4 -8 -308 7 -25 -287 67 -24'

const scene = new Scene({
  NAMESPACED_PATH,
  PATH,
  sceneIndex: 1000,
  sceneName: 'emperor-speech-1',
  project,
});

//TODO: scene initialization

scene.actionTree
  .then('gamemode spectator @a[tag=w.player]')
  .then('execute in overworld run tp @a[tag=w.player] -511 64 13 -116 17.8')
  // .then('fill -287 68 -7 -273 68 -24 air')
  // .then('clone -278 -4 -8 -292 7 -25 -287 67 -24')
  .then(`
    summon minecraft:villager ~ ~ ~ {NoAI:true,Silent: true, Tags: ["w.listener"]}
    summon minecraft:villager -275.6 69 -14.5 {NoAI:true,Rotation:[87f, -7f],Silent:true, Tags: ["w.listener"]}
    summon minecraft:villager -275.7 69 -21.9 {NoAI:true,Rotation:[50.4f, -5.8f], Tags: ["w.listener"]}
    summon minecraft:villager -275 69 -15.46 {NoAI:true,Rotation:[92f, -6.8f], Tags: ["w.listener"]}
    summon minecraft:villager -273.3 69 -16.8 {NoAI:true,Rotation:[110f, -5.8f], Tags: ["w.listener"]}
    summon minecraft:villager -274.3 69 -16.4 {NoAI:true,Rotation:[110f, -5.8f], Tags: ["w.listener"]}
    summon minecraft:villager -274 69 -18.5 {NoAI:true,Rotation:[90f, -5.8f], Tags: ["w.listener"]}
    summon minecraft:villager -276 69 -8.4 {NoAI:true,Rotation:[131f, -5.8f], Tags: ["w.listener"]}
    summon minecraft:villager -277 69 -11.3 {NoAI:true,Rotation:[110f, -5.8f], Tags: ["w.listener"]}
    execute positioned -280.8 70.5 -11.97 rotated -86 0 run function animated_java:guardian_poc/summon
    execute positioned -281.349 70.5 -21.108 rotated -86 0 run function animated_java:guardian_poc/summon
    `)
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
            position: [-271, 80.8, -13],
            rotation: [106, 52],
            durationTo: 6,
          }
        ]
      }))
      .then(new UseCamera({
        anchorPoints: [
          {
            position: [-277.7, 68, -12],
            rotation: [133, -36.9],
            durationTo: 1,
          },
          {
            position: [-275, 68, -13],
            rotation: [120, -37],
            durationTo: 10,
          }
        ]
      }))
  ])
  .then(`tellraw @a "*The speech*"`)
  .then(new Wait(10))
  .then(`
    kill @e[tag=w.listener]
    execute positioned -281.349 70.5 -21 as @e[type=#animated_java:root,tag=aj.guardian_poc.root,distance=..15] run function animated_java:guardian_poc/remove/this

    #fill -287 68 -7 -273 68 -24 air
    #clone -294 -4 -8 -308 7 -25 -287 67 -24
  `)
//TODO: scene cleanup

await scene.compile();