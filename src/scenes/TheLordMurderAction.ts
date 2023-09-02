import UsePath from "../lib/actions/UsePath.js";
import Scene from "../lib/Scene.js";
import { NAMESPACED_PATH, PATH, project } from "../PATH.js";


export const TheLordMurderActionScene = new Scene({
  NAMESPACED_PATH,
  PATH,
  project,
  sceneIndex: 6120,
  sceneName: 'the-lord-murder',
});

TheLordMurderActionScene.actionTree
  .then(`
    ride @a[tag=w.player,limit=1] mount 2e3b04c6-16c3-4678-adca-6b793b1bb06f
  `)
  .then(`
    say [someone]: Hey, you!
    say me?
    say [someone]: The captain wants to see you, go to his headquarter
    say Ok
  `)
  .then(new UsePath({
    pos: [-230, 87, -365],
    radius: 2,
  }))
  .then(`
    say *In the headquarters*
    say [captain]: Let's get straight to the topic. We've got a new task from the emperor himself. I've heard that you've shown some talent in our training, so now we'll provide you with a chance to prove that you are equally skilled during real action. It's not your decision as more of an order. If I were you, I'd fulfill it with pleasure as, the soldiers get an extra share for every action you participate in. We're sponsored by the emperor and as long as he pays fair, we do what he orders. The privilages of an elite unit are really amazing!
    say There's not much I can add If it's an order...
    say [captain]: Exactly! Now I will introduce you to the action and your role in it. It'll be a minor task as we must first make sure you won't blow the whole operation up.
    say [captain]: The lord Farquad has recently grown in popularity and starts to question the politics of our BELOVED emperor. He postulates to start negotiations with the <second kingdom name>! Crazy coward! Our society needs war. It brings inventions and empowers the kingdom's economy. (quietly) It also gives a reason for us to exist…
    say [captain]: Now, where was I? Ach, the lord-traitor. We must eliminate him. That's It, you'll find all the instructions and your role in this action in this notebook. And remember: You must not be revealed as a Hawk member. Never!
    say Is that all?
    say [captain]: Yes, you may leave now.
  `)


await TheLordMurderActionScene.compile();