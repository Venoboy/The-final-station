import Phaser from 'phaser';

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
      enableSleeping: true,
    },
  },
  scene: {
    preload,
    create,
    update,
  },
};

var game = new Phaser.Game(config);
let cursors;
let player;
let ground;

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
  const groundElements = Phaser.Physics.Matter.PhysicsEditorParser
    .parseFixture(level0shapes.f_1.fixtures[1]);
  // console.log(groundElements);
  ground.density = 1;
  ground.slop = 0.2;

  const level0stairsShape = this.cache.json.get('level0stairs');
  const stairs = this.matter.add.fromPhysicsEditor(486, 235, level0stairsShape.f_1);
  console.log(stairs);

  player = (new Player(this, 107, 168)).player;
  // player.setDensity(0.01);

  // player = this.matter.add.image(107, 168, 'hero');
  // player.setScale(0.5, 0.5);
  // player.setFriction(1, 0.01, 0);
  // player.setMass(200);
  // player.setFixedRotation();

  this.cameras.main.startFollow(player, false, 0.5, 0.5);


  cursors = this.input.keyboard.createCursorKeys();
}

function update() {
  if (cursors.left.isDown) {
    player.thrustBack(0.0005);
    player.setVelocityX(-0.4);
    // console.log('left', player.body.velocity);
  } else if (cursors.right.isDown) {
    player.thrust(0.0005);
    player.setVelocityX(0.4);
    // console.log('right');
  } else {
    player.setVelocityX(0);
    // this.matter.world.on('collisionactive', (e) => {
    //   console.log(e);
    // })
    if (!player.body.velocity.y) {
      player.setToSleep();
    }
    if (cursors.up.isDown) {
      player.thrustLeft(0.0005);
      player.setVelocityY(-0.4);
    } else if (cursors.down.isDown) {
      player.thrustRight(0.0005);
      player.setVelocityY(0.4);
    } else {
      player.setVelocityY(0);
    }
  }

  // if (cursors.up.isDown) {
  //   player.setVelocityY(-1);
  // } else if (cursors.down.isDown) {
  //   player.setVelocityY(1);
  // } else {
  //   player.setVelocityY(0);
  //   player.setToSleep();
  // }
}
