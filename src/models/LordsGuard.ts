import { NAMESPACED_PATH, PATH, project } from "../mainProject.js";
import ModeledEntity from "../lib/utils/ModeledEntity.js";
import Pathfinder from "../lib/utils/Pathfinder.js";


export const LordsGuard = new ModeledEntity(project, {
  modelName: 'lords_guards',
  skeletonEntityTag: 'w.lordGuard.skeleton',
  rotation: 'inherit',
  walkAnimation: 'walking',
});

await LordsGuard.init();


export const guard1Path = new Pathfinder({
  id: 'lord_guard_1',
  NAMESPACED_PATH,
  project,
  PATH,
  options: {
    speed: 0.52,
    successRadius: 3.5,
  },
  extraCustomTag: 'w.lordGuard.skeleton',
});

export const guard2Path = new Pathfinder({
  id: 'guard_2',
  NAMESPACED_PATH,
  project,
  PATH,
  options: {
    speed: 0.53,
    successRadius: 3.5,
  },
  extraCustomTag: 'w.lordGuard.skeleton',
});

export const guard3Path = new Pathfinder({
  id: 'guard_3',
  NAMESPACED_PATH,
  project,
  PATH,
  options: {
    speed: 0.53,
    successRadius: 3.5,
  },
  extraCustomTag: 'w.lordGuard.skeleton',
});