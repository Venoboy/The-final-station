/* eslint-disable linebreak-style */
import OutlinePipeline from './OutlinePipeline';

export default class InteractionObject {
  constructor(scene, x, y, beforeActionTexture, afterActionTexture) {
    this.scene = scene;
    this.x = x;
    this.y = y;
    this.afterActionTexture = afterActionTexture;
    this.object = this.scene.matter.add.image(
      this.x, this.y, beforeActionTexture, null,
    );
    this.scene.game.renderer.addPipeline('outline', new OutlinePipeline(this.scene.game));
    this.object.interactionObject = true;
    this.object.activated = false;
    this.object.activate = this.activate;
    this.object.deactivate = this.deactivate;

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
