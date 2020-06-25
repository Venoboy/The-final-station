import Player from './Player';
import level0json from '../../assets/level0Physics/level-start.xml.json';
import level0MiddleJson from '../../assets/level0Physics/level-middle.xml.json';
import level0EndJson from '../../assets/level0Physics/level-end.xml.json';
import level0stairsJson from '../../assets/level0Physics/level-start-stairs.xml.json';
import level0stairsMiddleJson from '../../assets/level0Physics/level-middle-stairs.xml.json';
import hunterPath from '../../assets/level0/hunter_1_0.png';

export default class PlayerInteraction {
  constructor(scene) {
    this.playerInstance = {};
    this.player = this.playerInstance.player || {};
    this.playerHeight = 0;
    this.cursors = {};
    this.scene = scene;
    this.stairs = {};
    this.isPlayerOnPosition = false;
    this.movingKeysPressed = false;
    this.lastStep = false;
    this.canGoX = true;
    this.stairsArray = [];
    this.distanceMiddle = 100;

    this.LAST_STEP_LENGTH = 1.5;
    this.PLAYER_SPEED_X = 1.8;
    this.PLAYER_SPEED_Y = 1.8;
    this.STAIRS_WIDTH = 5;
    this.ALLOWED_DISTANCE_MIDDLE = 6.5;
    this.ALLOWED_DISTANCE_SIDES = 10;
  }

  onStairsHandler = () => {
    this.player.body.ignoreGravity = true;
    if (!(this.lastStep || this.playerInstance.isTouching.ground)) {
      this.canGoX = false;
    }
  };

  positionStairsSetter = (player, stairs) => {
    if ((player.position.y < stairs.position.y && this.cursors.down.isDown)
      || (player.position.y > stairs.position.y && this.cursors.up.isDown)) {
      if (stairs.label === 'stairs-middle') {
        this.player.setPosition(stairs.position.x, player.position.y);
        this.canGoX = false;
      } else if (stairs.label === 'stairs-right') {
        const playerX = stairs.bounds.min.x + player.centerOffset.x * this.player.scale
          + this.STAIRS_WIDTH;

        if (player.position.y < stairs.bounds.min.y) {
          this.player.setPosition(playerX, player.position.y + this.playerHeight);
          this.canGoX = false;
        } else if (this.distanceMiddle < this.ALLOWED_DISTANCE_MIDDLE) {
          this.player.setPosition(playerX, player.position.y);
          this.canGoX = false;
        }
      } else if (stairs.label === 'stairs-left') {
        const playerX = stairs.bounds.max.x - player.centerOffset.x * this.player.scale
          - this.STAIRS_WIDTH;

        if (player.position.y < stairs.bounds.min.y) {
          this.player.setPosition(playerX, player.position.y + this.playerHeight);
          this.canGoX = false;
        } else if (this.distanceMiddle < this.ALLOWED_DISTANCE_MIDDLE) {
          this.player.setPosition(playerX, player.position.y);
          this.canGoX = false;
        }
      }
    } else if (player.bounds.min.y <= (stairs.bounds.min.y)
      && (player.position.y >= stairs.bounds.min.y)
      && this.cursors.up.isDown) {
      if (stairs.label === 'stairs-right') {
        this.player.setPosition(stairs.bounds.min.x - player.centerOffset.x * this.player.scale,
          stairs.bounds.min.y - player.centerOffset.y * this.player.scale);
        this.lastStep = true;
      } else if (stairs.label === 'stairs-left') {
        this.player.setPosition(stairs.bounds.max.x + player.centerOffset.x * this.player.scale,
          stairs.bounds.min.y - player.centerOffset.y * this.player.scale);
        this.lastStep = true;
      }
    }
  };

