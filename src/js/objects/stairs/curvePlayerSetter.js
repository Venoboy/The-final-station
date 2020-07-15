import Phaser from 'phaser';

import collisionCategories from '../../helpers/collisionCategories';
import { stats } from '../../Player/playerStates/stats';
import { setCanGoX } from '../../Player/playerStates/externalParams';
import stairsParams from './stairsParams';

let isAnimationActive = false;
let player = {};
let scene = {};
let end = {};
let graphics = {};
let follower = {};
let path = {};
let container = {};
let directionUp;

const {
  MIDDLE_POINT_X_OFFSET,
  MIDDLE_POINT_Y_OFFSET,
  GO_DOWN_TIME,
} = stairsParams;


const createAnimation = () => {
  graphics = scene.add.graphics();
  isAnimationActive = true;
  graphics = scene.add.graphics();
  container.setCollidesWith([]);

  follower = { t: 0, vec: new Phaser.Math.Vector2() };

  path = new Phaser.Curves.Path(player.position.x, player.position.y);
  let middlePosX;
  let middlePosY;
  if (directionUp) {
    middlePosX = player.position.x - MIDDLE_POINT_X_OFFSET;
    middlePosY = end.y + MIDDLE_POINT_Y_OFFSET;
  } else {
    middlePosX = end.x - MIDDLE_POINT_X_OFFSET;
    middlePosY = player.position.y + MIDDLE_POINT_Y_OFFSET;
  }

  path.splineTo([middlePosX, middlePosY, end.x, end.y]);

  scene.tweens.add({
    targets: follower,
    t: 1,
    ease: directionUp ? 'Cubic.easeOut' : 'Cubic.easeIn',
    duration: GO_DOWN_TIME,
    yoyo: false,
    repeat: 0,
  });
};

const updateCornersPosition = () => {
  if (!isAnimationActive || Object.keys(graphics).length === 0) {
    return;
  }
  graphics.clear();
  graphics.lineStyle(2, 0xffffff, 1);

  // path.draw(graphics); раскоментировать для отображения линии анимации

  path.getPoint(follower.t, follower.vec);

  graphics.fillStyle(0xff0000, 1);
  container.setPosition(follower.vec.x, follower.vec.y - stats.bodyContainerYOffset);
  if (follower.t === 1) {
    isAnimationActive = false;
    container.setCollidesWith(collisionCategories.ground);
  }
  setCanGoX(false);
};

const curvePlayerSetter = (playerObj, playerContainer, positionsEnd, sceneObj, dirUp) => {
  directionUp = dirUp;
  player = playerObj;
  container = playerContainer;
  end = positionsEnd;
  scene = sceneObj;
  if (!isAnimationActive) {
    createAnimation();
  }
};

export { curvePlayerSetter, updateCornersPosition };
