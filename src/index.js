import Phaser from 'phaser';
import Level from './js/scenes/Level';
import GameBar from './js/interface/GameBar';

const config = {
  type: Phaser.AUTO,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 200 },
    },
  },
  pixelArt: true,
  scene: [Level, GameBar],
  scale: {
    mode: Phaser.Scale.RESIZE,
    width: window.innerWidth,
    height: window.innerHeight,
  },
};

const game = new Phaser.Game(config);

export default game;

// window.addEventListener('resize', () => {
//   game.scale.resize(window.innerWidth, window.innerHeight);
// }, false);