import Phaser from 'phaser';

let isAnimationActive = false;
const MIDDLE_POINT_X_OFFSET = 4;
const MIDDLE_POINT_Y_OFFSET = 4;
let player = {};
let scene = {};
let end = {};
let direction = '';
let graphics = {};
let follower = {};
let path = {};


const createAnimation = () => {
  console.log('createAnim', scene);
  graphics = scene.add.graphics();
  isAnimationActive = true;
  graphics = scene.add.graphics();

  follower = { t: 0, vec: new Phaser.Math.Vector2() };

  path = new Phaser.Curves.Path(player.position.x, player.position.y);

  const middlePosX = end.x - MIDDLE_POINT_X_OFFSET;
  const middlePosY = player.position.y - MIDDLE_POINT_Y_OFFSET;

  path.splineTo([middlePosX, middlePosY, end.x, end.y]);

  scene.tweens.add({
    targets: scene.follower,
    t: 1,
    ease: 'Cubic.easeIn',
    duration: 3000,
    yoyo: false,
    repeat: 0,
  });
};

const updateCornersPosition = () => {
  if (Object.keys(graphics).length !== 0) {
    if (follower.t === 1) {
      isAnimationActive = false;
    }
    graphics.clear();
    graphics.lineStyle(2, 0xffffff, 1);

    path.draw(graphics);

    path.getPoint(follower.t, follower.vec);

    graphics.fillStyle(0xff0000, 1);
    graphics.fillCircle(follower.vec.x, follower.vec.y, 3);
  }
};

const sidePlayerSetter = (playerObj, positionsEnd, sceneObj, directionStr) => {
  player = playerObj;
  end = positionsEnd;
  scene = sceneObj;
  direction = directionStr;
  if (!isAnimationActive) {
    createAnimation();
  }
};

export { sidePlayerSetter, updateCornersPosition };
