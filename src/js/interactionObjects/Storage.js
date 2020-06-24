/* eslint-disable linebreak-style */
import InteractionObject from './InteractionObject';

export default class Storage extends InteractionObject {
  constructor(scene, x, y, beforeActionTexture, afterActionTexture, inner) {
    super(scene, x, y, beforeActionTexture, afterActionTexture);
    this.inner = inner;
  }

  keyHandler() {
    if (this.object.activated) {
      this.object.destroy(this.scene);
      this.afterActionImage.setVisible(true);
    }
  }
}
