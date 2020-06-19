/* eslint-disable linebreak-style */
import Phaser from 'phaser';
import HealtBar from './HealthBar';
import WeaponMagazine from './WeaponMagazine';

import gameBar from '../../assets/interface/gameBarFrame.png';
import bullet from '../../assets/interface/bullet.png';
import bulletEmpty from '../../assets/interface/bulletBG.png';
import eventsCenter from '../eventsCenter';

const baseCanvasWidth = 1128;
const magazineSize = 6;
const textConfig = {
  fontFamily: 'font1',
  fontSize: 18,
};
/* x positions of game bar items */
// const itemsX = {
//   healthText: 165,
//   healthBar: 180,
//   weaponText: 400,
//   weaponMagazine: 420,
//   foodText: 575,
//   keysText: 685,
// };
const itemsX = {
  healthText: 165,
  healthBar: 180,
  weaponText: 400,
  weaponMagazine: 420,
  foodText: 575,
  keysText: 685,
};
/* default values of game bar items */
const defaultValues = {
  health: 2,
  bullets: magazineSize,
  food: 2,
  keys: 0,
};

export default class GameBar extends Phaser.Scene {
  constructor() {
    super('game-bar');
  }

  init(startValues) {
    this.startValues = startValues || defaultValues;
  }

  preload() {
    this.load.image('gameBar', gameBar);
    this.load.image('bullet', bullet);
    this.load.image('bulletEmpty', bulletEmpty);
  }

  create() {
    this.frame = this.add.image(0, 0, 'gameBar').setScale(0.6);
    const zoom = baseCanvasWidth / document.querySelector('canvas').style.width.slice(0, -2);
    const yOffset = (this.cameras.main.height - (this.cameras.main.height / zoom)) / 2;
    this.cameras.main.setZoom(zoom);
    const frameCenterY = this.cameras.main.height - (this.frame.displayHeight / 2) - yOffset;
    this.frame.setPosition(
      this.cameras.main.centerX, frameCenterY,
    );

    this.addTextItems(frameCenterY);
    this.healtBar = new HealtBar(this, itemsX.healthBar, frameCenterY - 5);
    this.addMagazine(frameCenterY + 2);

    /* adding events to connect this scene with game scene */
    eventsCenter.on('update-health', this.updateHealth, this);
    eventsCenter.on('update-health-bar', this.updateHealthBar, this);
    eventsCenter.on('update-magazine', this.updateMagazine, this);

    /* destroing events when this game will be shutdowned */
    this.events.on(Phaser.Scenes.Events.SHUTDOWN, () => {
      eventsCenter.off('update-health', this.updateHealth, this);
      eventsCenter.off('update-health-bar', this.updateHealthBar, this);
    });
  }

  addTextItems(frameCenterY) {
    const itemsCenterY = frameCenterY + 3;
    this.health = this.add.text(
      itemsX.healthText, itemsCenterY, this.startValues.health, textConfig,
    ).setOrigin(0.5);
    this.bullets = this.add.text(
      itemsX.weaponText, itemsCenterY, this.startValues.bullets, textConfig,
    ).setOrigin(0.5);
    this.food = this.add.text(
      itemsX.foodText, itemsCenterY, this.startValues.food, textConfig,
    ).setOrigin(0.5);
    this.keys = this.add.text(
      itemsX.keysText, itemsCenterY, this.startValues.keys, textConfig,
    ).setOrigin(0.5);
  }

  addMagazine(frameCenterY) {
    const bulletImg = this.add.image(0, 0, 'bullet');
    const bulletBG = this.add.image(0, 0, 'bulletEmpty');
    this.magazine = new WeaponMagazine(
      this, magazineSize, magazineSize, itemsX.weaponMagazine, frameCenterY,
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
