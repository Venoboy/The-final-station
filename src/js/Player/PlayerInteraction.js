import PersonAnimation from './animation/PlayerAnimation';
import { getCanGoX, setCanGoX } from './playerStates/externalParams';
import collisionCategories from '../world/collisionCategories';

import StairsInteraction from '../objects/stairs/StairsInteraction';
import sidesCollisionHandler from './playerStates/sidesCollisionHandler';

// eslint-disable-next-line import/no-mutable-exports
let stairsInteraction = {};

export default class PlayerInteraction {
  constructor(scene) {
    this.playerInstance = {};
    this.player = this.playerInstance.matterEnabledContainer || {};
    this.movingKeysPressed = false;
    this.scene = scene;

    this.PLAYER_SPEED_X = 1.3;
  }

  create() {
    this.playerAnimation = new PersonAnimation(this.scene);
    this.playerInstance = this.playerAnimation.create();

    this.player = this.playerInstance.matterEnabledContainer;
    this.player.setCollisionCategory(collisionCategories.player);
    this.player.setCollidesWith([collisionCategories.ground]);

    this.camera = this.scene.cameras.main;
    this.camera.startFollow(this.player, false, 0.1, 0.1);

    this.cursors = this.scene.cursors;

    const playerInteractionConfig = {
      scene: this.scene,
      cursors: this.cursors,
      playerInstance: this.playerInstance,
    };
    stairsInteraction = new StairsInteraction(playerInteractionConfig);
  }

  update() {
    this.playerAnimation.update(stairsInteraction);
    this.player.body.ignoreGravity = !this.movingKeysPressed
      && this.playerInstance.isTouching.body
      && !this.playerInstance.isTouching.left
      && !this.playerInstance.isTouching.right;

    setCanGoX(true);
    const { canLeft, canRight } = sidesCollisionHandler(this.playerInstance, this.scene);

    stairsInteraction.setStairsOverlap();

    if (this.cursors.left.isDown() && getCanGoX() && canLeft) {
      this.movingKeysPressed = true;
      this.player.setVelocityX(-this.PLAYER_SPEED_X);
    } else if (this.cursors.right.isDown() && getCanGoX() && canRight) {
      this.movingKeysPressed = true;
      this.player.setVelocityX(this.PLAYER_SPEED_X);
    } else {
      this.movingKeysPressed = false;
      this.player.setVelocityX(0);
    }

    stairsInteraction.controlYMovement();
  }
}

export { stairsInteraction };
