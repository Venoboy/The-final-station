/* eslint-disable class-methods-use-this */
/* eslint-disable linebreak-style */
/* eslint-disable camelcase */
import Phaser from 'phaser';
import gg_sleep from '../../assets/finalScene/gg_sleep.png';
import house from '../../assets/finalScene/house.png';
import b0 from '../../assets/finalScene/b0.png';
import b1 from '../../assets/finalScene/b1.png';
import { createFinalSceneEffects } from '../effects/sceneEffects';

const textConfig = {
  fontFamily: 'font2',
  fontSize: 30,
};

export default class BootScene extends Phaser.Scene {
  constructor() {
    super('final-scene');
  }

  preload() {
    this.cameras.main.fadeOut(0);
    this.load.spritesheet('gg_sleep', gg_sleep, {
      frameWidth: 34,
      frameHeight: 27,
    });
    this.load.image('gg_house', house);
    this.load.image('b1', b1);
    this.load.image('b0', b0);
  }

  create() {
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    const text = this.add.text(centerX, centerY, '106th year since the FIRST VISITATION', textConfig)
      .setOrigin(0.5)
      .setResolution(10)
      .setInteractive();
    const timeline = createFinalSceneEffects(this, text, this.showScene);
    timeline.play();
  }

  showScene(scene) {
    scene.add.image(512, 136, 'b0');
    scene.add.image(100, 150, 'b1');
    scene.add.image(512, 340, 'gg_house');
    scene.cameras.main.fadeIn(1000);
  }
}
