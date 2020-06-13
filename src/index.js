import Phaser from 'phaser';
import Level from './js/scenes/Level';
import GameBar from './js/interface/GameBar';

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
  pixelArt: true,
  scene: [Level, GameBar],
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
};

export default new Phaser.Game(config);
