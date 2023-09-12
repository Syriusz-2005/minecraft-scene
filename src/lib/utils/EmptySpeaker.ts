import Speaker from "./Speaker.js";


export default class EmptySpeaker implements Speaker {
  name = 'no-name';
  color = 'black';
  bold = false;
  public getJson(message: string): string {
    const msg = JSON.parse(message);

    const json = [
      ...(msg instanceof Array ? msg : [msg]),
    ]

    return JSON.stringify(json);
  }
}