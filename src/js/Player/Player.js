import Phaser from 'phaser';

export default class Player {
  constructor(scene, x, y) {
    this.scene = scene;

    // Create the physics-based player that we will move around and animate
    this.player = scene.matter.add.image(x, y, 'hero');
    this.player.setDensity(10);

    const { Body, Bodies } = Phaser.Physics.Matter.Matter;
    const { width: w, height: h } = this.player;
    const mainBody = Bodies.rectangle(w * 0.5, h * 0.5, w, h, { chamfer: { radius: 6 } });
    this.sensors = {
      bottom: Bodies.rectangle(w * 0.5, h, w * 0.25, 2, { isSensor: true }),
      left: Bodies.rectangle(0, h * 0.5, 2, h * 0.5, { isSensor: true }),
      right: Bodies.rectangle(w, h * 0.5, 2, h * 0.5, { isSensor: true }),
    };
    const compoundBody = Body.create({
      parts: [mainBody, this.sensors.bottom, this.sensors.left, this.sensors.right],
      frictionStatic: 0.5,
      frictionAir: 0.02,
      friction: 0.1,
      // slop: 0.2,
    });

    this.player
      .setExistingBody(compoundBody)
      .setScale(0.5)
      .setFixedRotation()
      .setPosition(x, y);
  }
}
