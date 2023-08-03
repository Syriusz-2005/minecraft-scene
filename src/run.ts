import Scene from "./lib/Scene.js"
import Wait from "./lib/actions/Wait.js";


export {}

const PATH = '../data/w/functions/generated';
const NAMESPACED_PATH = 'w:generated'

const testScene = new Scene({
  PATH,
  NAMESPACED_PATH,
  sceneName: 'test-scene',
  sceneIndex: 30,
});

testScene.actionTree
  .then(new Wait(5))

testScene.compile();