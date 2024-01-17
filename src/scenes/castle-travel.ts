import { NAMESPACED_PATH, PATH, project } from "../mainProject.js";
import ActionTree from "../lib/ActionTree.js";
import Scene from "../lib/Scene.js";
import ContinueWhen from "../lib/actions/ContinueWhen.js";
import DisplayGoal from "../lib/actions/DisplayGoal.js";
import DisplaySentence from "../lib/actions/DisplaySentence.js";
import Fight from "../lib/actions/Fight.js";
import FreezePlayer from "../lib/actions/FreezePlayer.js";
import Restart from "../lib/actions/Restart.js";
import RunScene from "../lib/actions/RunScene.js";
import UnfreezePlayer from "../lib/actions/UnfreezePlayer.js";
import UsePath from "../lib/actions/UsePath.js";
import Wait from "../lib/actions/Wait.js";
import { getClearLastFight } from "../lib/utils/ClearLastFight.js";
import RestorePoint from "../lib/utils/RestorePoint.js";
import { BurglarSpeech } from "../speakers/Burglar.js";
import { fishSellerSpeech } from "../speakers/FishSeller.js";
import { ThePlayer } from "../speakers/ThePlayer.js";
import { TimeBeforeRecruitmentScene } from "./time-before-recruitment.js";


const scene = new Scene({
  NAMESPACED_PATH,
  PATH,
  sceneIndex: 1300,
  sceneName: 'castle-travel',
  project,
});

export {scene as CastleTravelScene};

const summonBurglars = `
  ${getClearLastFight(['w.burglar', 'w.burglar.with_knife'])}

  summon zombie -248.2 71 -23.2 {Invulnerable:true,NoAI:true,Rotation:[-132f, 0f],Tags:["w.burglar-1", "w.no-fire", "mob-abilities.dasher", "w.burglar.with_knife"],Silent:true,HasVisualFire:false,PersistenceRequired:true,DeathLootTable:"health:burglar"}
  effect give @e[tag=w.burglar.with_knife] strength infinite 1 true

  summon zombie -242.96 70.00 -38.69 {Invulnerable:true,NoAI:true,Rotation:[-34.10f, 6.41f],Tags:["w.burglar", "w.no-fire", "w.burglar-2", "mob-abilities.dasher"],Silent:true,HasVisualFire:false,PersistenceRequired:true,DeathLootTable:"health:burglar"}

  summon zombie -250.95 70.00 -39.43 {Invulnerable:true,NoAI:true,Rotation:[300.02f, 0.61f],Tags:["w.burglar", "w.no-fire", "w.burglar-3", "mob-abilities.dasher"],Silent:true,HasVisualFire:false,PersistenceRequired:true,DeathLootTable:"health:burglar"}

  team join oponents @e[tag=w.burglar]
`;

