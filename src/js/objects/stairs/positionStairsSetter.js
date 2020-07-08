import { setCanGoX } from '../../Player/playerStates/externalParams';
import stairsParams from './stairsParams';
import { sidePlayerSetter } from './sidePlayerSetter';


const positionStairsSetter = (
  playerContainer, playerBody, stairs, distanceMiddle, cursors, scene,
) => {
  const pC = playerContainer;
  // pB - физическое тело
  const pB = playerBody.parts.filter((part) => part.label === 'mainBody')[0];

  const goDownSidesStairs = (playerX) => {
    if (pB.position.y < stairs.bounds.min.y) {
      pC.setPosition(playerX, pB.position.y + pC.height);
      setCanGoX(false);
    } else if (distanceMiddle < stairsParams.ALLOWED_DISTANCE_MIDDLE) {
      // под границей - при залезании снизу
      pC.setPosition(playerX, pB.position.y);
      setCanGoX(false);
    }
  };

  // если еще не на лестнице:
  // если под лестницей и нажато вверх, или над лестницей и вниз
  if ((pB.position.y < stairs.position.y && cursors.down.isDown)
    || (pB.position.y > stairs.position.y && cursors.up.isDown)) {
    // если у центральной лестницы
    if (stairs.label === 'stairs-middle') {
      pC.setPosition(stairs.position.x, pB.position.y);
      setCanGoX(false);

      // если у правой лестницы
    } else if (stairs.label === 'stairs-right') {
      const playerX = stairs.bounds.min.x + pB.centerOffset.x + stairsParams.WIDTH;
      // у правой лестницы и над ее верхней границей, перемещение вниз
      goDownSidesStairs(playerX);
    } else if (stairs.label === 'stairs-left') {
      const playerX = stairs.bounds.max.x - pB.centerOffset.x - stairsParams.WIDTH;
      // у левой лестницы и над ее верхней границей, перемещение вниз
      goDownSidesStairs(playerX);
    }
    // если на лестнице:
    // если верхняя граница тела выше лестницы, а центр ниже верхней границы и нажато вверх
    // слезание над лестницей
  } else if (pB.bounds.min.y <= (stairs.bounds.min.y)
    && (pB.position.y >= stairs.bounds.min.y)
    && cursors.up.isDown) {
    if (stairs.label === 'stairs-right') {
      const finishX = stairs.bounds.min.x - pB.centerOffset.x * pC.scale;
      const finishY = stairs.bounds.min.y - pB.centerOffset.y * pC.scale;
      const positionsEnd = {
        x: finishX,
        y: finishY,
      };
      // pC.setPosition(stairs.bounds.min.x - pB.centerOffset.x * pC.scale,
      //   stairs.bounds.min.y - pB.centerOffset.y * pC.scale);
      sidePlayerSetter(pB, positionsEnd, scene, stairs.label);
      stairsParams.lastStep = true;
    } else if (stairs.label === 'stairs-left') {
      pC.setPosition(stairs.bounds.max.x + pB.centerOffset.x * pC.scale,
        stairs.bounds.min.y - pB.centerOffset.y * pC.scale);
      stairsParams.lastStep = true;
    }
  }
};

export default positionStairsSetter;
