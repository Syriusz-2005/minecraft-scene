import DisplaySentence from "../actions/DisplaySentence";
import DisplayText from "../actions/DisplayText.js";
import { TextComponent } from "../types/TextComponent";
import Speaker from "./Speaker";
import TransformGroup from "./TransformGroup";
import { Vec2, Vector } from "./Vector";



export default class Speech {
  constructor(
    private speaker: Speaker,
    private pos: Vector,
    private transformGroup: TransformGroup,
    private rotation?: Vec2,
  ) {}

  public say(text: TextComponent | TextComponent[]) {
    return new DisplayText(this.pos, this.speaker, JSON.stringify(text instanceof Array ? text : [text]), this.transformGroup, this.rotation)
  }

  public get TransformGroup() {
    return this.transformGroup;
  }
}