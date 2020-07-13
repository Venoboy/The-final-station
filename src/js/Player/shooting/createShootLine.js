import Phaser from 'phaser';

import { groundArray } from '../../objects/ground/groundCreation';
import { enemiesArray } from '../../Enemies/EnemyLoader';

import overlapHandler from './overlapHandler';
import raycast from './matter-raycast';

const SHOOT_DISTANCE = 20;
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
    // const line = new Phaser.Curves.Line([startX, startY, resultPoint.x, resultPoint.y]);
    // const lineVector = line.getTangent();
    const lineAngleRads = Phaser.Math.Angle.Between(startX, startY, pointer.worldX, pointer.worldY);

    // const centerX = (startX + resultPoint.x) / 2;
    // const centerY = (startY + resultPoint.y) / 2;
    // console.log(lineVector);

    // const bullet = scene.matter.add.rectangle(startX, startY, 1, 1,
    //   {
    //     isSensor: false,
    //     ignoreGravity: true,
    //     label: 'bullet',
    //     frictionAir: 0,
    //   });
    // bullet.collisionFilter.group = 1;

    // const worldBodiesArr = scene.matter.getMatterBodies(undefined);
    // console.log(worldBodiesArr);
    const worldBodiesArr = [...groundArray, ...enemiesArray];
    let grounds = [];
    groundArray.forEach((elem) => {
      grounds.push(...elem.vertices);
    });
    grounds = grounds.map((elem) => elem.body);
    console.log(grounds);
    const enemies = worldBodiesArr.filter((body) => body.label === 'enemy body sensor');
    // console.log(enemies);
    const worldBodies = worldBodiesArr.filter((body) => body.label !== 'mainBody'
      && body.label !== 'bullet' && body.isSensor === false);
    let raycols = raycast(grounds, { x: startX, y: startY }, { x: resultPoint.x, y: resultPoint.y });
    raycols = raycols.filter((ray) => ray.body.label !== 'mainBody');
    // console.log(raycols);

    const endX = raycols.length === 0 ? startX : raycols[0].point.x;
    const endY = raycols.length === 0 ? startY : raycols[0].point.y;
    // const { endX, endY } = await overlapHandler(scene, player, bullet, lineAngleRads);
    graphics.lineStyle(1, 0xffffff, 0.4);
    graphics.lineBetween(startX, startY, endX, endY);

    setTimeout(() => {
      // scene.matter.world.remove(shoot);
      // shoot.visible = false;
      graphics.clear();
    }, 200);
  };
  scene.input.on('pointerdown', (pointer) => construct(pointer));
};

export default createShootLine;
