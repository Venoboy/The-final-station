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

var game = new Phaser.Game(config);
let cursors;
let player;
let ground;
let stairs;
let isPlayerOnStairs;
let playerInstance;


function playerStairsOverlap(bodyA, bodyB, collisionInfo) {
  console.log(bodyA, bodyB, collisionInfo);
  const playerBody = bodyA;
  playerBody.ignoreGravity = true;
}

function collisionEndFun(eventData) {
  // console.log(eventData.pairs[0]);
  const {
    bodyA, bodyB, gameObjectA, gameObjectB, pair
  } = eventData;
  if (bodyA && bodyB) {
    if (bodyA.label === ('Body' || 'stairs-example') && (bodyB.label === ('Body' || 'stairs-example'))) {
      console.log(bodyA, bodyB);
      bodyA.setVelocityY(0);
      bodyB.setVelocityY(0);
    }
  }
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
  const groundElements = Phaser.Physics.Matter.PhysicsEditorParser
    .parseFixture(level0shapes.f_1.fixtures[1]);
  // console.log(groundElements);
  ground.density = 1;
  ground.slop = 0.2;

  const level0stairsShape = this.cache.json.get('level0stairs');
  stairs = this.matter.add.fromPhysicsEditor(486, 235, level0stairsShape.f_1);
  stairs.collisionFilter.mask = 2;
  // this.setCollisionGroup(stairs, 1);
  // console.log(stairs);

  playerInstance = new Player(this, 107, 168);
  // console.log(playerInstance);
  player = playerInstance.player;
  // player.setDensity(0.01);

  // player = this.matter.add.image(107, 168, 'hero');
  // player.setScale(0.5, 0.5);
  // player.setFriction(1, 0.01, 0);
  // player.setMass(200);
  // player.setFixedRotation();

  this.cameras.main.startFollow(player, false, 0.5, 0.5);

  cursors = this.input.keyboard.createCursorKeys();

  this.matter.world.on('collisionend', collisionEndFun);
  this.matterCollision.addOnCollideEnd({
    objectA: player.body,
    objectB: stairs,
    callback: collisionEndFun,
  });
}

function update() {
  if (cursors.left.isDown) {
    // player.thrustBack(0.0005);
    player.setVelocityX(-0.8);
    // console.log('left', player.body.velocity);
  } else if (cursors.right.isDown) {
    // player.thrust(0.0005);
    player.setVelocityX(0.8);
    // console.log('right');
  } else {
    player.setVelocityX(0);
    // this.matter.world.on('collisionactive', (e) => {
    //   console.log(e);
    // })
    if (!player.body.velocity.y) {
      // player.setToSleep();
    }
    if (isPlayerOnStairs) {
      if (cursors.up.isDown) {
        // player.thrustLeft(0.0001);
        player.setVelocityY(-0.4);
      } else if (cursors.down.isDown) {
        // player.thrustRight(0.0001);
        player.setVelocityY(0.4);
      } else {
        player.setVelocityY(0);
      }
    }
  }
  player.body.ignoreGravity = false;
  if (playerInstance.isTouching.ground) {
    player.body.ignoreGravity = true;
  }
  // console.log(playerInstance.isTouching.ground);
  // if (player.body.force.y < 0) {
  //   player.applyForce({ x: 0, y: -player.body.force.y });
  // }

  isPlayerOnStairs = this.matter.overlap(player.body, stairs, playerStairsOverlap);
  console.log(isPlayerOnStairs);
  // console.log(isOverlap);
  // console.log(this.matter.intersectBody(player.body, stairs));
}
