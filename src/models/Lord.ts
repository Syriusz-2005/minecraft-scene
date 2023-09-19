import { NAMESPACED_PATH, PATH, project } from "../PATH.js";
import ModeledEntity from "../lib/utils/ModeledEntity.js";
import Pathfinder from "../lib/utils/Pathfinder.js";


export const Lord = new ModeledEntity(project, {
  modelName: 'the_lord',
  skeletonEntityTag: 'w.lord.skeleton',
  mainVariant: 'technicman',
  rotation: 'inherit',
});

await Lord.init();


export const horsePath = new Pathfinder({
  id: 'the-lord-horse',
  NAMESPACED_PATH,
  project,
  PATH,
  options: {
    speed: 0.37,
    successRadius: 3.5,
  }
});