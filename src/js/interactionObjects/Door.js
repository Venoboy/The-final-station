import Phaser from 'phaser';
import InteractionObject from './InteractionObject';
import eventsCenter from '../eventsCenter';

export default class Door extends InteractionObject {
  constructor(config) {
    super(config);
    this.createCompoundBody(config.x, config.y);
    this.interactionInfo.type = 'door';
  }

  createCompoundBody() {
    const { Body, Bodies } = Phaser.Physics.Matter.Matter;
    const { width: w, height: h } = this;
    const mainBody = Bodies.rectangle(w * 0.5, h * 0.5, w, h);
    const sensors = {
      around: Bodies.rectangle(w * 0.5, h * 0.5, w, h, { isSensor: true }),
    };
    const compoundBody = Body.create({
      parts: [mainBody, sensors.around],
    });
    return compoundBody;
  }

  interact() {
    eventsCenter.emit('door-opened', this.id);
    console.log(this.id);
    const info = super.interact();
    return info;
  }
}
