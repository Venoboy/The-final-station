import { setCanGoX } from '../../Player/playerStates/externalParams';
import sidesCollisionHandler from '../../Player/playerStates/sidesCollisionHandler';
import positionStairsSetter from './positionStairsSetter';
import { updateCornersPosition } from './curvePlayerSetter';
import { stairsArray } from './stairsCreation';
import stairsParams from './stairsParams';

export default class StairsInteraction {
  constructor(config) {
    this.playerInstance = config.playerInstance;
    this.player = this.playerInstance.matterEnabledContainer;
    this.cursors = config.cursors;
    this.scene = config.scene;
    this.isPlayerOnPosition = false;
    this.stairsArray = stairsArray;
    this.distanceMiddle = 100;
    this.st = '';
    this.isOnSideStairs = false;

    this.PLAYER_SPEED_Y = 1.8;
  }


  onStairsHandler = (isInPosition) => {
    this.player.body.ignoreGravity = true;
    if (!(stairsParams.lastStep || this.playerInstance.isTouching.ground) && isInPosition) {
      setCanGoX(false);
    }
  };

  playerStairsOverlap = (bodyA, bodyB) => {
    const playerA = bodyA.parts.filter((part) => part.label === 'mainBody')[0];
    const stairs = bodyB;
    this.st = bodyB;
    this.distanceMiddle = Math.abs(playerA.position.x - stairs.position.x);

    setCanGoX(true);

    const distanceRightSide = Math
      .abs(playerA.position.x - (stairs.bounds.max.x - stairsParams.WIDTH
        - playerA.centerOffset.x * this.player.scale));
    const distanceStairsRight = Math
      .abs((stairs.bounds.min.x + stairsParams.WIDTH - playerA.position.x));

    const distanceLeftSide = Math
      .abs(playerA.position.x - (stairs.bounds.min.x + stairsParams.WIDTH
        + playerA.centerOffset.x * this.player.scale));
    const distanceStairsLeft = Math
      .abs((stairs.bounds.max.x - stairsParams.WIDTH - playerA.position.x));


    if ((this.distanceMiddle < stairsParams.ALLOWED_DISTANCE_MIDDLE && stairs.label === 'stairs-middle')
      || (distanceStairsLeft < stairsParams.ALLOWED_DISTANCE_SIDES && stairs.label === 'stairs-left')
      || (distanceStairsRight < stairsParams.ALLOWED_DISTANCE_SIDES && stairs.label === 'stairs-right')) {
      const positionConfig = {
        playerInstance: this.playerInstance,
        playerContainer: this.player,
        playerBody: playerA,
        stairs,
        distanceMiddle: this.distanceMiddle,
        cursors: this.cursors,
        scene: this.scene,
      };
      positionStairsSetter(positionConfig);
    }
    updateCornersPosition();
    if (this.distanceMiddle === 0 || distanceRightSide === 0 || distanceLeftSide === 0) {
      this.isPlayerOnPosition = true;
    }
    this.onStairsHandler(this.isPlayerOnPosition);

    this.isOnSideStairs = (stairs.label === 'stairs-left' || stairs.label === 'stairs-right')
      && this.isPlayerOnPosition;
  };


  checkLastStep = (bodyA, bodyB, collisionInfo) => {
    if (collisionInfo.depth < stairsParams.LAST_STEP_LENGTH) {
      stairsParams.lastStep = true;
    }
  };

  setStairsOverlap = () => {
    this.scene.matter
      .overlap(this.player, this.stairsArray, this.checkLastStep);
    this.scene.matter
      .overlap(this.player, this.stairsArray, this.playerStairsOverlap);
  };

  controlYMovement = () => {
    const canPlayerDown = sidesCollisionHandler(this.playerInstance, this.scene).canDown;
    if (this.isPlayerOnPosition) {
      if (this.cursors.up.isDown() && !stairsParams.lastStep) {
        this.player.setVelocityY(-this.PLAYER_SPEED_Y);
      } else if (this.cursors.down.isDown() && canPlayerDown) {
        this.player.setVelocityY(this.PLAYER_SPEED_Y);
      } else {
        this.player.setVelocityY(0);
      }
    }

    stairsParams.lastStep = false;
    this.isPlayerOnPosition = false;
  }
}
