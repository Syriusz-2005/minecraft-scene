import { NAMESPACED_PATH, PATH, project } from "../mainProject.js";
import ActionTree from "../lib/ActionTree.js";
import Scene from "../lib/Scene.js";
import ContinueWhen from "../lib/actions/ContinueWhen.js";
import DisplayGoal from "../lib/actions/DisplayGoal.js";
import DisplaySentence from "../lib/actions/DisplaySentence.js";
import RunScene from "../lib/actions/RunScene.js";
import UsePath from "../lib/actions/UsePath.js";
import Wait from "../lib/actions/Wait.js";
import Pathfinder from "../lib/utils/Pathfinder.js";
import RestorePoint from "../lib/utils/RestorePoint.js";
import { miner1Pathfinder, miner2Pathfinder } from "../models/miner.js";
import { captainSpeech } from "../speakers/Captain.js";
import { minerSpeech } from "../speakers/Miners.js";
import { recruiterSpeech } from "../speakers/Recruiter.js";
import { ThePlayer } from "../speakers/ThePlayer.js";
import { isPlayerRecruited } from "../states/isPlayerRecruited.js";
import { CaptainPathfinder } from "./CaptainPathfinder.js";
import { TheMineScene } from "./the-mine.js";


export const TimeBeforeRecruitmentScene = new Scene({
  NAMESPACED_PATH,
  PATH,
  project,
  sceneIndex: 9012,
  sceneName: 'time-before-recruitment',
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
    function animated_java:recruiter/remove/all
    execute positioned -190.86 89.00 39.13 rotated -987.59 -0.23 run function animated_java:recruiter/summon
  `)
  .then(new DisplayGoal([{text: `Go back to the main square.`}]))
  .then(new UsePath({
    pos: [-212, 89, 33],
    radius: 2,
  }))
  .then(recruiterSpeech.say({text: 'Hey, you, come over here!'}))
  .then(new UsePath({
    pos: [-197, 89, 39],
    radius: 2,
  }))
  .then(recruiterSpeech.say({text: `You are the first one today. Name?`}))
  .then(new Wait(3))
  .then(recruiterSpeech.sayAs({text: "Lukas"}, ThePlayer))
  .then(new Wait(1))
  .then(recruiterSpeech.say({text: 'The son of?...'}))
  .then(new Wait(3))
  .then(recruiterSpeech.sayAs({text: "Evan"}, ThePlayer))
  .then(new Wait(4))
  .then(recruiterSpeech.say({text: 'The son of Evan?! He was a somebody wasn`t He! I remember the moment when the Emperor himself gave him a medal. His achievements on the battlefield were truly remarkable!'}))
  .then(new Wait(8))
  .then(recruiterSpeech.say({text: `You are a son of the Great Warrior!`}))
  .then(new Wait(5))
  .then(recruiterSpeech.sayAs({text: "He taught me to fight before he died. May his soul rest in peace, but you needed his skill once again..."}, ThePlayer))
  .then(new Wait(3))
  .then(recruiterSpeech.say({text: `You know, I was the guy that recruited him the second time. It was a year ago. He told me about you and said that you had potential.`}))
  .then(new Wait(6))
  .then(recruiterSpeech.say({text: `Normally I don't do that, but because your dad was my friend, I'm gonna do something special for you. I'll sign you as a recruit for 'The Hawks'...`}))
  .then(new Wait(10))
  .then(recruiterSpeech.sayAs({text: "What?! What do you mea..."}, ThePlayer))
  .then(new Wait(4))
  .then(recruiterSpeech.say({text: `...Do not interrupt! You'll still be a recruit so don't expect glory and fame initially. But this is a chance for you! The Hawks are an elite! Make the most of that unique occasion as nobody will give you another one.`}))
  .then(new Wait(10))
  .then(recruiterSpeech.say({text: `The training camp of the Hawks formation can be found after turning right in the intersection closest to the city's main gate, but the Captain currently inspects the sulfur Mine. You can go help him and maybe introduce yourself.`}))
  .then(isPlayerRecruited.Update(1))
  .then(new ContinueWhen('execute positioned -196.35 88.94 36.52 unless entity @a[tag=w.player,distance=..8]'))
  .then(new Wait(6))
  .then(new DisplayGoal([{text: `Find the captain in the sulfur mine next to the city.`}]))
  .then(`
    kill @e[tag=${recruiterSpeech.TransformGroup.groupTag}]
    fill -318 64 -98 -321 66 -98 air
  `)
  .then(new UsePath({
    pos: [-319, 64, -87],
    radius: 3,
  }))
  .then(CaptainPathfinder.summon([-298.41, 11.00, -106.38]))
  .then(CaptainPathfinder.setPosition([-298.41, 11.00, -106.38], [415.99, -4.17]))
  .then(CaptainPathfinder.setPause(true))
  .then(`
    clone -286 21 -94 -281 25 -101 -286 7 -101
  `)
  .then(miner1Pathfinder.summon([-289.3, 7, -92.3]))
  .then(miner1Pathfinder.setPosition([-289.3, 7, -92.3], [170, 0]))
  .then(miner2Pathfinder.summon([-287.3, 8, -91.3]))
  .then(miner2Pathfinder.setPosition([-287.3, 8, -91.3], [157, 0]))
  .then(miner1Pathfinder.setPause(true))
  .then(miner2Pathfinder.setPause(true))
  .then(new ContinueWhen(`execute positioned -299 11.5 -103.5 if entity @a[tag=w.player,distance=..6]`))
  .then(captainSpeech.say({text: 'Who are you?'}))
  .then(new Wait(2))
  .then(captainSpeech.sayAs({text: `I'm a new recruit to the Hawks formation sir.`}, ThePlayer))
  .then(new Wait(3))
  .then(captainSpeech.say({text: `Great! You must go to the camp then...`}))
  .then(new Wait(1))
  .then(minerSpeech.say({text: '...Sir, sir! We heard the hissing again! There must be something!'}))
  .then(new Wait(3))
  .then(captainSpeech.say({text: `I told you, there's nothing there, you can blow up this wall right away.`}))
  .then(new Wait(3))
  .then(captainSpeech.say({text: `Listen: I gotta go, you stay with the miners as they won't make any progress without the backup. Cowardly commoners!`}))
  .then(new Wait(7))
  .then(captainSpeech.say({text: `Show 'em that there's nothing behind that wall.`}))
  .then(new Wait(3))
  .then(captainSpeech.sayAs({text: `Yes sir!`}, ThePlayer))
  .then(new Wait(2))
  .then(CaptainPathfinder.setPause(false))
  .concurrently({awaitingMethod: 'instant-skip'}, [
    new ActionTree(TimeBeforeRecruitmentScene)
      .then(CaptainPathfinder.moveTo([-318, 10, -104]))
      .then(CaptainPathfinder.dispatch())
  ])
  .then(new Wait(3))
  .then(`
    kill @e[tag=${captainSpeech.TransformGroup.groupTag}]
    kill @e[tag=${minerSpeech.TransformGroup.groupTag}]
  `)
  .then(new RunScene(TheMineScene))
