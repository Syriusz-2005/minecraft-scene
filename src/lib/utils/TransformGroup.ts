import { Action, ActionConfig, CompileResult } from "../ActionTree";
import { Vector } from "./Vector";


export default class TransformGroup {
  constructor(
    public readonly groupTag: string,
  ) {}

  // public TransformFor(delta: Vector, timeSeconds: number): Action {
  //   return {
  //     compile: (config: ActionConfig): CompileResult => {
  //       return {}
  //     }
  //   }
  // }
}