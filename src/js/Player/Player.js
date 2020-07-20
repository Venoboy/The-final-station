import Phaser from 'phaser';
import ObjectInteraction from './ObjectInteraction';
import { stats } from './playerStates/stats';

export default class Player {
  constructor(scene, x, y, container) {
    this.h = stats.playerSizes.h;
    this.w = stats.playerSizes.w;

    const { Body, Bodies } = Phaser.Physics.Matter.Matter;
    this.mainBody = Bodies.rectangle(0, this.h * 0.09, this.w * 0.25, this.h * 0.5,
      {
        chamfer: { radius: 6 },
        label: 'mainBody',
      });
    this.sensors = {
      bottom: Bodies.rectangle(0, this.h * 0.34, this.w * 0.1, 1, { isSensor: true }),
      stairs: Bodies.rectangle(0, this.h * 0.33, this.w * 0.45, 1, { isSensor: true }),
      left: Bodies.rectangle(-(this.w * 0.12), 1, 2, this.h * 0.15, { isSensor: true }),
      right: Bodies.rectangle(this.w * 0.12, 1, 2, this.h * 0.15, { isSensor: true }),
      objectSensor: Bodies.rectangle(0, 0, this.w * 0.4, this.h * 0.45, { isSensor: true }),
      around: Bodies.rectangle(0, 0, this.w * 0.15, this.h * 0.3, { isSensor: true }),
      body: Bodies.rectangle(0, 0, this.w * 0.15, this.h * 0.3,
        {
          chamfer: { radius: 6 },
          isSensor: true,
        }),
    };
    const compoundBody = Body.create({
      parts: [
        this.mainBody,
        this.sensors.bottom,
        this.sensors.stairs,
        this.sensors.left,
        this.sensors.right,
        this.sensors.around,
        this.sensors.objectSensor,
        this.sensors.body,
      ],
      frictionStatic: 0.1,
      frictionAir: 0.02,
      friction: 0.1,
    });

    this.matterEnabledContainer = scene.matter.add.gameObject(container);
    this.matterEnabledContainer
      .setExistingBody(compoundBody)
      .setFixedRotation()
      .setPosition(x, y);

    this.isTouching = {
      left: false,
      right: false,
      ground: false,
      body: false,
    };

    scene.matter.world.on('beforeupdate', this.resetTouching, this);

    scene.matterCollision.addOnCollideStart({
      objectA: [
        this.sensors.bottom,
        this.sensors.left,
        this.sensors.right,
        this.mainBody,
      ],
      callback: this.onSensorCollide,
      context: this,
    });
    scene.matterCollision.addOnCollideActive({
      objectA: [
        this.sensors.bottom,
        this.sensors.left,
        this.sensors.right,
        this.mainBody,
      ],
      callback: this.onSensorCollide,
      context: this,
    });

    this.objectInteraction = new ObjectInteraction(scene, this);
  }

  onSensorCollide({ bodyA, bodyB }) {
    if (bodyB.isSensor) return; // We only care about collisions with physical objects
    if (bodyA === this.sensors.left) {
      this.isTouching.left = true;
    } else if (bodyA === this.sensors.right) {
      this.isTouching.right = true;
    } else if (bodyA === this.sensors.bottom) {
      this.isTouching.ground = true;
    } else if (bodyA === this.mainBody) {
      this.isTouching.body = true;
    }
  }

  resetTouching() {
    this.isTouching.left = false;
    this.isTouching.right = false;
    this.isTouching.ground = false;
    this.isTouching.body = false;
  }
}
