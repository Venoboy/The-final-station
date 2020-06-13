/* eslint-disable linebreak-style */
import Phaser from 'phaser';

import gameBar from '../../assets/interface/gameBarFrame.png';

export default class GameBar extends Phaser.Scene {
  constructor() {
    super('game-bar');
  }

  preload() {
    this.load.image('gameBar', gameBar);
  }

  create() {
    this.frame = this.add.image(0, 0, 'gameBar').setOrigin(0);
    const width = 0.6 * this.frame.width;
    const height = 0.6 * this.frame.height;
    this.frame.setDisplaySize(width, height);
    // eslint-disable-next-line max-len
    this.frame.setPosition(this.cameras.main.centerX - width / 2, this.cameras.main.height - height);
  }
}
