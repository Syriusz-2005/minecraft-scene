import { project } from "../mainProject.js";
import ModeledEntity from "../lib/utils/ModeledEntity.js";


const smallCrab = new ModeledEntity(project, {
  modelName: 'crab',
  skeletonEntityTag: 'w.smallCrab.skeleton',
});

await smallCrab.init();