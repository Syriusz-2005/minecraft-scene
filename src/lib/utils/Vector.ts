

export type Vector = [number, number, number];

export class VMath {
  public static delta(v1: Vector, v2: Vector): Vector {
    return [
      v2[0] - v1[0],
      v2[1] - v1[1],
      v2[2] - v1[2],
    ]
  }

  public static scalarDivide(v: Vector, scalar: number): Vector {
    return [
      v[0] / scalar,
      v[1] / scalar,
      v[2] / scalar,
    ]
  }
}