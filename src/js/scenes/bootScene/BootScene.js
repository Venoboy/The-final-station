/* eslint-disable camelcase */
import Phaser from 'phaser';
import scenePreload from './scenePreload';
import addSceneListeners from './sceneListeners';
import addSceneEffects from './sceneEffects';

export default class BootScene extends Phaser.Scene {
  constructor() {
    super('boot-scene');
  }

  preload() {
    scenePreload(this);
  }

  create() {
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    this.title_logo_domy_img = this.add.image(centerX, centerY, 'title_logo_domy')
      .setOrigin(0.5);

    this.title_logo_tiny_img = this.add.image(centerX, centerY, 'title_logo_tiny')
      .setOrigin(0.5);

    const timeline = addSceneEffects(this, this.title_logo_domy_img, this.title_logo_tiny_img);
    timeline.play();

    addSceneListeners(this);
  }
}
