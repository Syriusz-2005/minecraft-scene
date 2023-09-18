import { project } from "../PATH.js";
import ModeledEntity from "../lib/utils/ModeledEntity.js";


export const LordsGuard = new ModeledEntity(project, {
  modelName: 'lords_guards',
  skeletonEntityTag: 'w.lordGuard.skeleton',
  rotation: 'inherit',
  walkAnimation: 'walking',
});

await LordsGuard.init();


