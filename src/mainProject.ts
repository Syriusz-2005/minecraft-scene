import Project from "./lib/Project.js";

export const PATH = '../data/w/functions/generated';
export const NAMESPACED_PATH = 'w:generated';


export const project = await new Project(PATH, NAMESPACED_PATH).init();

console.time('Compiled scenes in');
await project.compileAll();
console.timeEnd('Compiled scenes in');
