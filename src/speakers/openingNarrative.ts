import EmptySpeaker from "../lib/utils/EmptySpeaker.js";
import Speaker from "../lib/utils/Speaker.js";
import Speech from "../lib/utils/Speech.js";
import TransformGroup from "../lib/utils/TransformGroup.js";
import { Vector } from "../lib/utils/Vector.js";


const pos: Vector = [-158.95, -11.00, 95.45];

const sentence = new TransformGroup('speech.narrator');


export const openingNarrativeSpeech = new Speech(new EmptySpeaker(), pos, sentence, [270.50, 5.16]);



