import Phaser from 'phaser';

import defineEndPoint from './defineEndPoint';
import { stats } from '../playerStates/stats';
import { leftAngle, rightAngle } from '../../helpers/setMaxAngle';
import ShootDisplay from './ShootDisplay';


const SHOOT_DISTANCE = 220;
const SHOOT_LINE_START_ALPHA = 0.4;
const SHOOT_LINE_END_ALPHA = 0.1;
const SHOOT_DURATION = 300;
const SHOOT_LINE_WIDTH = 0.3;
const SHOOT_LINE_COLOR = 0xffffff;
const GUN_OFFSET = 1.2;
const { MAX_ANGLE } = stats;

const getBetween = Phaser.Math.Distance.Between;


const getResultPoint = (startX, startY, finishX, finishY) => {
  const mouseDistance = getBetween(startX, startY, finishX, finishY) || 1;
  const sizeCoeff = SHOOT_DISTANCE / mouseDistance;
  const diffX = finishX - startX;
  const diffY = finishY - startY;
  const resultPoint = {
    x: startX + diffX * sizeCoeff,
    y: startY + diffY * sizeCoeff,
  };
  const radius = getBetween(startX, startY, resultPoint.x, resultPoint.y);
  const currentAngle = Phaser.Math.Angle.Between(startX, startY, resultPoint.x, resultPoint.y);
  const testCircle = new Phaser.Geom.Circle(startX, startY, radius);
  let angle;
  if (startX < finishX) {
    angle = leftAngle(currentAngle, MAX_ANGLE);
  } else {
    angle = rightAngle(currentAngle, MAX_ANGLE);
  }
  Phaser.Geom.Circle.CircumferencePoint(testCircle, angle, resultPoint);

  return resultPoint;
};

const createShootLine = (scene, person) => {
  const holder = new ShootDisplay(scene, person);
  const construct = (pointer) => {
    const graphics = scene.add.graphics();
    const shootSound = scene.sound.add('pistolShoot');
    const player = person;
    const startX = player.x;
    const startY = player.y - GUN_OFFSET;
    const resultPoint = getResultPoint(startX, startY, pointer.worldX, pointer.worldY);

    // вставить функцию проверки обоймы
    const canShoot = holder.shoot();
    if (!canShoot) {
      return;
    }
    shootSound.play();
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
  };
  scene.input.on('pointerdown', (pointer) => construct(pointer));
  const reloadKey = scene.input.keyboard.addKey('R');
  reloadKey.on('up', holder.reload, holder);
};

export default createShootLine;
