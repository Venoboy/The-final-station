/* eslint-disable linebreak-style */
/* eslint-disable camelcase */
import Phaser from 'phaser';
import MenuButton from '../objects/buttons/MenuButton';

export default class BootScene extends Phaser.Scene {
  constructor() {
    super('main-menu');
  }

  create() {
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    const bg = this.add.image(windowWidth / 2, windowHeight * 0.45, 'mainBG');
    bg.setScale((windowWidth * 0.7) / bg.width);
    const logoImg = this.add.image(windowWidth / 2, windowHeight * 0.35, 'logo');
    logoImg.setScale((windowWidth * 0.5) / logoImg.width);
    const playButton = new MenuButton({
      scene: this,
      x: windowWidth / 2,
      y: windowHeight * 0.55,
      text: 'START GAME',
      callback: this.startGame,
    });
    bg.alpha = 0;
    logoImg.alpha = 0;
    playButton.button.alpha = 0;

    const showMenuTimeline = this.tweens.createTimeline();
    showMenuTimeline.add({
      targets: bg,
      alpha: 1,
      duration: 1000,
    });
    showMenuTimeline.add({
      targets: logoImg,
      alpha: 1,
      duration: 1000,
    });
    showMenuTimeline.add({
      targets: playButton.button,
      alpha: 1,
      duration: 1000,
    });
    showMenuTimeline.play();

    this.music = this.sound.add('menuSound');
    this.soundFadeOut = this.tweens.createTimeline();
    this.soundFadeOut.add({
      targets: this.music,
      volume: 0,
      duration: 1000,
    });
    this.soundFadeIn = this.tweens.createTimeline();
    this.soundFadeIn.add({
      targets: this.music,
      volume: 1,
      duration: 1000,
    });
    this.music.play();
    this.soundFadeIn.play();

    this.events.on('start', () => {
      this.music.play();
    });
    this.events.on('pause', () => {
      this.music.pause();
    });
    this.events.on('sleep', () => {
      this.music.pause();
    });
    this.events.on('shutdown', () => {
      this.music.stop();
    });
  }

  startGame() {
    this.scene.cameras.main.fadeOut(1000);
    this.scene.soundFadeOut.play();
    this.scene.cameras.main.on('camerafadeoutcomplete', () => {
      this.scene.scene.start('game-scene');
    });
  }
}
