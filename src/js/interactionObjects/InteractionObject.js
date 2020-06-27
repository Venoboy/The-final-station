/* eslint-disable linebreak-style */
import Phaser from 'phaser';

export default class InteractionObject extends Phaser.Physics.Matter.Image {
  constructor(scene, x, y, beforeActionTexture, afterActionTexture = beforeActionTexture) {
    super(scene.matter.world, x, y, beforeActionTexture);
    this.scene = scene;
    this.interactionObject = true;
    this.afterActionImage = scene.add.image(x, y, afterActionTexture)
      .setVisible(false);

    const body = this.createCompoundBody();
    this.setCompoundBody(body, x, y);

    this.interactionInfo = {
      type: '',
    };
  }

  createCompoundBody() {
    const { Body, Bodies } = Phaser.Physics.Matter.Matter;
    const { width: w, height: h } = this;
    const sensors = {
      around: Bodies.rectangle(w * 0.5, h * 0.5, w, h, { isSensor: true }),
    };
    const compoundBody = Body.create({
      parts: [sensors.around],
    });
    return compoundBody;
  }

  setCompoundBody(compoundBody, x, y) {
    this
      .setExistingBody(compoundBody)
      .setPosition(x, y);
    this.body.isStatic = true;
    this.scene.add.existing(this);
  }

  activate() {
    this.setPipeline('outline');
    this.pipeline.setFloat2(
      'uTextureSize',
      this.width,
      this.height,
    );
  }

  deactivate() {
    this.resetPipeline();
  }
}
