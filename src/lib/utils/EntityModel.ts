import { randomUUID } from "crypto"

export type ModelActions = {

}

/**
 * The model animation can implement the following built-in animations for default actions
 * - `move` run when the model is moving
 */
export default class EntityModel {
  public readonly id = `w.model.${randomUUID()}`;
  
  constructor(
    public readonly modelName: string,
    public readonly actions: ModelActions,
  ) {}
}