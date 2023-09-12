


export default class Speaker {
  constructor(
    public readonly name: string,
    public readonly color: string,
    public readonly bold = false,
  ) {}

  public getJson(message: string): string {
    const msg = JSON.parse(message);

    const json = [
      {"text": "["}, 
      {"text": this.name, "color": this.color, "bold": this.bold}, 
      {"text": "]: "},
      ...(msg instanceof Array ? msg : [msg]),
    ]

    return JSON.stringify(json);
  }
}