import { project } from "../PATH.js";
import ModeledEntity from "../lib/utils/ModeledEntity.js";


const largeCrab = new ModeledEntity(project, {
  modelName: 'large_crab',
  skeletonEntityTag: 'w.largeCrab.skeleton',
});

await largeCrab.init();