/* eslint-disable linebreak-style */
import Phaser from 'phaser';

export default class InteractionObject {
  constructor(scene, x, y, beforeActionTexture, afterActionTexture = beforeActionTexture) {
    this.scene = scene;
    this.x = x;
    this.y = y;
    this.afterActionImage = this.scene.add.image(this.x, this.y, afterActionTexture)
      .setVisible(false);
    this.object = this.scene.matter.add.image(
      this.x, this.y, beforeActionTexture, null,
    );
    this.object.interactionObject = true;
    this.object.activated = false;
    this.object.activate = this.activate;
    this.object.deactivate = this.deactivate;

    const { Body, Bodies } = Phaser.Physics.Matter.Matter;
    const { width: w, height: h } = this.object;
    const sensors = {
      around: Bodies.rectangle(w * 0.5, h * 0.5, w, h, { isSensor: true }),
    };
    const compoundBody = Body.create({
      parts: [sensors.around],
    });

    this.object
      .setExistingBody(compoundBody)
      .setPosition(this.x, this.y);
    this.object.body.isStatic = true;

    this.actionKey = this.scene.input.keyboard.addKey('E');
    this.actionKey.on('up', this.keyHandler, this);

    // const { Body, Bodies } = Phaser.Physics.Matter.Matter;
    // const { width: w, height: h } = this.object;
    // const sensors = {
    //   around: Bodies.circle(w * 0.5, h * 0.5, 2 * w, { isSensor: true }),
    // };
    // const compoundBody = Body.create({
    //   parts: [sensors.around],
    // });

    // this.object
    //   .setExistingBody(compoundBody)
    //   .setPosition(x, y);
    // this.object.body.isStatic = true;
  }

  activate() {
    this.activated = true;
    this.setPipeline('outline');
    this.pipeline.setFloat2(
      'uTextureSize',
      this.width,
      this.height,
    );
  }

  deactivate() {
    this.activated = false;
    this.resetPipeline();
  }
}
