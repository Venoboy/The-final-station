/* eslint-disable linebreak-style */
import InteractionObject from './InteractionObject';

const textConfig = {
  fontFamily: 'font1',
  fontSize: 6,
};

export default class Storage extends InteractionObject {
  constructor(scene, x, y, beforeActionTexture, afterActionTexture, inner) {
    super(scene, x, y, beforeActionTexture, afterActionTexture);
    this.items = inner.items;
    this.renderText = inner.renderText;
    const offset = (this.afterActionImage.width - this.object.width) / 2;
    this.afterActionImage.setX(this.x + offset);
  }

  keyHandler() {
    if (this.object.activated) {
      this.object.destroy(this.scene);
      this.afterActionImage.setVisible(true);
      const text = this.scene.add
        .text(this.x, this.y - 20, this.renderText, textConfig)
        .setOrigin(0.5)
        .setResolution(10);
      const timeline = this.scene.tweens.createTimeline();

      timeline.add({
        targets: text,
        y: text.y - 10,
        duration: 500,
      });
      timeline.add({
        targets: text,
        alpha: 0,
        duration: 500,
        delay: 2000,
      });

      timeline.play();
      timeline.onComplete = () => { text.destroy(); };
    }
  }
}
