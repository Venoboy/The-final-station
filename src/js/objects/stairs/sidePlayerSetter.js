import Phaser from 'phaser';

let isAnimationActive = false;
const MIDDLE_POINT_X_OFFSET = 4;
const MIDDLE_POINT_Y_OFFSET = 4;
let player = {};
let scene = {};
let positions = {};
let direction = '';
let graphics = {};
let follower = {};
let path = {};


const createAnimation = () => {
  isAnimationActive = true;
  scene.graphics = this.add.graphics();

  scene.follower = { t: 0, vec: new Phaser.Math.Vector2() };

  scene.path = new Phaser.Curves.Path(positions.start.x, positions.start.y);

  const middlePosX = positions.end.x - MIDDLE_POINT_X_OFFSET;
  const middlePosY = positions.start.y - MIDDLE_POINT_Y_OFFSET;

  scene.path.splineTo([middlePosX, middlePosY, positions.end.x, positions.end.y]);

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
  if (follower.t === 1) {
    isAnimationActive = false;
  }
  graphics.clear();
  graphics.lineStyle(2, 0xffffff, 1);

  path.draw(this.graphics);

  path.getPoint(this.follower.t, this.follower.vec);

  graphics.fillStyle(0xff0000, 1);
  graphics.fillCircle(this.follower.vec.x, this.follower.vec.y, 3);
};

const sidePlayerSetter = (playerObj, positionsObj, sceneObj, directionStr) => {
  player = playerObj;
  positions = positionsObj;
  scene = sceneObj;
  direction = directionStr;
  if (!isAnimationActive) {
    createAnimation();
  }
};

export { sidePlayerSetter, updateCornersPosition };
