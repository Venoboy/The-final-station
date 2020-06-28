import Phaser from 'phaser';
import ENEMY_STATES from './enemyStates';

export default class EnemyConstructor {
  constructor(config) {
    this.scene = config.scene;
    this.type = config.type;
    this.position = config.position;
    this.state = ENEMY_STATES.standing;
    this.x = config.position.x;
    this.y = config.position.y;
    this.enemy = this.scene.matter.add
      .image(this.x, this.y, config.stringId);

    const { Body, Bodies } = Phaser.Physics.Matter.Matter;
    const { width: w, height: h } = this.enemy;
    this.mainBody = Bodies.rectangle(w * 0.5, h * 0.5, w, h, { chamfer: { radius: 6 } });
    this.sensors = {
      attack: Bodies.rectangle(w, h * 0.5, w * 0.5, h * 0.4, { isSensor: true }),
      detect: Bodies.rectangle(w * 0.5, h * 0.5, w * 4, h * 0.5, { isSensor: true }),
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
  }
}
