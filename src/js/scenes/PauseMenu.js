/* eslint-disable linebreak-style */
/* eslint-disable camelcase */
import Phaser from 'phaser';
import MenuButton from '../objects/buttons/MenuButton';

export default class BootScene extends Phaser.Scene {
  constructor() {
    super('pause-menu');
  }

  create() {
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    this.continueButton = new MenuButton({
      scene: this,
      x: windowWidth / 2,
      y: windowHeight * 0.45,
      text: 'CONTINUE',
      callback: this.continueGame,
    });
    this.returnToMainMenuButtom = new MenuButton({
      scene: this,
      x: windowWidth / 2,
      y: windowHeight * 0.55,
      text: 'MAIN MENU',
      callback: this.returnToMainMenu,
    });
  }

  continueGame() {
    this.scene.scene.switch('game-scene');
  }

  returnToMainMenu() {
    this.scene.scene.stop('game-bar');
    this.scene.scene.stop('game-scene');
    this.scene.scene.start('main-menu');
  }
}
