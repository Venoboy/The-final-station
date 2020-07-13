import Phaser from 'phaser';

import defineEndPoint from './defineEndPoint';


const SHOOT_DISTANCE = 220;
const SHOOT_LINE_START_ALPHA = 0.4;
const SHOOT_LINE_END_ALPHA = 0.1;
const SHOOT_DURATION = 300;
const SHOOT_LINE_WIDTH = 0.3;
const SHOOT_LINE_COLOR = 0xffffff;

const getBetween = Phaser.Math.Distance.Between;


const getResultPoint = (startX, startY, finishX, finishY) => {
  const mouseDistance = getBetween(startX, startY, finishX, finishY) || 1;
  const sizeCoeff = SHOOT_DISTANCE / mouseDistance;
  const diffX = finishX - startX;
  const diffY = finishY - startY;
  const x = startX + diffX * sizeCoeff;
  const y = startY + diffY * sizeCoeff;
  return {
    x,
    y,
  };
};

const createShootLine = (scene, person) => {
  const construct = (pointer) => {
    const graphics = scene.add.graphics();
    const player = person;
    const startX = player.x;
    const startY = player.y;
    const resultPoint = getResultPoint(startX, startY, pointer.worldX, pointer.worldY);

    // вставить функцию проверки обоймы

    const { endX, endY } = defineEndPoint(scene, startX, startY, resultPoint);

    graphics.lineStyle(SHOOT_LINE_WIDTH, SHOOT_LINE_COLOR, SHOOT_LINE_START_ALPHA);
    const line = graphics.lineBetween(startX, startY, endX, endY);
    const updateShootLine = (tween) => {
      const value = tween.getValue();
      line.setAlpha(value);
      if (value === SHOOT_LINE_END_ALPHA) {
        graphics.clear();
      }
    };
    scene.tweens.addCounter({
      from: SHOOT_LINE_START_ALPHA,
      to: SHOOT_LINE_END_ALPHA,
      duration: SHOOT_DURATION,
      onUpdate: updateShootLine,
    });


    setTimeout(() => {
      // scene.matter.world.remove(shoot);
      // shoot.visible = false;
      // graphics.clear();
    }, 200);
  };
  scene.input.on('pointerdown', (pointer) => construct(pointer));
};

export default createShootLine;