scene.actionTree
  .then('execute in minecraft:overworld run tp @a[tag=w.player] -194.70 79.00 -89.30 -1902.52 21.48')
  .then('execute positioned -190 72 -89 run kill @e[type=item_frame,limit=1,distance=..2]')
  .then(`summon item_frame -190 72 -89 {Invisible:true,Facing:1b}`)
  .then('clear @a[tag=w.player]')
  .then('gamemode adventure @a[tag=w.player]')
  .then('loot replace block -190 68 -89 container.0 loot w:notebook')
  .then('fill -188 71 -94 -189 72 -94 minecraft:barrier')
  .then('execute positioned -189.55 71.87 -89.00 run data modify entity @e[type=item_frame,sort=nearest,limit=1,distance=..2] Item set from block -190 68 -89 Items[{Slot:0b}]')
  .then(`
    execute as @a[tag=w.player] run function techsword:give_sword
    function w:generated/reset-state-machines
    time set 23100
    fill -321 67 -98 -318 64 -98 minecraft:spruce_fence
    function music:cliffhorn_theme/play
  `)
  .then(`
    effect give @a[tag=w.player] regeneration 5 10 true
  `)
  .then(new Wait(3))
  .then(new DisplaySentence(ThePlayer, '{"text": "Ah, my last day in this house..."}'))
  .then(new Wait(3))
  .then(new DisplaySentence(ThePlayer, `{"text": "Let's move on already!"}`))
  .then(new Wait(4))
  .then(new DisplaySentence(ThePlayer, `{"text": "If only my dad was here with me. I could really use his help right now."}`))
  .then(new Wait(5))
  .then(new DisplaySentence(ThePlayer, `{"text": "Ok so i need to get my sword and the notebook. I better hurry or they'll put me in the worst unit possible."}`))
  .then(new ContinueWhen(`execute if entity @a[tag=w.player,nbt={Inventory:[{id:"minecraft:written_book"}]}]`))
  .then('fill -188 71 -94 -189 72 -94 air')
  .then(new DisplaySentence(ThePlayer, `{"text": "I'm ready to go!"}`))
  .then(new DisplayGoal([{text: `Go to the main square near the castle.`}]))
  .then(new UsePath({
    pos: [-214.09, 70.00, -90.18],
    radius: 2,
  }))
  .then(new FreezePlayer([-214.09, 70.00, -89.5]))
  .then(new Wait(1))
  .then(`
    fill -321 67 -98 -318 64 -98 minecraft:spruce_fence
  `)
  .then(fishSellerSpeech.say({text: `Hey buddy! Where are ye going?`}))
  .then(new Wait(3))
  .then(fishSellerSpeech.sayAs({text: `Haven't you heard the Emperor's speech yesterday? I'm 18, so I'm going to war. I need to sign up for the army`}, ThePlayer))
  .then(new Wait(5))
  .then(fishSellerSpeech.say({text: `Ah, the War... Perhaps your training will finally pay off. I've heard you're quite good with a sword.`}))
  .then(new Wait(6))
  .then(fishSellerSpeech.say({text: `Speaking of which, that's your father's sword, isn't it?`}))
  .then(new Wait(4))
  .then(fishSellerSpeech.sayAs({text:"Yes, he left it to me along with his will."}, ThePlayer))
  .then(new Wait(4))
  .then(fishSellerSpeech.say({text: `He died for our kingdom! It's an honor and our duty!`}))
  .then(new Wait(5))
  .then(fishSellerSpeech.sayAs({text: "I'm not sure. For me it's mainly a loss and sorrow."}, ThePlayer))
  .then(new Wait(5))
  .then(fishSellerSpeech.say({text: `It is a sacrifice for a greater goal. The Emperor said that our enemies are merciless creatures who would not hesitate to kill us given the chance.`}))
  .then(new Wait(6))
  .then(fishSellerSpeech.say({text: `That's why we need an army. To protect us from them, and from the terrorists.`}))
  .then(new Wait(5))
  .then(fishSellerSpeech.say({text: `Now go son, or you'll miss the recruitment`}))
  .then(new Wait(5))
  .then(fishSellerSpeech.say({text: `Long live the Emperor! Long live you!`}))
  .then(new Wait(4))
  .then(fishSellerSpeech.sayAs({text: "Thank you. I hope we'll see again."}, ThePlayer))
  .then(summonBurglars)
  .then(`
    time add 100
  `)
  .then(new UnfreezePlayer())
  .concurrently({
    awaitingMethod: 'instant-skip',
  }, [
    new ActionTree(scene)
      .then(new Wait(5))
      .then(`kill @e[tag=${fishSellerSpeech.TransformGroup.groupTag}]`)
  ])
  .then(new UsePath({
    pos: [-243.69, 71.00, -29.04],
    radius: 2,
  }))
  .then(new FreezePlayer([-243.4, 71, -29.4]))
  .then(new Wait(1))
  .then(BurglarSpeech.sayAs({text: "What do you want?!"}, ThePlayer))
  .then(new Wait(3))
  .then(BurglarSpeech.say({text: `We don't want to cause a commotion, so hand over everything you have and let's go our separate ways.`}))
  .then(new Wait(5))
  .then(BurglarSpeech.sayAs({text: "Huh? Guards! Where are the Guards!?"}, ThePlayer))
  .then(new Wait(5))
  .then(BurglarSpeech.say({text: `Hahaha... They won't help you. The Emperor doesn't care about our mischief as long as we don't rob him.`}))
  .then(new Wait(6))
  .then(BurglarSpeech.say({text: `...And so do the guards. They are busy protecting his majesty, so hand over your bag, NOW!`}))
  .then(new Wait(5))
  .then(BurglarSpeech.say({text: `Look behind you. You've got nowhere to run.`}))
  .then(`
    summon zombie -233.67 71.00 -36.01 {Invulnerable:true,NoAI:true,Rotation:[415.68f, 8.34f],Tags:["w.burglar", "w.no-fire", "w.burglar-4", "mob-abilities.dasher"],Silent:true,HasVisualFire:false,PersistenceRequired:true,DeathLootTable:"health:burglar"}

    team join oponents @e[tag=w.burglar]
  `)
  .then(new Wait(6))
  .then(BurglarSpeech.sayAs({text: "That's enough, I won't give you anything!"}, ThePlayer))
  .then(new Wait(4))
  .then(BurglarSpeech.say({text: `Well, we could have settled it peacefully, but if you insist...`}))
  .then(new Wait(4))
  .then(BurglarSpeech.say({text: `Let's get him guys!`}))
  .then(new Wait(2))
  .then(new Fight({
    prepareEffect: new ActionTree(scene)
      .then(`
        ${summonBurglars}

        summon zombie -233.67 71.00 -36.01 {Invulnerable:true,NoAI:true,Rotation:[415.68f, 8.34f],Tags:["w.burglar", "w.no-fire", "w.burglar-4", "mob-abilities.dasher"],Silent:true,HasVisualFire:false,PersistenceRequired:true,DeathLootTable:"health:burglar"}
    
        team join oponents @e[tag=w.burglar]
      `),
    skipFirstTimePreparation: true,
    startEffect: `
      execute as @e[tag=w.burglar] run data modify entity @s Invulnerable set value false
      execute as @e[tag=w.burglar.with_knife] run data modify entity @s Invulnerable set value false
      execute as @e[tag=w.burglar] run data modify entity @s NoAI set value false
      execute as @e[tag=w.burglar.with_knife] run data modify entity @s NoAI set value false

      kill @e[tag=${BurglarSpeech.TransformGroup.groupTag}]
      tag @a[tag=w.player] add w.no-healing
      ${UnfreezePlayer.Commands}

      worldborder center -245.87 -27.45
      worldborder set 38
      worldborder damage amount 0
    `,
    endWhenSuccess: `execute unless entity @e[tag=w.burglar] unless entity @e[tag=w.burglar.with_knife]`
  }))
  .then(new Wait(3))
  .then(`
    tag @a[tag=w.player] remove w.no-healing
    worldborder set 999999
  `)
  .then(new UsePath({
    pos: [-212, 89, 33],
    radius: 2,
  }))
  .then(new DisplaySentence(ThePlayer, `{"text": "I didn't expect to be the first one here! I need to find something to do, I still have plenty of time..."}`))
  .then(``)
  .then(new DisplayGoal([{text: `Wander around the city until the sun rises...`}]))
  .then(new RunScene(TimeBeforeRecruitmentScene))
