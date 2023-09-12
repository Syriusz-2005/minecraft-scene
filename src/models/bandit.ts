import { project } from "../PATH.js";
import ModeledEntity from "../lib/utils/ModeledEntity.js";


const bandit = new ModeledEntity(project, {
  modelName: 'bandit',
  skeletonEntityTag: 'w.burglar',
  attackAnimation: 'attack',
  animationVariants: [
    {
      when: `execute if score @s mob-abilities.dash.dashing-ticks matches 1..`,
      applyVariant: 'charge',
    }
  ]
});

await bandit.init();