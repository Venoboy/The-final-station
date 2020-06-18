import Phaser from 'phaser';
import PhaserMatterCollisionPlugin from 'phaser-matter-collision-plugin';

import Level from './js/scenes/Level';

const config = {
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
  pixelArt: true,
  scene: [Level],
};

export default new Phaser.Game(config);
// let playerInteraction;

// function preload() {
//   playerInteraction = new PlayerInteraction(this.scene.scene);
//   playerInteraction.preload();
// }
//
// function create() {
//   playerInteraction.create();
// }
//
// function update() {
//   playerInteraction.update();
// }
