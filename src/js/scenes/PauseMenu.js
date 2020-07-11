/* eslint-disable camelcase */
import Phaser from 'phaser';
import MenuButton from '../objects/buttons/MenuButton';

export default class BootScene extends Phaser.Scene {
  constructor() {
    super('pause-menu');
  }

  create() {
    this.cameras.main.setBackgroundColor('rgba(0, 0, 0, 0.8)');

    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    this.continueButton = new MenuButton({
      scene: this,
      x: windowWidth / 2 - 5,
      y: windowHeight * 0.45,
      text: 'CONTINUE',
      callback: this.continueGameButtonPress,
    });
    this.returnToMainMenuButtom = new MenuButton({
      scene: this,
      x: windowWidth / 2,
      y: windowHeight * 0.45 + 50,
      text: 'MAIN MENU',
      callback: this.returnToMainMenu,
    });

    const pauseLogo = this.add.image(windowWidth / 2, windowHeight * 0.2, 'logo');
    pauseLogo.setScale((windowWidth * 0.3) / pauseLogo.width);
    this.add.image(windowWidth / 2, windowHeight * 0.8, 'keyboard');

    this.continueKey = this.input.keyboard.addKey(27);
    this.continueKey.on('up', this.continueGame, this);
  }

  continueGameButtonPress() {
    this.scene.scene.resume('game-scene');
    this.scene.scene.stop();
  }

  continueGame() {
    this.scene.resume('game-scene');
    this.scene.stop();
  }

  returnToMainMenu() {
    this.scene.cameras.main.fadeOut(1000);
    this.scene.cameras.main.on('camerafadeoutcomplete', () => {
      this.scene.scene.stop('game-bar');
      this.scene.scene.stop('game-scene');
      this.scene.scene.start('main-menu');
    });
  }
}
