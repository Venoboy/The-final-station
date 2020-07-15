import { groundArray } from '../../objects/ground/groundCreation';
import { doors, lids } from '../../scenes/gameScene/sceneSetters';

const sidesCollisionHandler = (playerInstance, scene) => {
  let canGoLeft = true;
  let canGoRight = true;
  let canGoDown = true;
  const leftSensor = playerInstance.sensors.left;
  const rightSensor = playerInstance.sensors.right;
  const groundSensor = playerInstance.sensors.bottom;
  const currentDoors = doors.filter((door) => door.body !== undefined);

  const overlapHandler = (bodyA) => {
    if (leftSensor === bodyA) {
      canGoLeft = false;
    } else if (rightSensor === bodyA) {
      canGoRight = false;
    }
  };

  const downHandler = () => {
    canGoDown = false;
  };

  const currentLids = lids.filter((lid) => lid.body !== undefined);
  const objectPreventDown = [...groundArray, ...currentLids];

  scene.matter.overlap(groundSensor, objectPreventDown, downHandler);

  scene.matter.overlap(
    [leftSensor, rightSensor],
    [...currentDoors, ...groundArray],
    overlapHandler,
  );

  return {
    canLeft: canGoLeft,
    canRight: canGoRight,
    canDown: canGoDown,
  };
};

export default sidesCollisionHandler;
