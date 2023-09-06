import { project } from "../PATH.js";
import ModeledEntity from "../lib/utils/ModeledEntity.js";


const bandit = new ModeledEntity(project, {
  modelName: 'bandit',
  skeletonEntityTag: 'w.burglar',
  attackAnimation: 'attack',
});

await bandit.init();