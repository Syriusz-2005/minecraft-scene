import Speaker from "../lib/utils/Speaker.js";
import Speech from "../lib/utils/Speech.js";
import TransformGroup from "../lib/utils/TransformGroup.js";
import { Vector } from "../lib/utils/Vector.js";


export const FishSeller = new Speaker('Fish seller', 'green');

const pos: Vector = [-216, 71, -95];

const sellerSentence = new TransformGroup('beggar');


export const fishSellerSpeech = new Speech(FishSeller, pos, sellerSentence);