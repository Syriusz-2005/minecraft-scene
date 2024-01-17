import { NAMESPACED_PATH, PATH, project } from "../mainProject.js";
import ModeledEntity from "../lib/utils/ModeledEntity.js";
import Pathfinder from "../lib/utils/Pathfinder.js";


export const miner = new ModeledEntity(project, {
  modelName: 'miner',
  skeletonEntityTag: 'w.miner',
  rotation: 'inherit',
  walkAnimation: 'walking',
});


await miner.init();


export const miner1Pathfinder = new Pathfinder({
  NAMESPACED_PATH,
  PATH,
  project,
  id: 'miner_1',
  options: {
    successRadius: 2.3,
  },
  extraCustomTag: 'w.miner',
});
export const miner2Pathfinder = new Pathfinder({
  NAMESPACED_PATH,
  PATH,
  project,
  id: 'miner_2',
  options: {
    successRadius: 2.3,
  },
  extraCustomTag: 'w.miner',
});
await miner1Pathfinder.init();
await miner2Pathfinder.init();