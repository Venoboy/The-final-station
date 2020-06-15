/* eslint-disable linebreak-style */
import Phaser from 'phaser';
import HealtBar from './HealthBar';
import WeaponMagazine from './WeaponMagazine';

import gameBar from '../../assets/interface/gameBarFrame.png';
import bullet from '../../assets/interface/bullet.png';
import bulletEmpty from '../../assets/interface/bulletBG.png';
import eventsCenter from '../eventsCenter';

const magazineSize = 6;

export default class GameBar extends Phaser.Scene {
  constructor() {
    super('game-bar');
  }

  preload() {
    this.load.image('gameBar', gameBar);
    this.load.image('bullet', bullet);
    this.load.image('bulletEmpty', bulletEmpty);
  }

  create() {
    this.frame = this.add.image(0, 0, 'gameBar').setOrigin(0);
    const { width } = this.frame;
    const { height } = this.frame;
    const textHeight = this.cameras.main.height - height / 2 + 4;
    this.frame.setDisplaySize(width, height);
    this.frame.setPosition(
      this.cameras.main.centerX - width / 2, this.cameras.main.height - height,
    );

    this.health = this.add.text(165, textHeight, '2', { fontFamily: 'font1', fontSize: 18 }).setOrigin(0.5);
    this.bullets = this.add.text(400, textHeight, '6', { fontFamily: 'font1', fontSize: 18 }).setOrigin(0.5);
    this.food = this.add.text(575, textHeight, '2', { fontFamily: 'font1', fontSize: 18 }).setOrigin(0.5);
    this.keys = this.add.text(685, textHeight, '0', { fontFamily: 'font1', fontSize: 18 }).setOrigin(0.5);

    this.healtBar = new HealtBar(this, 180, textHeight - 8, 120);

    eventsCenter.on('update-health', this.updateHealth, this);
    eventsCenter.on('update-health-bar', this.updateHealthBar, this);
    eventsCenter.on('update-magazine', this.updateMagazine, this);

    /* стирает прослушивание событий после закрытия сцены */
    this.events.on(Phaser.Scenes.Events.SHUTDOWN, () => {
      eventsCenter.off('update-health', this.updateHealth, this);
      eventsCenter.off('update-health-bar', this.updateHealthBar, this);
    });

    const bulletImg = this.add.image(0, 0, 'bullet');
    const bulletBG = this.add.image(0, 0, 'bulletEmpty');
    this.magazine = new WeaponMagazine(
      this, magazineSize, magazineSize, 417, textHeight,
      bulletImg.texture, bulletBG.texture, bulletImg.width,
    );
    bulletImg.destroy();
    bulletBG.destroy();
  }

  updateHealth(health) {
    this.health.text = health;
  }

  updateHealthBar(health) {
    this.healtBar.update(health);
  }

  updateBullets(bullets) {
    this.bullets.text = bullets;
  }

  updateMagazine(bullets) {
    this.magazine.updateMagazine(bullets);
  }

  updateFood(food) {
    this.food.text = food;
  }

  updateKeys(keys) {
    this.keys.text = keys;
  }
}
