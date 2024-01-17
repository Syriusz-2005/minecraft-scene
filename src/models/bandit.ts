import { project } from "../mainProject.js";
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

const banditWithKnife = new ModeledEntity(project, {
  modelName: 'bandit_with_a_knife',
  skeletonEntityTag: 'w.burglar.with_knife',
  attackAnimation: 'attack',
  animationVariants: [
    {
      when: `execute if score @s mob-abilities.dash.dashing-ticks matches 1..`,
      applyVariant: 'charge',
    }
  ],
});

await banditWithKnife.init();