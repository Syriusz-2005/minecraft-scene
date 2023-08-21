import Project from "./globalTick.js";



export type Env = {
  readonly PATH: string;
  readonly NAMESPACED_PATH: string;
  readonly project: Project;
}