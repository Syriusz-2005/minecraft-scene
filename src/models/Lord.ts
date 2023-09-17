import { project } from "../PATH.js";
import ModeledEntity from "../lib/utils/ModeledEntity.js";


export const Lord = new ModeledEntity(project, {
  modelName: 'the_lord',
  skeletonEntityTag: 'w.lord.skeleton',
  mainVariant: 'technicman',
  rotation: 'inherit',
});

await Lord.init();


