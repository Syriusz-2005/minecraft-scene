import Scene from "./lib/Scene.js"
import Speaker from "./lib/utils/Speaker.js";
import DisplaySentence from "./lib/actions/DisplaySentence.js";
import FreezePlayer from "./lib/actions/FreezePlayer.js";
import RunCommand from "./lib/actions/RunCommand.js";
import UnfreezePlayer from "./lib/actions/UnfreezePlayer.js";
import Wait from "./lib/actions/Wait.js";
import TransformGroup from "./lib/utils/TransformGroup.js";
import DisplayText from "./lib/actions/DisplayText.js";
import Repeat from "./lib/actions/Repeat.js";
import ActionTree from "./lib/ActionTree.js";
import UseCamera from "./lib/actions/UseCamera.js";
import ContinueWhen from "./lib/actions/ContinueWhen.js";
import EntityModel from "./lib/utils/EntityModel.js";
import SummonModel from "./lib/modelActions/Summon.js";
import Position from "./lib/utils/Position.js";
import MoveModel from "./lib/modelActions/Move.js";
import { KillModel } from "./lib/modelActions/Kill.js";


export {}

const PATH = '../data/w/functions/generated';
const NAMESPACED_PATH = 'w:generated'
console.time('Compiled in');

const testScene = new Scene({
  PATH,
  NAMESPACED_PATH,
  sceneName: 'test-scene',
  sceneIndex: 30,
});

const olaf = new Speaker('Olaf', 'green');

testScene.actionTree
  .then(new Wait(1))
  .then(new DisplaySentence(olaf, `[{"text": "Hello world!"}]`))
  .then(new FreezePlayer([-31.5, -31, -14.5]))
  .then(new RunCommand(`say the player is freezed!`))
  .then(new Wait(5))
  .then(new UnfreezePlayer())
  .then(new RunCommand(`say the player is unfreezed!`))
  

  await testScene.compile();


const dialogScene = new Scene({
  PATH,
  NAMESPACED_PATH,
  sceneName: 'dialog',
  sceneIndex: 100,
});

const group = new TransformGroup('w.dialog.test');
const pos = [1, -30, -3] as const;

dialogScene.actionTree
  .then(new DisplayText(pos, olaf, '[{"text": "Just a test message"}]', group))
  .then(new Wait(1))
  .then(new DisplayText(pos, olaf, '[{"text": "Hey, buddy!"}]', group))
  .then(new Wait(1))
  .then(new DisplayText(pos, olaf, '[{"text": "Whats up?"}]', group))
  .then(new Wait(1))
  .then(new DisplayText(pos, olaf, '[{"text": "Aren\'t those subtitles cool?"}]', group))
  .then(new Wait(1))
  .then(new Repeat(`
    execute as @e[tag=${group.groupTag}] at @s run tp @s ~ ~.03 ~
  `, 7))
  .then(new RunCommand(`
    kill @e[tag=${group.groupTag}]
  `))

  await dialogScene.compile();


const concurrentScene = new Scene({
  NAMESPACED_PATH,
  PATH,
  sceneIndex: 200,
  sceneName: 'concurrent-flows',
});

concurrentScene.actionTree
  .concurrently({
      awaitingMethod: 'all-finished',
    }, [
    new ActionTree(concurrentScene)
      .then(new Wait(2))
      .then(new RunCommand('say 3')),
    new RunCommand('say 1')
  ])
  .then(new RunCommand('say 2'))

await concurrentScene.compile();



const cameraScene = new Scene({
  NAMESPACED_PATH,
  PATH,
  sceneIndex: 300,
  sceneName: 'camera-move',
});


cameraScene.actionTree
  .then(new UseCamera({
    anchorPoints: [
      {
        position: [70, -24, 40],
        rotation: [122, 45],
        durationTo: 1,
      },
      {
        position: [16, -28, 7],
        rotation: [122, 15.7],
        durationTo: 4,
      },
      {
        position: [10.8, -28, -13.5],
        rotation: [49.3, 15.7],
        durationTo: 2,
      },
      {
        position: [-11.3, -28, -14.5],
        rotation: [-48.3, 12],
        durationTo: 2.2,
      }
    ],
  }))
  .then(new RunCommand(`
    say the end of the camera
  `))

await cameraScene.compile();



const conditions = new Scene({
  NAMESPACED_PATH,
  PATH,
  sceneIndex: 400,
  sceneName: 'conditions',
})

conditions.actionTree
  .then(new ContinueWhen(`execute if entity @e[type=villager]`, `
    say no villager
  `))
  .then(new RunCommand('say Villager spawned, we can continue!'))

await conditions.compile();

console.timeEnd('Compiled in');


const model = new Scene({
  NAMESPACED_PATH,
  PATH,
  sceneIndex: 500,
  sceneName: 'model',
});

const guardian = new EntityModel('guardian_poc', {});

model.actionTree
  .then(new SummonModel(guardian, new Position([3, -31, 8], [0, 0])))
  .then(new MoveModel(guardian, [6.4, -31, 15], 4))
  .then(new RunCommand('say the model stopped moving'))
  .then(new KillModel(guardian))


await model.compile();