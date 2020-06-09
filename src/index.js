/* eslint-disable linebreak-style */
import Phaser from 'phaser';
import Level from './js/scenes/Level';

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 512,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 200 },
    },
  },
  scene: [Level],
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
};

export default new Phaser.Game(config);
