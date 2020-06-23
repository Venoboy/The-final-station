/* eslint-disable linebreak-style */
import Phaser from 'phaser';
import InteractionObject from './InteractionObject';

export default class Door extends InteractionObject {
  constructor(scene, x, y, beforeActionTexture, afterActionTexture) {
    super(scene, x, y, beforeActionTexture, afterActionTexture);

    const { Body, Bodies } = Phaser.Physics.Matter.Matter;
    const { width: w, height: h } = this.object;
    const mainBody = Bodies.rectangle(w * 0.5, h * 0.5, w, h);
    const sensors = {
      around: Bodies.rectangle(w * 0.5, h * 0.5, w, h, { isSensor: true }),
    };
    const compoundBody = Body.create({
      parts: [mainBody, sensors.around],
    });

    this.object
      .setExistingBody(compoundBody)
      .setPosition(this.x, this.y);
    this.object.body.isStatic = true;
  }

  keyHandler() {
    if (this.object.activated) {
      this.object.destroy(this.scene);
      this.afterActionImage.setVisible(true);
    }
  }
}
