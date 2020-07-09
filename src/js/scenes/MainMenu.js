/* eslint-disable linebreak-style */
/* eslint-disable camelcase */
import Phaser from 'phaser';
import MenuButton from '../objects/buttons/MenuButton';
import { createSoundFadeIn, createSoundFadeOut } from '../effects/soundEffects';
import { createMainMenuImageEffect } from '../effects/sceneEffects';

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

    const showMenuTimeline = createMainMenuImageEffect(this, bg, logoImg, playButton.button);
    showMenuTimeline.play();

    this.music = this.sound.add('menuSound', { volume: 0, loop: true });
    this.musicFadeOut = createSoundFadeOut(this, this.music, 1000, 0);
    this.musicFadeOut.onComplete = () => { this.music.stop(); };
    this.musicFadeIn = createSoundFadeIn(this, this.music, 1000, 0);
    this.music.play();
    this.musicFadeIn.play();
  }

  startGame() {
    this.scene.cameras.main.fadeOut(1000);
    this.scene.musicFadeOut.play();
    this.scene.cameras.main.on('camerafadeoutcomplete', () => {
      this.scene.scene.start('game-scene');
    });
  }
}
