/* eslint-disable linebreak-style */
import { updateUI } from '../interface/UIHelpers';

export default class ObjectInteraction {
  constructor(scene, player) {
    this.scene = scene;
    this.player = player;
    this.activatedObject = null;

    scene.matterCollision.addOnCollideStart({
      objectA: [this.player.sensors.objectSensor],
      callback: this.onObjectCollide,
      context: this,
    });
    scene.matterCollision.addOnCollideEnd({
      objectA: [this.player.sensors.objectSensor],
      callback: this.onObjectCollideEnd,
      context: this,
    });

    this.interactKey = this.scene.input.keyboard.addKey('E');
    this.interactKey.on('up', this.interact, this);
  }

  onObjectCollide(bodies) {
    if (bodies.bodyB.gameObject) {
      if (bodies.bodyB.gameObject.interactionObject) {
        bodies.bodyB.gameObject.activate();
        this.activatedObject = bodies.bodyB.gameObject;
      }
    }
  }

  onObjectCollideEnd(bodies) {
    if (bodies.bodyB.gameObject) {
      if (bodies.bodyB.gameObject.interactionObject) {
        bodies.bodyB.gameObject.deactivate();
        this.activatedObject = null;
      }
    }
  }

  interact() {
    if (this.activatedObject) {
      const interactionInfo = this.activatedObject.interact();
      this.processInteraction(interactionInfo);
    }
  }

  processInteraction(info) {
    if (info.type === 'storage') {
      info.items.forEach((item) => {
        this.player[item.name] += item.quantity;
        updateUI(item.name, this.player[item.name]);
      });
    }
  }
}
