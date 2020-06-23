/* eslint-disable linebreak-style */
import Phaser from 'phaser';
import OutlinePipeline from './OutlinePipeline';

export default class InteractionObject {
  constructor(scene, x, y, beforeActionTexture) {
    this.scene = scene;
    this.x = x;
    this.y = y;
    this.object = this.scene.matter.add.image(
      this.x, this.y, beforeActionTexture, null,
    );
    this.scene.game.renderer.addPipeline('outline', new OutlinePipeline(this.scene.game));

    const { Body, Bodies } = Phaser.Physics.Matter.Matter;
    const { width: w, height: h } = this.object;
    const sensors = {
      around: Bodies.circle(w * 0.5, h * 0.5, 2 * w, { isSensor: true }),
    };
    const compoundBody = Body.create({
      parts: [sensors.around],
    });

    this.object
      .setExistingBody(compoundBody)
      .setPosition(x, y);
    this.object.body.isStatic = true;

    this.object.interactionObject = true;
    this.object.activate = this.activate;
    this.object.deactivate = this.deactivate;
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
