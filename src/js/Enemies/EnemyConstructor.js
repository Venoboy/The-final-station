import Phaser from 'phaser';
import ENEMY_STATES from './enemyStates';

export default class EnemyConstructor {
  constructor(config) {
    this.scene = config.scene;
    this.player = config.player;
    this.playerBody = config.player.body;
    this.type = config.type;
    this.position = config.position;
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
      attack: Bodies.rectangle(w, h * 0.5, w * 0.5, h * 0.4, { isSensor: true }),
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
      .setPosition(this.x, this.y);

    this.scene.matterCollision.addOnCollideStart({
      objectA: this.sensors.detect,
      objectB: this.player,
      callback: (eventData) => this.onDetect(eventData),
    });

    this.scene.matterCollision.addOnCollideEnd({
      objectA: this.sensors.detect,
      objectB: this.player,
      callback: (eventData) => console.log(eventData),
    });
  }

  onDetect = () => {
    console.log(this.enemy)
    if (this.player.x < this.enemy.x) {
      this.currentSpeed = -this.speed;
    } else {
      this.currentSpeed = this.speed;
    }
  };

  onStopDetect = (eventData) => {};

  update = () => {
    this.enemy.setVelocityX(this.currentSpeed);
  }
}
