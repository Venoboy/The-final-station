import Phaser from 'phaser';
import ENEMY_STATES from './enemyStates';
import collisionCategories from '../world/collisionCategories';

export default class EnemyConstructor {
  constructor(config) {
    this.config = config;
    this.scene = config.scene;
    this.playerInstance = config.playerInstance;
    this.player = this.playerInstance.player;
    this.type = config.type;
    this.position = config.position;
    this.collisionCategory = config.collisionCategory;
    this.state = ENEMY_STATES.standing;
    this.speed = config.settings.speed;
    this.currentSpeed = 0;
    this.x = config.position.x;
    this.y = config.position.y;
    this.enemy = this.scene.matter.add
      .image(this.x, this.y, config.stringId);

    const { Body, Bodies } = Phaser.Physics.Matter.Matter;
    const { width: w, height: h } = this.enemy;
    this.mainBody = Bodies.rectangle(w * 0.5, h * 0.5 + 1, 6, 18, { chamfer: { radius: 2 } });
    this.sensors = {
      attack: Bodies.rectangle(w * 0.5, h * 0.5, w * 0.9, h * 0.4, { isSensor: true }),
      detect: Bodies.rectangle(w * 0.5, h * 0.5, w * 3, h * 0.5, { isSensor: true }),
    };
    const compoundBody = Body.create({
      parts: [this.mainBody, this.sensors.attack, this.sensors.detect],
      frictionStatic: 0.1,
      frictionAir: 0.02,
      friction: 0.1,
    });

    this.enemy
      .setExistingBody(compoundBody)
      .setScale(1)
      .setFixedRotation()
      .setPosition(this.x, this.y)
      .setCollisionCategory(this.collisionCategory)
      .setCollisionGroup(config.collisionGroup)
      .setCollidesWith([collisionCategories.ground]);
  }

  onDetect = () => {
    if (this.player.x < this.enemy.x - 1) {
      this.currentSpeed = -this.speed;
    } else if (this.player.x > this.enemy.x + 1) {
      this.currentSpeed = this.speed;
    } else {
      this.currentSpeed = 0;
    }
  };

  enemyStairsOverlap = (bodyA, bodyB) => {
    if (bodyA.position.y < bodyB.position.y) {
      this.enemy.setCollidesWith([collisionCategories.ground, collisionCategories.stairs]);
    }
  };

  update = () => {
    this.enemy.setCollidesWith([collisionCategories.ground]);
    this.enemy.body.ignoreGravity = false;
    this.currentSpeed = 0;
    this.scene.matter.overlap(this.sensors.detect, this.playerInstance.sensors.body, this.onDetect);
    this.scene.matter.overlap(this.enemy, this.config.stairsArray, this.enemyStairsOverlap);
    this.enemy.setVelocityX(this.currentSpeed);
  }
}
