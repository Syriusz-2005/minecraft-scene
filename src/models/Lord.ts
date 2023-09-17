import { project } from "../PATH.js";
import ModeledEntity from "../lib/utils/ModeledEntity.js";


export const Lord = new ModeledEntity(project, {
  modelName: 'beggar_1',
  skeletonEntityTag: 'w.lord.skeleton',
  mainVariant: 'technicman',
  rotation: 'inherit',
});

await Lord.init();


