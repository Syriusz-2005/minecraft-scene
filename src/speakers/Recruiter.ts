import Speaker from "../lib/utils/Speaker.js";
import Speech from "../lib/utils/Speech.js";
import TransformGroup from "../lib/utils/TransformGroup.js";
import { Vector } from "../lib/utils/Vector.js";



export const Recruiter = new Speaker('Recruiter', 'green');

const pos: Vector = [-190, 90.2, 44]

const recruiterSentence = new TransformGroup('speech.recruiter');


export const recruiterSpeech = new Speech(Recruiter, pos, recruiterSentence);



