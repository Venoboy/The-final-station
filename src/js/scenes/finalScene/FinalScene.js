/* eslint-disable camelcase */
import Phaser from 'phaser';
import preloadScene from './scenePreload';
import addSceneEffect from './sceneEffect';

const textConfig = {
  fontFamily: 'font2',
  fontSize: 30,
};

export default class BootScene extends Phaser.Scene {
  constructor() {
    super('final-scene');
  }

  preload() {
    preloadScene(this);
  }

  create() {
    this.anims.create({
      key: 'sleep',
      frames: this.anims.generateFrameNumbers('gg_sleep'),
      frameRate: 2,
      repeat: -1,
    });
    this.anims.create({
      key: 'stay',
      frames: this.anims.generateFrameNumbers('gg_stay'),
      frameRate: 2,
      repeat: -1,
    });
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    const texts = [];
    const bg = [];
    const musics = [];
    const players = [];

    const text1 = this.add.text(centerX, centerY, '106th year since the FIRST VISIT', textConfig)
      .setOrigin(0.5)
      .setResolution(10);
    const text2 = this.add.text(centerX, centerY, 'To be continued ...', textConfig)
      .setOrigin(0.5)
      .setResolution(10);
    texts.push(text1, text2);

    const b0_img = this.add.image(512, 136, 'b0');
    const b1_img = this.add.image(222, 260, 'b1');
    const house_img = this.add.image(512, 340, 'gg_house');
    bg.push(b0_img, b1_img, house_img);

    const music1 = this.sound.add('alarm', { loop: true });
    const music2 = this.sound.add('getReadySound');
    musics.push(music1, music2);

    const player1 = this.add.sprite(300, 198, 'gg_sleep');
    const player2 = this.add.sprite(300, 195, 'gg_stay');
    players.push(player1, player2);

    const timeline = addSceneEffect(this, texts, bg, musics, players);
    timeline.play();
  }
}
