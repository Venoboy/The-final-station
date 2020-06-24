/* eslint-disable linebreak-style */
import InteractionObject from './InteractionObject';

const textConfig = {
  fontFamily: 'font1',
  fontSize: 6,
};

export default class Storage extends InteractionObject {
  constructor(scene, x, y, beforeActionTexture, afterActionTexture, items) {
    super(scene, x, y, beforeActionTexture, afterActionTexture);
    this.items = items;

    const offset = (this.afterActionImage.width - this.object.width) / 2;
    this.afterActionImage.setX(this.x + offset);
  }

  generateText() {
    const items = this.items.reduce((res, item) => `${res + item.name}\n`, '');
    const quantities = this.items.reduce((res, item) => `${res + item.quantity}\n`, '');
    const itemsText = this.scene.add.text(0, 0, items, textConfig);
    itemsText.setResolution(10);
    itemsText.setOrigin(0.5);
    // eslint-disable-next-line max-len
    const quantityText = this.scene.add.text(itemsText.width, 0, quantities, textConfig);
    quantityText.setResolution(10);
    quantityText.setOrigin(0.5);
    return [itemsText, quantityText];
  }

  keyHandler() {
    if (this.object.activated) {
      this.object.destroy(this.scene);
      this.afterActionImage.setVisible(true);

      const textItems = this.generateText();
      const container = this.scene.add.container(this.x, this.y - 20, textItems);
      const timeline = this.scene.tweens.createTimeline();

      timeline.add({
        targets: container,
        y: container.y - 10,
        duration: 500,
      });
      timeline.add({
        targets: container,
        alpha: 0,
        duration: 500,
        delay: 2000,
      });

      timeline.play();
      timeline.onComplete = () => { container.destroy(); };
    }
  }
}
