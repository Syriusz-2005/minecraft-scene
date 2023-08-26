import { NAMESPACED_PATH, PATH, project } from "../PATH.js";
import Scene from "../lib/Scene.js";
import ContinueWhen from "../lib/actions/ContinueWhen.js";
import DisplaySentence from "../lib/actions/DisplaySentence.js";
import UsePath from "../lib/actions/UsePath.js";
import Wait from "../lib/actions/Wait.js";
import RestorePoint from "../lib/utils/RestorePoint.js";
import { recruiterSpeech } from "../speakers/Recruiter.js";
import { ThePlayer } from "../speakers/ThePlayer.js";
import { isPlayerRecruited } from "../states/isPlayerRecruited.js";


export const TimeBeforeRecruitmentScene = new Scene({
  NAMESPACED_PATH,
  PATH,
  project,
  sceneIndex: 9012,
  sceneName: 'time-before-recruitment',
});



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
  .then(new UsePath({
    pos: [-212, 89, 33],
    radius: 2,
  }))
  .then(`
    say now there will be some npc's on the square
  `)
  .then(recruiterSpeech.say({text: 'Hey, you, come over here!'}))
  .then(new UsePath({
    pos: [-195, 89, 39],
    radius: 2,
  }))
  .then(recruiterSpeech.say({text: `You're the first today. Name?`}))
  .then(new Wait(3))
  .then(new DisplaySentence(ThePlayer, `{"text": "Kakti (placeholder)"}`))
  .then(new Wait(1))
  .then(recruiterSpeech.say({text: 'Last name?'}))
  .then(new Wait(3))
  .then(new DisplaySentence(ThePlayer, `{"text": "(placeholder)"}`))
  .then(new Wait(4))
  .then(recruiterSpeech.say({text: 'The son of <>? He was somebody! I remember the moment when the Emperor himself gave him a badge. Those were times...'}))
  .then(new Wait(5))
  .then(recruiterSpeech.say({text: `You're the son of a great warrior!`}))
  .then(new Wait(5))
  .then(new DisplaySentence(ThePlayer, `{"text": "He taught me to fight before he died."}`))
  .then(new Wait(3))
  .then(recruiterSpeech.say({text: `You know, I was the guy that recruited him the second time. It was a year ago. He told me about you and said that you were a great student.`}))
  .then(new Wait(6))
  .then(recruiterSpeech.say({text: `Normally I don't do that, but because your dad was my friend, I'm gonna do something special for you. I'll sign you as a recruit for 'The Hawks'...`}))
  .then(new Wait(6))
  .then(new DisplaySentence(ThePlayer, `{"text": "How's that possi..."}`))
  .then(new Wait(2))
  .then(recruiterSpeech.say({text: `...Do not interrupt! You'll still be a recruit so don't expect glory and fame initially. But this is a chance for you! The Hawks are a total elite! Make the most of that unique occasion as I won't give you another one.`}))
  .then(new Wait(5))
  .then(recruiterSpeech.say({text: `The training camp of the Hawks formation can be found after turning right in the interesection closest to the citie's main gate. Find It and talk to the captain.`}))
  .then(isPlayerRecruited.Update(1))
  .then(new ContinueWhen('execute positioned -196.35 88.94 36.52 unless entity @a[tag=w.player,distance=..8]'))
  .then(new Wait(5))
  .then(`
    kill @e[tag=${recruiterSpeech.TransformGroup.groupTag}]
  `)
  .then(new UsePath({
    pos: [-306, 80, -343],
    radius: 3,
  }))
  .then(`
    say the player enters the Hawk's training camp
  `)

await TimeBeforeRecruitmentScene.compile();