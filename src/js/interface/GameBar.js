/* eslint-disable linebreak-style */
import Phaser from 'phaser';

import gameBar from '../../assets/interface/gameBarFrame.png';
import eventsCenter from '../eventsCenter';

// const maxHealth = 100;

export default class GameBar extends Phaser.Scene {
  constructor() {
    super('game-bar');
  }

  preload() {
    this.load.image('gameBar', gameBar);
  }

  create() {
    this.frame = this.add.image(0, 0, 'gameBar').setOrigin(0);
    const width = 0.6 * this.frame.width;
    const height = 0.6 * this.frame.height;
    const textHeight = this.cameras.main.height - height / 2 + 3;
    this.frame.setDisplaySize(width, height);
    // eslint-disable-next-line max-len
    this.frame.setPosition(this.cameras.main.centerX - width / 2, this.cameras.main.height - height);

    this.health = this.add.text(165, textHeight, '2', { fontFamily: 'font1', fontSize: 18 }).setOrigin(0.5);
    this.bullets = this.add.text(400, textHeight, '6', { fontFamily: 'font1', fontSize: 18 }).setOrigin(0.5);
    this.food = this.add.text(575, textHeight, '2', { fontFamily: 'font1', fontSize: 18 }).setOrigin(0.5);
    this.keys = this.add.text(685, textHeight, '0', { fontFamily: 'font1', fontSize: 18 }).setOrigin(0.5);

    eventsCenter.on('update-health', this.updateHealth, this);

    /* стирает прослушывание событий после закрытия сцены */
    this.events.on(Phaser.Scenes.Events.SHUTDOWN, () => {
      eventsCenter.off('update-health', this.updateCount, this);
    });
  }

  updateHealth(health) {
    this.health.text = health;
  }
}
