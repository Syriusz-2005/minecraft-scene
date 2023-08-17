


export default class Speaker {
  constructor(
    public readonly name: string,
    public readonly color: string,
  ) {}

  public getJson(message: string): string {
    const msg = JSON.parse(message);

    const json = [
      {"text": "["}, 
      {"text": this.name, "color": this.color}, 
      {"text": "]: "},
      ...(msg instanceof Array ? msg : [msg]),
    ]

    return JSON.stringify(json).replace(/'/g, "\\'");
  }
}