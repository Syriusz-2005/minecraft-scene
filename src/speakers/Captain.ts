import Speaker from "../lib/utils/Speaker.js";
import Speech from "../lib/utils/Speech.js";
import TransformGroup from "../lib/utils/TransformGroup.js";
import { Vector } from "../lib/utils/Vector.js";


const pos: Vector = [-301, 11, -108.5];

export const Captain = new Speaker('Captain', 'green');

export const captainSentence = new TransformGroup('speech.captain');

export const captainSpeech = new Speech(Captain, pos, captainSentence);
export const MineCaptainSpeech = new Speech(Captain, [-223, -13.7, -64], captainSentence);
export const campCaptainSpeech = new Speech(Captain, [-313.5, 88, -371], captainSentence);