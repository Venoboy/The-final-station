/* eslint-disable linebreak-style */
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

  onObjectCollide({ bodyA, bodyB }) {
    if (bodyB.gameObject) {
      if (bodyB.gameObject.interactionObject) {
        bodyB.gameObject.activate();
        this.activatedObject = bodyB.gameObject;
      }
    }
  }

  onObjectCollideEnd({ bodyA, bodyB }) {
    if (bodyB.gameObject) {
      if (bodyB.gameObject.interactionObject) {
        bodyB.gameObject.deactivate();
        this.activatedObject = null;
      }
    }
  }

  interact() {
    if (this.activatedObject) {
      this.activatedObject.interact();
    }
  }
}
