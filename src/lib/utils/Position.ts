import { Vec2, Vector } from "./Vector";


export default class Position {
  constructor(
    public readonly pos: Vector,
    public readonly rotation: Vec2,
  ) {}
}