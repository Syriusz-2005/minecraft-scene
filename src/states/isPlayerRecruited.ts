import { NAMESPACED_PATH, PATH, project } from "../mainProject.js";
import StateMachine from "../lib/utils/StateMachine.js";


export const isPlayerRecruited = await new StateMachine({
  default: 0,
  name: 'is-player-recruited',
  NAMESPACED_PATH,
  PATH,
  project,
}).init();