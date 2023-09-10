import { NAMESPACED_PATH, PATH, project } from "../PATH.js";
import ActionTree from "../lib/ActionTree.js";
import Scene from "../lib/Scene.js";
import ContinueWhen from "../lib/actions/ContinueWhen.js";
import DisplaySentence from "../lib/actions/DisplaySentence.js";
import RunScene from "../lib/actions/RunScene.js";
import UsePath from "../lib/actions/UsePath.js";
import Wait from "../lib/actions/Wait.js";
import Pathfinder from "../lib/utils/Pathfinder.js";
import RestorePoint from "../lib/utils/RestorePoint.js";
import { captainSpeech } from "../speakers/Captain.js";
import { minerSpeech } from "../speakers/Miners.js";
import { recruiterSpeech } from "../speakers/Recruiter.js";
import { ThePlayer } from "../speakers/ThePlayer.js";
import { isPlayerRecruited } from "../states/isPlayerRecruited.js";
import { TheMineScene } from "./the-mine.js";


export const TimeBeforeRecruitmentScene = new Scene({
  NAMESPACED_PATH,
  PATH,
  project,
  sceneIndex: 9012,
  sceneName: 'time-before-recruitment',
});

const CaptainPathfinder = new Pathfinder({
  id: 'captain-in-the-mine',
  NAMESPACED_PATH,
  PATH,
  project,
  options: {
    successRadius: 2,
    speed: 0.6,
  }
});

await CaptainPathfinder.init();

TimeBeforeRecruitmentScene.actionTree
  .concurrently({
    awaitingMethod: 'any-finished',
  }, [
    new UsePath({
      pos: [-298, 70, -55],
      radius: 3,
    }),
    new UsePath({
      pos: [-317, 64, -78],
      radius: 3,
    }),
  ])
  .then(`
    time add 300
  `)
  .then(new UsePath({
    pos: [-212, 89, 33],
    radius: 2,
  }))
  .then(recruiterSpeech.say({text: 'Hey, you, come over here!'}))
  .then(new UsePath({
    pos: [-195, 89, 39],
    radius: 2,
  }))
  .then(recruiterSpeech.say({text: `You're the first today. Name?`}))
  .then(new Wait(3))
  .then(recruiterSpeech.sayAs({text: "Lukas"}, ThePlayer))
  .then(new Wait(1))
  .then(recruiterSpeech.say({text: 'The son of?'}))
  .then(new Wait(3))
  .then(recruiterSpeech.sayAs({text: "Evan"}, ThePlayer))
  .then(new Wait(4))
  .then(recruiterSpeech.say({text: 'The son of Evan? He was somebody! I remember the moment when the Emperor himself gave him a badge. His achievements on the battlefield were truly remarkable!'}))
  .then(new Wait(8))
  .then(recruiterSpeech.say({text: `You're the son of a great warrior!`}))
  .then(new Wait(5))
  .then(recruiterSpeech.sayAs({text: "He taught me to fight before his death on the war. He could live his life happily ever after, but you needed his skill once again..."}, ThePlayer))
  .then(new Wait(3))
  .then(recruiterSpeech.say({text: `You know, I was the guy that recruited him the second time. It was a year ago. He told me about you and said that you were a great student.`}))
  .then(new Wait(6))
  .then(recruiterSpeech.say({text: `Normally I don't do that, but because your dad was my friend, I'm gonna do something special for you. I'll sign you as a recruit for 'The Hawks'...`}))
  .then(new Wait(8))
  .then(recruiterSpeech.sayAs({text: "How's that possi..."}, ThePlayer))
  .then(new Wait(3))
  .then(recruiterSpeech.say({text: `...Do not interrupt! You'll still be a recruit so don't expect glory and fame initially. But this is a chance for you! The Hawks are an elite! Make the most of that unique occasion as nobody will give you another one.`}))
  .then(new Wait(8))
  .then(recruiterSpeech.say({text: `The training camp of the Hawks formation can be found after turning right in the interesection closest to the city's main gate but the Captain currently inspects the sulfur Mine. You can go directly to him to introduce yourself.`}))
  .then(isPlayerRecruited.Update(1))
  .then(new ContinueWhen('execute positioned -196.35 88.94 36.52 unless entity @a[tag=w.player,distance=..8]'))
  .then(new Wait(5))
  .then(`
    kill @e[tag=${recruiterSpeech.TransformGroup.groupTag}]
  `)
  .then(new UsePath({
    pos: [-319, 64, -87],
    radius: 3,
  }))
  .then(CaptainPathfinder.summon([-298.41, 11.00, -106.38]))
  .then(CaptainPathfinder.setPosition([-298.41, 11.00, -106.38], [415.99, -4.17]))
  .then(CaptainPathfinder.setPause(true))
  .then(`
    summon villager -298.41 11.00 -106.38 {NoAI:true,Tags:["w.entity.captain", "${CaptainPathfinder.Tag}.pathClient"]}
    clone -286 21 -94 -281 25 -101 -286 7 -101
  `)
  .then(new ContinueWhen(`execute positioned -299 11.5 -103.5 if entity @a[tag=w.player,distance=..6]`))
  .then(captainSpeech.say({text: 'Who are you?'}))
  .then(new Wait(2))
  .then(captainSpeech.sayAs({text: `I'm a new recruit to the Hawks formation sir.`}, ThePlayer))
  .then(new Wait(3))
  .then(captainSpeech.say({text: `Great! You must go to the camp then...`}))
  .then(new Wait(1))
  .then(minerSpeech.say({text: 'Sir, sir! We could here the hiss once again! There must be something!'}))
  .then(new Wait(3))
  .then(captainSpeech.say({text: `I told you, there's nothing there, you can blow up this wall right away.`}))
  .then(new Wait(3))
  .then(captainSpeech.say({text: `Listen, you: I gotta go, stay with the miners as they won't make any progress without the emotional support.`}))
  .then(new Wait(5))
  .then(captainSpeech.say({text: `Show them that there's nothing behind that wall.`}))
  .then(new Wait(3))
  .then(captainSpeech.sayAs({text: `Yes sir!`}, ThePlayer))
  .then(new Wait(2))
  .then(CaptainPathfinder.setPause(false))
  .concurrently({awaitingMethod: 'instant-skip'}, [
    new ActionTree(TimeBeforeRecruitmentScene)
      .then(CaptainPathfinder.moveTo([-318, 10, -104]))
      .then(CaptainPathfinder.dispatch())
  ])
  .then(new Wait(5))
  .then(`
    kill @e[tag=${captainSpeech.TransformGroup.groupTag}]
    kill @e[tag=${minerSpeech.TransformGroup.groupTag}]
  `)
  .then(new RunScene(TheMineScene))

await TimeBeforeRecruitmentScene.compile();