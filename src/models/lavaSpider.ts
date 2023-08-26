import { project } from "../PATH.js";
import ModeledEntity from "../lib/utils/ModeledEntity.js";



const lavaSpider = new ModeledEntity(project, {
  modelName: 'lava_spider',
  skeletonEntityTag: 'w.lavaSpider.skeleton',
});


await lavaSpider.init();