import { project } from "../PATH.js";
import ModeledEntity from "../lib/utils/ModeledEntity.js";


const captain = new ModeledEntity(project, {
  modelName: 'captain',
  skeletonEntityTag: 'w.pathfinder.captain-in-the-mine',
  rotation: 'inherit',
});

await captain.init();