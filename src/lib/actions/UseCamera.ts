import ActionTree, { Action, ActionConfig, CompileResult } from "../ActionTree.js";
import { VMath, Vector } from "../utils/Vector.js";


export type CameraConfig = {
  anchorPoints: Anchor[];
}

/**
 * @param durationTo is no-op for the first placed anchor
 */
export type Anchor = {
  in?: string;
  position: Vector;
  rotation: [number, number];
  durationTo: number;
}

/**
 * @blocking This action is synchronous in the action tree, meaning that all the next actions will run only after this one will stop executing
 */
export default class UseCamera implements Action {
  private readonly anchors: Anchor[] = []; 

  constructor(
    cameraConfig: CameraConfig,
  ) {
    this.anchors = cameraConfig.anchorPoints;
  }

  public async compile(config: ActionConfig): CompileResult {
    const {scene} = config;
    let index = config.functionIndex;

    if (this.anchors.length === 0) throw new TypeError('The minimum number of anchors is 1, provided 0');

    const firstAnchor = this.anchors[0];

    const scoreHolderName = `#w.camera.${config.branchIndex ?? 0}-${config.functionIndex}.tick`;

    function getDimension(dimension?: string) {
      return `${dimension ? `execute in ${dimension} run ` : ''}`
    }

    await ActionTree.appendAction(config, `
      #Camera scripts
      ${getDimension(firstAnchor.in)}summon armor_stand ${firstAnchor.position[0]} ${firstAnchor.position[1]} ${firstAnchor.position[2]} {Rotation: [${firstAnchor.rotation[0]}f, ${firstAnchor.rotation[1]}f], Tags: ["w.camera-marker"], NoGravity: true, Invulnerable: true}

      scoreboard players set ${scoreHolderName} w.internal 0

      gamemode spectator @a[tag=w.player]
      execute as @a[tag=w.player] run spectate @e[tag=w.camera-marker,sort=nearest,limit=1]
      function ${scene.getFunctionReference(config.branchIndex, index + 1, 'camera-loop')}
    `);



    {
      const {name, reference} = scene.getFunction(config.branchIndex, index, 'test-mode-loop');
      await scene.appendToFile('tick.mcfunction', `
        execute if data storage w:config testMode run function ${reference}
      `);
      await scene.mkFile(name, `
        execute unless score #timer.60t w.internal matches 1 run return 1


      `);
    }


    let isFirst = true;
    let i = 0;
    for (const anchor of this.anchors) {
      if (isFirst === true) {
        isFirst = false;
        i++;
        continue;
      }

      const {name, reference} = scene.getFunction(config.branchIndex, ++index, 'camera-loop');
      const {name: anchorEndName, reference: anchorEndReference} = scene.getFunction(config.branchIndex, ++index, 'camera-anchor-end');


      const {durationTo, position, rotation} = anchor;
      const prevAnchor = this.anchors[i - 1];
      const durationInTicks = Math.round(durationTo * 20);

      const posDelta = VMath.delta(prevAnchor.position, position);
      const posDeltaPerTick = VMath.scalarDivide(posDelta, durationInTicks);

      const rotationxDelta = rotation[0] - prevAnchor.rotation[0];
      const rotationxCounterDelta = (rotationxDelta > 0 ? -1 : 1)*(Math.abs((rotation[0] > 0 ? 180 : -180) - rotation[0]) 
        + Math.abs((prevAnchor.rotation[0] > 0 ? 180 : -180) - prevAnchor.rotation[0]));


      const rotationDelta = [
        Math.abs(rotationxDelta) < Math.abs(rotationxCounterDelta) ? rotationxDelta : rotationxCounterDelta,
        rotation[1] - prevAnchor.rotation[1],
      ] as const;

      const rotationDeltaPerTick = [
        rotationDelta[0] / durationInTicks,
        rotationDelta[1] / durationInTicks,
      ]

      await scene.mkFile(name, `
        execute if score ${scoreHolderName} w.internal matches ..${durationInTicks - 1} run schedule function ${reference} 1t
        execute if score ${scoreHolderName} w.internal matches ${durationInTicks}.. run function ${anchorEndReference}

        execute as @e[tag=w.camera-marker] at @s run tp @s ~${posDeltaPerTick[0]} ~${posDeltaPerTick[1]} ~${posDeltaPerTick[2]} ~${rotationDeltaPerTick[0]} ~${rotationDeltaPerTick[1]}
        execute as @a[tag=w.player] at @s run tp @s ~${posDeltaPerTick[0]} ~${posDeltaPerTick[1]} ~${posDeltaPerTick[2]} ~${rotationDeltaPerTick[0]} ~${rotationDeltaPerTick[1]}
        scoreboard players reset %isRiding w.internal
        execute as @a[tag=w.player] store success score %isRiding w.internal on vehicle if entity @s
        execute unless score %isRiding w.internal matches 1 as @a[tag=w.player] run spectate @e[tag=w.camera-marker,sort=nearest,limit=1] 

        scoreboard players add ${scoreHolderName} w.internal 1
      `);


      await scene.mkFile(anchorEndName, `
        scoreboard players set ${scoreHolderName} w.internal 0

        ${getDimension(firstAnchor.in)}tp @e[tag=w.camera-marker] ${position[0]} ${position[1]} ${position[2]} ${rotation[0]} ${rotation[1]}

        function ${
          i === this.anchors.length - 1
          ? scene.getFunctionReference(config.branchIndex, index + 1)
          : scene.getFunctionReference(config.branchIndex, index + 1, 'camera-loop')
        }
      `);

      i++;
    }

    const {name: endFName, reference: endFReference} = scene.getFunction(config.branchIndex, ++index);


    await scene.mkFile(endFName, `
      #Run after the end of camera scripts
      kill @e[tag=w.camera-marker]
    `);

    return {
      endFunctionIndex: index,
    }
  }
}