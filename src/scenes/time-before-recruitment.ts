import { NAMESPACED_PATH, PATH, project } from "../PATH.js";
import Scene from "../lib/Scene.js";
import ContinueWhen from "../lib/actions/ContinueWhen.js";
import UsePath from "../lib/actions/UsePath.js";


export const TimeBeforeRecruitmentScene = new Scene({
  NAMESPACED_PATH,
  PATH,
  project,
  sceneIndex: 9012,
  sceneName: 'time-before-recruitment',
});

TimeBeforeRecruitmentScene.actionTree
  .concurrently({
    awaitingMethod: 'any-finished',
  }, [
    new UsePath({
      pos: [-298, 70, -55],
      radius: 3,
    }),
    new UsePath({
      pos: [-317, 64, -78],
      radius: 3,
    }),
  ])
  .then(new UsePath({
    pos: [-212, 89, 33],
    radius: 2,
  }))
  .then(`say now there will be some npc's on the square`)

await TimeBeforeRecruitmentScene.compile();