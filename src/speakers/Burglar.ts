import Speaker from "../lib/utils/Speaker.js";
import Speech from "../lib/utils/Speech.js";
import TransformGroup from "../lib/utils/TransformGroup.js";
import { Vector } from "../lib/utils/Vector.js";


export const Burglar = new Speaker('Burglar', 'red');

const pos: Vector = [-245.1, 72.00, -23];

const BurglarSentence = new TransformGroup('burglar');

export const BurglarSpeech = new Speech(Burglar, pos, BurglarSentence, [-153, 0]);