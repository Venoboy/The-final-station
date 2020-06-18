import Phaser from 'phaser';
import PhaserMatterCollisionPlugin from 'phaser-matter-collision-plugin';

import Player from './js/Player/Player';
import ballsPng from './assets/sprites/balls.png';
import level0png from './assets/level0Physics/b_1.png';
import level0json from './assets/level0Physics/level-start.xml.json';
import level0stairsPath from './assets/level0Physics/level-start-stairs.xml.json';
import hunterPath from './assets/level0/hunter_1_0.png';


var config = {
  type: Phaser.AUTO,
  width: 512,
  height: 512,
  backgroundColor: '#c4dedf',
  physics: {
    default: 'matter',
    matter: {
      gravity: {
        x: 0,
        y: 1,
      },
      debug: {
        renderFill: false,
        showInternalEdges: true,
        showConvexHulls: true,
        showBody: true,
        showStaticBody: true,
      },
      enableSleeping: false,
    },
  },
  plugins: {
    scene: [
      {
        plugin: PhaserMatterCollisionPlugin, // The plugin class
        key: 'matterCollision', // Where to store in Scene.Systems, e.g. scene.sys.matterCollision
        mapping: 'matterCollision', // Where to store in the Scene, e.g. scene.matterCollision
      },
    ],
  },
  scene: {
    preload,
    create,
    update,
  },
};

const game = new Phaser.Game(config);
let cursors;
let player;
let ground;
let stairs;
let isPlayerOnStairs;
let playerInstance;
let movingKeysPressed = false;
let lastStep = false;

const LAST_STEP_LENGTH = 1.5;
const PLAYER_SPEED_X = 1.8;
const PLAYER_SPEED_Y = 0.8;


function playerStairsOverlap(bodyA) {
  // console.log(bodyA, bodyB, collisionInfo);
  const playerBody = bodyA;
  playerBody.ignoreGravity = true;
}

function setLastStep() {
  lastStep = true;
}

function checkLastStep(bodyA, bodyB, collisionInfo) {
  // console.log(collisionInfo.depth, bodyA);
  return collisionInfo.depth < LAST_STEP_LENGTH;
}

function preload() {
  this.load.image('levelStart', level0png);
  this.load.spritesheet('balls', ballsPng, { frameWidth: 17, frameHeight: 17 });
  this.load.json('level0json', level0json);
  this.load.json('level0stairs', level0stairsPath);
  this.load.image('hero', hunterPath);
}

function create() {
  this.add.image(256, 256, 'levelStart');

  const level0shapes = this.cache.json.get('level0json');
  // console.log(level0shapes);
  ground = this.matter.add.fromPhysicsEditor(250, 260.65, level0shapes.f_1);
  ground.frictionStatic = 0.5;
  ground.friction = 0.5;
  ground.density = 1;
  ground.slop = 0.2;

  const level0stairsShape = this.cache.json.get('level0stairs');
  stairs = this.matter.add.fromPhysicsEditor(486, 235, level0stairsShape.f_1);
  stairs.collisionFilter.mask = 2;

  playerInstance = new Player(this, 107, 168);
  player = playerInstance.player;


  this.cameras.main.startFollow(player, false, 0.5, 0.5);

  cursors = this.input.keyboard.createCursorKeys();
}

function update() {
  this.matter.overlap(player.body, stairs, setLastStep, checkLastStep);
  if (cursors.left.isDown) {
    movingKeysPressed = true;
    player.setVelocityX(-PLAYER_SPEED_X);
  } else if (cursors.right.isDown) {
    movingKeysPressed = true;
    player.setVelocityX(PLAYER_SPEED_X);
  } else {
    movingKeysPressed = false;
    player.setVelocityX(0);
    if (isPlayerOnStairs) {
      if (cursors.up.isDown && !lastStep) {
        player.setVelocityY(-PLAYER_SPEED_Y);
      } else if (cursors.down.isDown) {
        player.setVelocityY(PLAYER_SPEED_Y);
      } else {
        player.setVelocityY(0);
      }
    }
  }
  player.body.ignoreGravity = false;
  player.body.ignoreGravity = !movingKeysPressed
    && playerInstance.isTouching.body
    && !playerInstance.isTouching.left
    && !playerInstance.isTouching.right;

  isPlayerOnStairs = this.matter.overlap(player.body, stairs, playerStairsOverlap);
  lastStep = false;
}
