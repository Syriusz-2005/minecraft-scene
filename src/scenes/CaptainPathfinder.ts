import { NAMESPACED_PATH, PATH, project } from "../PATH.js";
import Pathfinder from "../lib/utils/Pathfinder.js";


export const CaptainPathfinder = new Pathfinder({
  id: 'captain-in-the-mine',
  NAMESPACED_PATH,
  PATH,
  project,
  options: {
    successRadius: 2.5,
    speed: 0.6,
  }
});
