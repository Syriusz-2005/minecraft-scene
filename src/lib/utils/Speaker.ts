

export default class Speaker {
  constructor(
    public readonly name: string,
    public readonly color: string,
  ) {}

  public getJson(message: string): string {
    const json = [
      {"text": "["}, 
      {"text": this.name, "color": this.color}, 
      {"text": "]: "},
      ...JSON.parse(message),
    ]

    return JSON.stringify(json).replace(/'/g, "\\'");
  }
}