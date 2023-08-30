import Speaker from "../lib/utils/Speaker.js";
import Speech from "../lib/utils/Speech.js";
import TransformGroup from "../lib/utils/TransformGroup.js";
import { Vector } from "../lib/utils/Vector.js";


const pos: Vector = [-285, 8.6, -95];


export const Miner1 = new Speaker('First miner', 'green');
export const Miner2 = new Speaker('Second miner', 'green');
export const Miner3 = new Speaker('Third miner', 'green');


const minerSentence = new TransformGroup('speech.miners');

export const minerSpeech = new Speech(Miner1, pos, minerSentence, [123, 0]);
