import Phaser from 'phaser';
import HealtBar from './HealthBar';
import WeaponMagazine from './WeaponMagazine';
import { stats } from '../Player/playerStates/stats';

import gameBar from '../../assets/interface/gameBarFrame.png';
import bulletImg from '../../assets/interface/bullet.png';
import bulletBG from '../../assets/interface/bulletBG.png';
import addSceneListeners from './sceneListeners';

const textConfig = {
  fontFamily: 'font1',
  fontSize: 24,
};

export default class GameBar extends Phaser.Scene {
  constructor() {
    super('game-bar');
  }

  preload() {
    this.cameras.main.fadeOut(0);
    this.load.image('gameBar', gameBar);
    this.load.image('bulletImg', bulletImg);
    this.load.image('bulletBG', bulletBG);
    this.game.sound.context.resume();
  }

  create() {
    this.addItems();
    addSceneListeners(this);
    this.cameras.main.fadeIn(2500);
  }

  addItems() {
    this.frame = this.add.image(0, 0, 'gameBar').setScale(0.8);
    this.healthBar = new HealtBar(this, 0, 0);
    this.magazine = new WeaponMagazine(this, stats.magazineSize, stats.magazineSize, 0, 0);
    this.aids = this.add.text(0, 0, stats.aids, textConfig).setOrigin(0.5);
    this.bullets = this.add.text(0, 0, stats.bullets, textConfig).setOrigin(0.5);
    this.food = this.add.text(0, 0, stats.food, textConfig).setOrigin(0.5);
    this.keys = this.add.text(0, 0, stats.keys, textConfig).setOrigin(0.5);
  }

  calculateOffset(percentageOffset) {
    return (window.innerWidth - this.frame.displayWidth) / 2
    + (percentageOffset * this.frame.displayWidth);
  }

  updateAids(aids) {
    this.aids.text = aids;
  }

  updateHealthBar(health) {
    this.healthBar.update(health);
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

  updateStocks(aids, bullets, food, keys) {
    this.updateAids(aids);
    this.updateBullets(bullets);
    this.updateFood(food);
    this.updateKeys(keys);
  }
}
