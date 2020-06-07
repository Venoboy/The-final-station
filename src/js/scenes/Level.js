/* eslint-disable linebreak-style */
import Phaser from 'phaser';

export default class Level extends Phaser.Scene {
  constructor() {
    super('game-scene');
  }

  // eslint-disable-next-line class-methods-use-this
  preload() {
  }

  // eslint-disable-next-line class-methods-use-this
  create() {
    // eslint-disable-next-line no-console
    console.log('level 0');
  }
}
