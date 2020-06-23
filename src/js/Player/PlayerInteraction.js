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
    this.cursors = {};
    this.scene = scene;
    this.stairs = {};
    this.isPlayerOnStairs = false;
    this.movingKeysPressed = false;
    this.lastStep = false;
    this.stairsArray = [];

    this.LAST_STEP_LENGTH = 1.5;
    this.PLAYER_SPEED_X = 1.8;
    this.PLAYER_SPEED_Y = 1.8;
  }

  static playerStairsOverlap(bodyA) {
    const playerBody = bodyA;
    playerBody.ignoreGravity = true;
  }

  setLastStep = () => {
    this.lastStep = true;
  };

  checkLastStep = (bodyA, bodyB, collisionInfo) => collisionInfo.depth < this.LAST_STEP_LENGTH;

  preload() {
    this.scene.load.image('hero', hunterPath);
  }

  create() {
    this.playerInstance = new Player(this.scene, 107, 168, 'hero');
    console.log(this.playerInstance);
    this.player = this.playerInstance.player;

    this.player.body.ignoreGravity = false;
    this.ground = this.scene.matter.add.fromPhysicsEditor(250, 260.65, level0json.f_1);
    this.ground.frictionStatic = 0.5;
    this.ground.friction = 0.5;

    this.groundMiddle = this.scene.matter.add.fromPhysicsEditor(779, 261, level0MiddleJson.f_2);

    this.groundEnd = this.scene.matter.add.fromPhysicsEditor(1303, 273, level0EndJson.f_3);

    this.stairs = this.scene.matter.add.fromPhysicsEditor(486, 235, level0stairsJson.f_1);
    this.stairsArray.push(this.stairs);
    this.stairs.collisionFilter.mask = 2;
    this.stairsMiddle = this.scene.matter.add
      .fromPhysicsEditor(770, 314, level0stairsMiddleJson.f_2);
    this.stairsMiddle.collisionFilter.mask = 2;
    this.stairsArray.push(this.stairsMiddle);

    this.camera = this.scene.cameras.main;
    this.camera.startFollow(this.player, false, 0.1, 0.1);
    this.camera.setBounds(0, 0, 1536, 512);
    this.camera.setZoom(1);

    this.cursors = this.scene.input.keyboard.createCursorKeys();
  }

  update() {
    this.scene.matter
      .overlap(this.playerInstance.mainBody, this.stairsArray,
        this.setLastStep, this.checkLastStep);
    if (this.cursors.left.isDown) {
      this.movingKeysPressed = true;
      this.player.setVelocityX(-this.PLAYER_SPEED_X);
    } else if (this.cursors.right.isDown) {
      this.movingKeysPressed = true;
      this.player.setVelocityX(this.PLAYER_SPEED_X);
    } else {
      this.movingKeysPressed = false;
      this.player.setVelocityX(0);
      if (this.isPlayerOnStairs) {
        if (this.cursors.up.isDown && !this.lastStep) {
          this.player.setVelocityY(-this.PLAYER_SPEED_Y);
        } else if (this.cursors.down.isDown) {
          this.player.setVelocityY(this.PLAYER_SPEED_Y);
        } else {
          this.player.setVelocityY(0);
        }
      }
    }
    this.player.body.ignoreGravity = false;
    this.player.body.ignoreGravity = !this.movingKeysPressed
      && this.playerInstance.isTouching.body
      && !this.playerInstance.isTouching.left
      && !this.playerInstance.isTouching.right;

    this.isPlayerOnStairs = this.scene.matter
      .overlap(this.playerInstance.mainBody, this.stairsArray,
        PlayerInteraction.playerStairsOverlap);
    this.lastStep = false;
  }
}
