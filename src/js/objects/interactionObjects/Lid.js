import Phaser from 'phaser';
import InteractionObject from './InteractionObject';
import eventsCenter from '../../eventsCenter';
import collisionCategories from '../../world/collisionCategories';

export default class Door extends InteractionObject {
  constructor(config) {
    super(config);
    this.createCompoundBody(config.x, config.y);
    this.interactionInfo.type = 'door';
    if (this.sound) {
      this.sound.volume = 0.2;
    }
  }

  createCompoundBody() {
    const { Body, Bodies } = Phaser.Physics.Matter.Matter;
    const { width: w, height: h } = this;
    const mainBody = Bodies.rectangle(w * 0.5, h * 0.5 + 2, w, 2);
    const sensors = {
      around: Bodies.rectangle(w * 0.5, h * 0.5, w, h, { isSensor: true }),
    };
    const compoundBody = Body.create({
      parts: [mainBody, sensors.around],
    });
    compoundBody.collisionFilter.category = collisionCategories.ground;
    return compoundBody;
  }

  interact() {
    eventsCenter.emit('lid-opened', this.id);
    const info = super.interact();
    return info;
  }
}
