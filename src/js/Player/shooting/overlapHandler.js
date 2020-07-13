import collisionCategories from '../../world/collisionCategories';

const checkCollide = (...overlapInfo) => {
  let bodyA;
  let bodyB;
  let pair;
  if (overlapInfo.length > 1) {
    [bodyA, bodyB, pair] = overlapInfo;
  } else {
    bodyA = overlapInfo[0].bodyA;
    bodyB = overlapInfo[0].bodyB;
    pair = overlapInfo[0].pair;
  }

  const isPlayerEnemyBody = bodyB.label === 'mainBody' || bodyB.label === 'enemy body';
  const isEnemy = bodyB.label === 'enemy body sensor';
  const isBulletStopObj = bodyB.isSensor === false;
  if (isBulletStopObj) {
    bodyA.scene.matter.setVelocity(bodyA, 0, 0);
    // console.log(bodyA);
    setTimeout(() => {
      bodyA.resolveFn({
        endX: bodyA.position.x,
        endY: bodyA.position.y,
      });
      bodyA.scene.matter.world.remove(bodyA);
    }, 10);
  }
  if (isEnemy) {
    bodyA.resolveFn({
      endX: bodyB.position.x,
      endY: bodyB.position.y,
    });
  }
};

const overlapHandler = async (scene, player, bulletObj, lineAngleRads) => (
  new Promise((resolve) => {
    const bullet = bulletObj;
    bullet.resolveFn = resolve;
    bullet.scene = scene;

    bullet.collisionFilter.category = collisionCategories.enemies;
    scene.matterCollision.addOnCollideStart({
      objectA: bullet,
      callback: checkCollide,
    });
    scene.matter.applyForceFromAngle(bullet, 0.00003, lineAngleRads);
  })
);

export default overlapHandler;
