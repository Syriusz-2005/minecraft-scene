import { NAMESPACED_PATH, PATH, project } from "../PATH.js";
import Scene from "../lib/Scene.js";
import ContinueWhen from "../lib/actions/ContinueWhen.js";
import DisplayGoal from "../lib/actions/DisplayGoal.js";
import Restart from "../lib/actions/Restart.js";
import UsePath from "../lib/actions/UsePath.js";
import Wait from "../lib/actions/Wait.js";
import { campCaptainSpeech } from "../speakers/Captain.js";
import { evaporationPreparationSoldierSpeech } from "../speakers/Soldier.js";
import { ThePlayer } from "../speakers/ThePlayer.js";


const scene = new Scene({
  NAMESPACED_PATH,
  PATH,
  project,
  sceneIndex: 8832,
  sceneName: 'evaporation-preparation',
});

export {scene as EvaporationPreparationScene};


scene.actionTree
   

  //NA KONIEC ZMIENIĆ Z SORT=NEAREST NA TAG=W.PLAYER!!!!!!!!!!
  .then('execute positioned -338 84 -330 run ride @a[sort=nearest,limit=1] mount 27aff223-5c92-4cdb-9dbc-fecd320e26cf')
  .then(new Wait(1))
  .then(evaporationPreparationSoldierSpeech.say({text: `Hey! Are you Lucas?`}))
  .then(new Wait(3))
  .then(evaporationPreparationSoldierSpeech.sayAs({text: `Yeah, that's me`}, ThePlayer))
  .then(new Wait(3))
  .then(evaporationPreparationSoldierSpeech.say({text: `Captain want's to see you in his tent. It's urgent!`}))
  .then(new Wait(3))
  .then(evaporationPreparationSoldierSpeech.sayAs({text: `Oh, thanks for the message. I'll go there now.`}, ThePlayer))
  .then(new Wait(3))
  .then(evaporationPreparationSoldierSpeech.say({text: `Don't keep him waiting.`}))
  .then(new Wait(2))
  .then(new DisplayGoal([{text: `Go to the Captain's tent`}]))
  .then(new Wait(2))
  .then(evaporationPreparationSoldierSpeech.hide())

  
  .then('execute positioned -316 88 -369 run kill @e[type=item_frame,limit=1,distance=..2]')
  .then(`summon item_frame -316 88 -369 {Invisible:true,Facing:1b}`)
  .then('execute positioned -316 88 -369 run data modify entity @e[type=item_frame,sort=nearest,limit=1,distance=..2] Item set from block -316 85 -369 Items[{Slot:0b}]')

  .then(new UsePath({
    pos: [-317.5, 87, -370.5],
    radius: 1.5,
  }))

  .then(campCaptainSpeech.sayAs({text: `You wanted to see me captain`}, ThePlayer))
  .then(new Wait(3))
  .then(campCaptainSpeech.say({text: `Lucas... Am i correct?`}))
  .then(new Wait(3))
  .then(campCaptainSpeech.sayAs({text: `Yes Captain.`}, ThePlayer))
  .then(new Wait(3))
  .then(campCaptainSpeech.say({text: `Let's get straight to the topic. I've heard that you've shown some talent in our training...`}))
  .then(new Wait(6))
  .then(campCaptainSpeech.say({text: `So we'll provide you with a chance to prove that you are equally skilled during real action.`}))
  .then(new Wait(6))
  .then(campCaptainSpeech.say({text: `Our beloved Emperor has entrusted us with a mission of utmost importance,`}))
  .then(new Wait(6))
  .then(campCaptainSpeech.say({text: `a mission that requires the cunning of a fox.`}))
  .then(new Wait(6))
  .then(campCaptainSpeech.say({text: `You see, there's a certain nobleman in our midst,`}))
  .then(new Wait(6))
  .then(campCaptainSpeech.say({text: `a Lord by the name of [name], who has dared to question the wisdom of our beloved Emperor.`}))
  .then(new Wait(6))
  .then(campCaptainSpeech.say({text: `He said he wants to propose solutions for ending the war.`}))
  .then(new Wait(6))
  .then(campCaptainSpeech.say({text: `And between you and me, our kingdom needs this war;`}))
  .then(new Wait(6))
  .then(campCaptainSpeech.say({text: `it brings innovation and empowers our economy. It also gives our army a reason to exist.`}))
  .then(new Wait(6))
  .then(campCaptainSpeech.say({text: `In summary, our task is to capture this nobleman. Simple as that.`}))
  .then(new Wait(6))
  .then(campCaptainSpeech.say({text: `He will be guarded without a doubt, and that's why we need you.`}))
  .then(new Wait(6))
  .then(campCaptainSpeech.say({text: `Your father's fighting spirit is burning inside of you... Ready to be used in a real battle.`}))
  .then(new Wait(6))
  .then(campCaptainSpeech.say({text: `I think that's all. If you have any questions, you'll find answers in this notebook.`}))
  .then(new Wait(3))
  .then(new DisplayGoal([{text: `Get the notebook.`}]))
  .then(new Wait(2))
  .then(campCaptainSpeech.hide())
  .then(new ContinueWhen(`execute if entity @a[tag=w.player,nbt={Inventory:[{id:"minecraft:written_book", tag:{isEvaporationPlan:1b}}]}]`))
  .then(campCaptainSpeech.say({text: `You may go now, soldier.`}))
  .then(new Wait(3))
  .then(campCaptainSpeech.sayAs({text: `Thank you Captain.`}, ThePlayer))
  .then(new Wait(3))
  .then(campCaptainSpeech.hide())
await scene.compile();

