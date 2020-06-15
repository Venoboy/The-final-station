/* eslint-disable linebreak-style */

export default class WeaponMagazine {
  constructor(scene, magazineSize, bulletsNumber, x, y, bulletTexture, bgTexture, bulletWidth) {
    this.scene = scene;
    this.magazineSize = magazineSize;
    this.x = x;
    this.y = y;
    this.bulletTexture = bulletTexture;
    this.bgTexture = bgTexture;
    this.bullets = [];
    this.bg = [];
    this.bulletWidth = bulletWidth;
    this.bulletsNumber = bulletsNumber;
    this.init();
  }

  init() {
    for (let i = 0; i < this.magazineSize; i += 1) {
      this.bg.push(this.scene.add.image(this.x + i * this.bulletWidth, this.y, this.bgTexture));
    }
    for (let i = 0; i < this.bulletsNumber; i += 1) {
      this.bullets.push(
        this.scene.add.image(this.x + i * this.bulletWidth, this.y, this.bulletTexture),
      );
    }
  }

  updateMagazine(bulletsNumber) {
    this.bulletsNumber = bulletsNumber;
    this.bullets.slice(0, this.bulletsNumber).forEach((bullet) => bullet.setVisible(true));
    this.bullets.slice(this.bulletsNumber).forEach((bullet) => bullet.setVisible(false));
  }
}
