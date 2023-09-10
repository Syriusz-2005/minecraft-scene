import Speaker from "../lib/utils/Speaker.js";
import Speech from "../lib/utils/Speech.js";
import TransformGroup from "../lib/utils/TransformGroup.js";
import { Vector } from "../lib/utils/Vector.js";



const pos: Vector = [-376.1, 89, -328.2];
export const Trainer = new Speaker('Trainer', 'green');

const TrainerSentence = new TransformGroup('speech.trainer');


export const TrainerSpeech = new Speech(Trainer, pos, TrainerSentence);
