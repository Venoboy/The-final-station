/* eslint-disable camelcase */
import Phaser from 'phaser';
import MenuButton from '../sceneObjects/MenuButton';
import addSceneEffect from './sceneEffects';
import addListeners from './sceneListeners';
import { createSoundFadeOut } from '../../objects/soundSensors/soundEffects';

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

    addListeners(this);
  }

  startGame() {
    this.scene.cameras.main.fadeOut(1000);
    const musicFadeOut = createSoundFadeOut(this.scene, this.scene.music, 1000, 0);
    musicFadeOut.onComplete = () => { this.scene.music.stop(); };
    musicFadeOut.play();
    this.scene.cameras.main.on('camerafadeoutcomplete', () => {
      this.scene.scene.start('game-scene');
    });
  }
}
