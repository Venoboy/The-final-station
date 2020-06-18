import Player from './Player';
import level0png from '../../assets/level0Physics/b_1.png';
import level0json from '../../assets/level0Physics/level-start.xml.json';
import level0stairsPath from '../../assets/level0Physics/level-start-stairs.xml.json';
import hunterPath from '../../assets/level0/hunter_1_0.png';

export default class PlayerInteraction {
  constructor(scene) {
    this.playerInstance = {};
    this.player = this.playerInstance.player || {};
    this.cursors = {};
    this.scene = scene;
    this.ground = {};
    this.stairs = {};
    this.isPlayerOnStairs = false;
    this.movingKeysPressed = false;
    this.lastStep = false;

    this.LAST_STEP_LENGTH = 1.5;
    this.PLAYER_SPEED_X = 1.8;
    this.PLAYER_SPEED_Y = 0.8;
  }

  static playerStairsOverlap(bodyA) {
    const playerBody = bodyA;
    playerBody.ignoreGravity = true;
  }

  setLastStep() {
    this.lastStep = true;
  }

  checkLastStep(bodyA, bodyB, collisionInfo) {
    return collisionInfo.depth < this.LAST_STEP_LENGTH;
  }

  preload() {
    this.scene.load.image('levelStart', level0png);
    this.scene.load.json('level0json', level0json);
    this.scene.load.json('level0stairs', level0stairsPath);
    this.scene.load.image('hero', hunterPath);
  }

  create() {
    this.scene.add.image(256, 256, 'levelStart');
    this.playerInstance = new Player(this.scene, 107, 168, 'hero');
    this.player = this.playerInstance.player;

    const level0shapes = this.scene.cache.json.get('level0json');
    this.player.body.ignoreGravity = false;
    this.ground = this.scene.matter.add.fromPhysicsEditor(250, 260.65, level0shapes.f_1);
    this.ground.frictionStatic = 0.5;
    this.ground.friction = 0.5;
    this.ground.density = 1;
    this.ground.slop = 0.2;

    const level0stairsShape = this.scene.cache.json.get('level0stairs');
    this.stairs = this.scene.matter.add.fromPhysicsEditor(486, 235, level0stairsShape.f_1);
    this.stairs.collisionFilter.mask = 2;

    this.scene.cameras.main.startFollow(this.player, false, 0.5, 0.5);

    this.cursors = this.scene.input.keyboard.createCursorKeys();
  }

  update() {
    this.scene.matter.overlap(this.player.body, this.stairs, this.setLastStep, this.checkLastStep);
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
      .overlap(this.player.body, this.stairs, PlayerInteraction.playerStairsOverlap);
    this.lastStep = false;
  }
}
