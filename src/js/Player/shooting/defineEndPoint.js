import Phaser from 'phaser';

import raycast from './matter-raycast';
import { enemyDamage } from '../../Enemies/enemyDamage';

let isFounded = false;
const DIVIDE_PARTS = 500;
const SceneObj = {
  scene: {}
}

const rayColsFinder = (worldBodiesArr, currentStartX, currentStartY, out) => {
  let raycols = raycast(
    worldBodiesArr,
    { x: currentStartX, y: currentStartY },
    { x: out.x, y: out.y },
  );

  raycols = raycols.filter((ray) => {
    const isMainBody = ray.body.label === 'mainBody';
    const isSensor = ray.body.isSensor === true && ray.body.label !== 'enemy body sensor';
    const isStairs = ray.body.label === 'stairs-middle' || ray.body.label === 'stairs-left'
      || ray.body.label === 'stairs-right';
    return !isMainBody && !isSensor && !isStairs;
  });

  if (raycols[0]) {
    const isEnemy = raycols[0].body.label === 'enemy body sensor' || raycols[0].body.label === 'enemy body';
    if (isEnemy) {
      const isEnemyDead = raycols[0].body.parent.gameObject.getData('health') <= 0;
      if (!isEnemyDead) {
        enemyDamage(raycols[0].body.parent.gameObject, currentStartX, SceneObj);
      } else {
        raycols[0].point.x = null;
        raycols[0].point.y = null;
      }
    }
  }


  const x = raycols.length === 0 ? null : raycols[0].point.x;
  const y = raycols.length === 0 ? null : raycols[0].point.y;

  return {
    x,
    y,
  };
};

const continuousExtension = (worldBodiesArr, startX, startY, resultPoint) => {
  let t = 0;
  const step = 1 / DIVIDE_PARTS;
  const line = new Phaser.Curves.Line([startX, startY, resultPoint.x, resultPoint.y]);
  let currentStartX = startX;
  let currentStartY = startY;
  const out = new Phaser.Math.Vector2();
  let cross = {
    x: null,
    y: null,
  };
  while (!isFounded && t <= 1) {
    line.getPoint(t, out);
    cross = rayColsFinder(worldBodiesArr, currentStartX, currentStartY, out);
    currentStartX = out.x;
    currentStartY = out.y;
    t += step;
    if (cross.x !== null) {
      isFounded = true;
    }
  }
  return cross;
};

const defineEndPoint = (scene, startX, startY, resultPoint) => {
  SceneObj.scene = scene;
  const worldBodiesArr = scene.matter.getMatterBodies(undefined);
  let { x, y } = continuousExtension(worldBodiesArr, startX, startY, resultPoint);
  isFounded = false;
  if (x === null) {
    x = resultPoint.x;
    y = resultPoint.y;
  }
  return {
    endX: x,
    endY: y,
  };
};

export default defineEndPoint;
