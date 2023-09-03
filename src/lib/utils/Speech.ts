import DisplaySentence from "../actions/DisplaySentence";
import DisplayText from "../actions/DisplayText.js";
import RunCommand from "../actions/RunCommand.js";
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
    private dim?: string,
  ) {}

  public say(text: TextComponent | TextComponent[]) {
    return new DisplayText(this.pos, this.speaker, JSON.stringify(text instanceof Array ? text : [text]), this.transformGroup, this.rotation, this.dim);
  }

  public sayAs(text: TextComponent | TextComponent[], speaker: Speaker) {
    return new DisplayText(this.pos, speaker, JSON.stringify(text instanceof Array ? text : [text]), this.transformGroup, this.rotation, this.dim);
  }

  public hide() {
    return new RunCommand(`kill @e[tag=${this.transformGroup.groupTag}]`);
  }

  public get TransformGroup() {
    return this.transformGroup;
  }
}