import stairsParams from './stairsParams';
import { curvePlayerSetter } from './curvePlayerSetter';
import { setCanGoX } from '../../Player/playerStates/externalParams';
import { stats } from '../../Player/playerStates/stats';
import { lids } from '../../setters/level0';


const positionStairsSetter = (config) => {
  const {
    playerInstance,
    playerContainer,
    playerBody,
    stairs,
    distanceMiddle,
    cursors,
    scene,
  } = config;
  const pC = playerContainer;
  // pB - физическое тело
  const pB = playerBody.parts.filter((part) => part.label === 'mainBody')[0];
  const playerLowBoundOverStairs = pB.bounds.max.y < stairs.bounds.min.y
    + stairsParams.LAST_STEP_LENGTH;
  const playerAtSideStairsX = stairs.bounds.min.x + pB.centerOffset.x + stairsParams.WIDTH;

  const DEEP_COEFFICIENT = 1.5; // (0-2) глубина спуска анимации. >1 ниже, <1 выше
  const downDeep = pB.centerOffset.y * DEEP_COEFFICIENT;

  const isLidsOverlap = () => {
    const currentLids = lids.filter((lid) => lid.body !== undefined);
    return scene.matter.overlap(playerContainer, currentLids);
  };

  const goStairsFromBottom = distanceMiddle < stairsParams.ALLOWED_DISTANCE_MIDDLE
    && playerInstance.isTouching.ground
    && !isLidsOverlap();

  // игрок над боковой лестницей, перемещение на лестницу вниз
  const goDownSidesStairs = () => {
    if (stairs.label === 'stairs-right') {
      if (playerLowBoundOverStairs && !isLidsOverlap()) {
        const finishX = playerAtSideStairsX;
        const finishY = pB.position.y + downDeep;
        const positionsEnd = {
          x: finishX,
          y: finishY,
        };
        curvePlayerSetter(pB, pC, positionsEnd, scene, false);
        setCanGoX(false);
      }
    }
  };

  // игрок готов вылезти наверх лестницы
  const goUpSideStairs = () => {
    if (stairs.label === 'stairs-right') {
      const finishX = stairs.bounds.min.x - pB.centerOffset.x * pC.scale;
      const finishY = stairs.bounds.min.y - pB.centerOffset.y * pC.scale;
      const positionsEnd = {
        x: finishX,
        y: finishY,
      };
      curvePlayerSetter(pB, pC, positionsEnd, scene, true);
      stairsParams.lastStep = true;
    }
  };

  // залезть на лесницу снизу
  if (goStairsFromBottom && cursors.up.isDown) {
    if (stairs.label === 'stairs-middle') {
      pC.setPosition(stairs.position.x, pB.position.y - stats.bodyContainerYOffset);
      setCanGoX(false);
    }
    if (stairs.label === 'stairs-right') {
      pC.setPosition(playerAtSideStairsX, pB.position.y - stats.bodyContainerYOffset);
      setCanGoX(false);
    }
  }

  // залезть на центральную лестницу сверху
  const isPlayerOverMiddleStairs = playerLowBoundOverStairs
    && stairs.label === 'stairs-middle'
    && cursors.down.isDown;
  if (isPlayerOverMiddleStairs && !isLidsOverlap()) {
    const yPosition = pB.position.y - stats.bodyContainerYOffset + stairsParams.LAST_STEP_LENGTH;
    pC.setPosition(stairs.position.x, yPosition);
    setCanGoX(false);
  }

  // залезть на боковую лестницу сверху
  const isPlReadyAnimateDown = playerLowBoundOverStairs
    && cursors.down.isDown
    && stairs.label === 'stairs-right';
  if (isPlReadyAnimateDown) {
    goDownSidesStairs();
  }
  // вылезти наверх боковой лестницы
  const isPlReadyAnimateUp = (pB.bounds.max.y - downDeep >= stairs.bounds.min.y - 1
    && pB.bounds.max.y - downDeep <= stairs.bounds.min.y + 1)
    && cursors.up.isDown;
  if (isPlReadyAnimateUp) {
    goUpSideStairs();
    setCanGoX(false);
  }
};

export default positionStairsSetter;
