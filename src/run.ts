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


export {}

const PATH = '../data/w/functions/generated';
const NAMESPACED_PATH = 'w:generated'

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
  

testScene.compile();


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

dialogScene.compile();


const concurrentScene = new Scene({
  NAMESPACED_PATH,
  PATH,
  sceneIndex: 200,
  sceneName: 'concurrent-flows',
});

concurrentScene.actionTree
  .concurrently({
    awaitingMethod: 'instant-skip',
    }, [
    new ActionTree(concurrentScene)
      .then(new Wait(2))
      .then(new RunCommand('say 3')),
    new RunCommand('say 1')
  ])
  .then(new RunCommand('say 2'))

concurrentScene.compile();