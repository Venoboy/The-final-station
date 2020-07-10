/* eslint-disable camelcase */
import Phaser from 'phaser';

import title_logo_domy from '../../assets/menu/title_logo_domy.png';
import title_logo_tiny from '../../assets/menu/title_logo_tiny.png';
import mainBG from '../../assets/menu/MainBG.png';
import logo from '../../assets/menu/Logo.png';
import menuButton from '../../assets/menu/MenuButton.png';
import menuSound from '../../assets/audio/SoundtrackPorthWen.mp3';
import keyboard from '../../assets/menu/keyboard_eng.png';
import { createPreloadImageEffect } from '../effects/sceneEffects';

export default class BootScene extends Phaser.Scene {
  constructor() {
    super('preload-scene');
  }

  preload() {
    this.load.image('title_logo_domy', title_logo_domy);
    this.load.image('title_logo_tiny', title_logo_tiny);
    this.load.image('mainBG', mainBG);
    this.load.image('logo', logo);
    this.load.image('menuButton', menuButton);
    this.load.image('keyboard', keyboard);
    this.load.audio('menuSound', menuSound);
  }

  create() {
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    const title_logo_domy_img = this.add.image(centerX, centerY, 'title_logo_domy')
      .setOrigin(0.5);

    const title_logo_tiny_img = this.add.image(centerX, centerY, 'title_logo_tiny')
      .setOrigin(0.5);

    title_logo_domy_img.alpha = 0;
    title_logo_tiny_img.alpha = 0;

    const timeline = createPreloadImageEffect(this, title_logo_domy_img, title_logo_tiny_img);
    timeline.play();
  }
}
