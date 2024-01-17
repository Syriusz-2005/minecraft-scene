import { NAMESPACED_PATH, PATH, project } from "../mainProject.js";
import Scene from "../lib/Scene.js";


const scene = new Scene({
  NAMESPACED_PATH,
  PATH,
  project,
  sceneIndex: 3468,
  sceneName: 'evaporation_end',
});

scene.actionTree
  .log()
  .then(`
    say [soldier]: Great job! We've captured him.
    say [lord]: What are you gonna do with me, you thiefs?
    say [soldier]: Oh, we're not thiefs. We're soldiers. You've been captured in the name of the emperor!
    say [lord]: I should've been more carefull with what I say... I will pay you tripple the amount they payed you to capture me.
    say [soldier]: Now you're in our possesion. You sure have something hidden in those big, full pockets... We don't need your offers to take what's ours.
    say [lord]: In the name of the rebellion, please let me go. If you capture me, they'll take revenge on you, I swear!
    say [soldier]: You mean the terrorists? They don't care about you, they only want to lose. You know that because you're one of them!
    say [lord]: They're closer than you think. They have more impact no this kingdom that you could ever imagine!
    say [soldier2]: What are we waiting for? Let's just take him to the camp already!

  `)
