import Speaker from "../lib/utils/Speaker.js";
import Speech from "../lib/utils/Speech.js";
import TransformGroup from "../lib/utils/TransformGroup.js";
import { Vector } from "../lib/utils/Vector.js";


const pos: Vector = [-295, 11, -102];

export const Miners = new Speaker('Miner', 'green');

const minerSentence = new TransformGroup('speech.miners');

export const minerSpeech = new Speech(Miners, pos, minerSentence, [123, 0]);
