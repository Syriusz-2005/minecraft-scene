import Speaker from "../lib/utils/Speaker.js";
import Speech from "../lib/utils/Speech.js";
import TransformGroup from "../lib/utils/TransformGroup.js";
import { Vector } from "../lib/utils/Vector.js";




export const Soldier = new Speaker('Soldier', 'green');

export const soldierSentence = new TransformGroup('speech.soldier');

export const evaporationPreparationSoldierSpeech = new Speech(Soldier, [-335, 85, -336], soldierSentence);