/* eslint-disable linebreak-style */
/* eslint-disable camelcase */
import Phaser from 'phaser';

import title_logo_domy from '../../assets/menu/title_logo_domy.png';
import title_logo_tiny from '../../assets/menu/title_logo_tiny.png';
import mainBG from '../../assets/menu/MainBG.png';
import logo from '../../assets/menu/Logo.png';
import menuButton from '../../assets/menu/MenuButton.png';
import menuSound from '../../assets/audio/SoundtrackPorthWen.mp3';

const textConfig = {
  fontFamily: 'font2',
  fontSize: 20,
  color: '#3f3f3f',
};

export default class BootScene extends Phaser.Scene {
  constructor() {
    super('boot-scene');
  }

  preload() {
    this.load.image('title_logo_domy', title_logo_domy);
    this.load.image('title_logo_tiny', title_logo_tiny);
    this.load.image('mainBG', mainBG);
    this.load.image('logo', logo);
    this.load.image('menuButton', menuButton);
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

    const timeline = this.tweens.createTimeline();

    timeline.add({
      targets: title_logo_domy_img,
      alpha: 1,
      duration: 1000,
    });
    timeline.add({
      targets: title_logo_domy_img,
      alpha: 0,
      duration: 1000,
      delay: 2000,
    });
    timeline.add({
      targets: title_logo_tiny_img,
      alpha: 1,
      duration: 1000,
      delay: 1000,
    });
    timeline.add({
      targets: title_logo_tiny_img,
      alpha: 0,
      duration: 1000,
      delay: 2000,
      onComplete: () => {
        this.showMenu();
      },
    });

    this.sound = this.sound.add('menuSound', {
      volume: 0,
      loop: true,
    });
    // this.input.addDownCallback(() => {
    //   if (this.game.sound.context.state === 'suspended') {
    //     this.game.sound.context.resume();
    //   }
    // });
    this.soundFadeIn = this.tweens.createTimeline();
    this.soundFadeIn.add({
      targets: this.sound,
      volume: 1,
      duration: 1000,
    });
    this.soundFadeOut = this.tweens.createTimeline();
    this.soundFadeOut.add({
      targets: this.sound,
      volume: 0,
      duration: 1000,
    });
    timeline.play();
    this.sound.play();
    this.soundFadeIn.play();
  }

  showMenu() {
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    const bg = this.add.image(windowWidth / 2, windowHeight * 0.45, 'mainBG');
    bg.setScale((windowWidth * 0.7) / bg.width);
    const logoImg = this.add.image(windowWidth / 2, windowHeight * 0.35, 'logo');
    logoImg.setScale((windowWidth * 0.5) / logoImg.width);
    const playButton = this.add.text(windowWidth / 2, windowHeight * 0.55, 'START GAME', textConfig)
      .setOrigin(0.5)
      .setResolution(10)
      .setInteractive();
    playButton.triangle = this.add.image(playButton.x + 60, playButton.y, 'menuButton');
    playButton.triangle.alpha = 0;
    bg.alpha = 0;
    logoImg.alpha = 0;
    playButton.alpha = 0;

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
      targets: playButton,
      alpha: 1,
      duration: 1000,
    });
    showMenuTimeline.play();
    playButton.on('pointerover', () => {
      playButton.setColor('#ffffff');
      playButton.triangle.alpha = 1;
    });
    playButton.on('pointerout', () => {
      playButton.setColor('#3f3f3f');
      playButton.triangle.alpha = 0;
    });
    playButton.on('pointerdown', this.startGame);
  }

  startGame() {
    this.scene.cameras.main.fadeOut(1000);
    this.scene.soundFadeOut.play();
    this.scene.cameras.main.on('camerafadeoutcomplete', () => {
      this.scene.scene.switch('game-scene');
    });
  }
}
