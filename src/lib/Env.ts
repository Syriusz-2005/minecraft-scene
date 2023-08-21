import Project from "./Project.js";



export type Env = {
  readonly PATH: string;
  readonly NAMESPACED_PATH: string;
  readonly project: Project;
}