/* eslint-disable camelcase */
import Phaser from 'phaser';
import MenuButton from '../sceneObjects/MenuButton';
import addSceneEffect from './sceneEffects';
import addSceneListeners from './sceneListeners';
import { createSoundFadeOut, createSoundFadeIn } from '../../objects/soundSensors/soundEffects';

export default class BootScene extends Phaser.Scene {
  constructor() {
    super('main-menu');
  }

  create() {
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    this.bg = this.add.image(windowWidth / 2, windowHeight * 0.45, 'mainBG');
    this.bg.setScale((windowWidth * 0.7) / this.bg.width);
    this.logoImg = this.add.image(windowWidth / 2, windowHeight * 0.35, 'logo');
    this.logoImg.setScale((windowWidth * 0.5) / this.logoImg.width);
    this.playButton = new MenuButton({
      scene: this,
      x: windowWidth / 2,
      y: windowHeight * 0.55,
      text: 'START GAME',
      callback: this.startGame,
    });

    const showMenuTimeline = addSceneEffect(this, this.bg, this.logoImg, this.playButton.button);
    showMenuTimeline.play();
    this.music = this.sound.add('menuSound', { volume: 0, loop: true });
    this.musicFadeOut = createSoundFadeOut(this, this.music, 1000, 0);
    this.musicFadeOut.onComplete = () => { this.music.stop(); };
    this.musicFadeIn = createSoundFadeIn(this, this.music, 1000, 0);
    this.music.play();
    this.musicFadeIn.play();
    addSceneListeners(this);
  }

  startGame() {
    this.scene.cameras.main.fadeOut(1000);
    this.scene.musicFadeOut.play();
    this.scene.cameras.main.on('camerafadeoutcomplete', () => {
      this.scene.scene.start('game-scene');
    });
  }
}
