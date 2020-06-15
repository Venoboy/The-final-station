/* eslint-disable linebreak-style */
import Phaser from 'phaser';

export default class WeaponMagazine {
  constructor(scene) {
    this.magazine = new Phaser.GameObjects.Group(scene);
  }
}