  playerStairsOverlap = (bodyA, bodyB) => {
    const playerA = bodyA;
    const stairs = bodyB;
    this.distanceMiddle = Math.abs(playerA.position.x - stairs.position.x);

    const distanceRightSide = Math
      .abs(playerA.position.x - (stairs.bounds.max.x - this.STAIRS_WIDTH
        - playerA.centerOffset.x * this.player.scale));
    const distanceStairsRight = Math
      .abs((stairs.bounds.min.x + this.STAIRS_WIDTH - playerA.position.x));

    const distanceLeftSide = Math
      .abs(playerA.position.x - (stairs.bounds.min.x + this.STAIRS_WIDTH
        + playerA.centerOffset.x * this.player.scale));
    const distanceStairsLeft = Math
      .abs((stairs.bounds.max.x - this.STAIRS_WIDTH - playerA.position.x));

    this.onStairsHandler();

    if ((this.distanceMiddle < this.ALLOWED_DISTANCE_MIDDLE && stairs.label === 'stairs-middle')
      || (distanceStairsLeft < this.ALLOWED_DISTANCE_SIDES && stairs.label === 'stairs-left')
      || (distanceStairsRight < this.ALLOWED_DISTANCE_SIDES && stairs.label === 'stairs-right')) {
      this.positionStairsSetter(playerA, stairs);
    }
    if (this.distanceMiddle === 0 || distanceRightSide === 0 || distanceLeftSide === 0) {
      this.isPlayerOnPosition = true;
    }
  };

  setLastStep = () => {
    this.lastStep = true;
  };

  checkLastStep = (bodyA, bodyB, collisionInfo) => collisionInfo.depth < this.LAST_STEP_LENGTH;

  preload() {
    this.scene.load.image('hero', hunterPath);
  }

  create() {
    this.playerInstance = new Player(this.scene, 475, 199, 'hero');
    this.player = this.playerInstance.player;
    this.playerHeight = this.player.height * this.player.scale;

    this.ground = this.scene.matter.add.fromPhysicsEditor(250, 260.65, level0json.f_1);
    this.ground.frictionStatic = 0.5;
    this.ground.friction = 0.5;

    this.groundMiddle = this.scene.matter.add.fromPhysicsEditor(779, 261, level0MiddleJson.f_2);

    this.groundEnd = this.scene.matter.add.fromPhysicsEditor(1303, 273, level0EndJson.f_3);

    this.stairs = this.scene.matter.add.fromPhysicsEditor(486, 235, level0stairsJson.f_1);
    this.stairsArray.push(this.stairs);
    this.stairs.collisionFilter.mask = 2;
    this.stairsMiddle = this.scene.matter.add
      .fromPhysicsEditor(770, 315.5, level0stairsMiddleJson.f_2);
    this.stairsMiddle.collisionFilter.mask = 2;
    this.stairsArray.push(this.stairsMiddle);

    this.camera = this.scene.cameras.main;
    this.camera.startFollow(this.player, false, 0.1, 0.1);
    this.camera.setBounds(0, 0, 1536, 512);
    this.camera.setZoom(1);

    this.cursors = this.scene.input.keyboard.createCursorKeys();
  }

  update() {
    this.player.body.ignoreGravity = !this.movingKeysPressed
      && this.playerInstance.isTouching.body
      && !this.playerInstance.isTouching.left
      && !this.playerInstance.isTouching.right;
    this.canGoX = true;
    this.isPlayerOnPosition = false;

    this.scene.matter
      .overlap(this.player, this.stairsArray,
        this.setLastStep, this.checkLastStep);
    this.scene.matter
      .overlap(this.player, this.stairsArray, this.playerStairsOverlap);

    if (this.cursors.left.isDown && this.canGoX) {
      this.movingKeysPressed = true;
      this.player.setVelocityX(-this.PLAYER_SPEED_X);
    } else if (this.cursors.right.isDown && this.canGoX) {
      this.movingKeysPressed = true;
      this.player.setVelocityX(this.PLAYER_SPEED_X);
    } else {
      this.movingKeysPressed = false;
      this.player.setVelocityX(0);
    }

    if (this.isPlayerOnPosition) {
      if (this.cursors.up.isDown && !this.lastStep) {
        this.player.setVelocityY(-this.PLAYER_SPEED_Y);
      } else if (this.cursors.down.isDown) {
        this.player.setVelocityY(this.PLAYER_SPEED_Y);
      } else {
        this.player.setVelocityY(0);
      }
    }

    this.lastStep = false;
  }
}
