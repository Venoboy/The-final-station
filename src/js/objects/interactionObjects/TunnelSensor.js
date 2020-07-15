import Phaser from 'phaser';
import collisionCategories from '../../helpers/collisionCategories';

export default class TunnelSensor extends Phaser.Physics.Matter.Image {
  constructor(config) {
    super(config.scene.matter.world, config.x, config.y, config.texture);
    this.scene = config.scene;
    const body = this.createCompoundBody();
    this.setCompoundBody(body, config.x, config.y);

    this.scene.matterCollision.addOnCollideStart({
      objectA: config.collisionBodies,
      objectB: this.sensors.ground,
      callback: this.onGround,
      context: this,
    });
  }

  createCompoundBody() {
    const { Body, Bodies } = Phaser.Physics.Matter.Matter;
    const { width: w, height: h } = this;
    this.sensors = {
      ground: Bodies.rectangle(w * 0.5, h, w, 2, { isSensor: true }),
    };
    const compoundBody = Body.create({
      parts: [this.sensors.ground],
    });
    compoundBody.collisionFilter.category = collisionCategories.ground;
    return compoundBody;
  }

  setCompoundBody(compoundBody, x, y) {
    this
      .setExistingBody(compoundBody)
      .setPosition(x, y);
    this.body.isStatic = true;
    this.scene.add.existing(this);
  }

  onGround() {
    this.scene.tweens.add({
      targets: this,
      alpha: 0,
      duration: 500,
    });
  }
}
