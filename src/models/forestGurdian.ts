import { project } from "../PATH.js";
import ModeledEntity from "../lib/utils/ModeledEntity.js";


const forestGuardian = new ModeledEntity(project, {
  modelName: 'forest_guardian',
  skeletonEntityTag: 'w.forestGurdian.skeleton',
  attackAnimation: 'attackr',
});

await forestGuardian.init();