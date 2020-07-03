import Phaser from 'phaser';

export default class Room {
  constructor(config) {
    this.id = config.id;
    this.opened = false;
    this.graphics = config.scene.add.graphics();
    this.room = new Phaser.Geom.Polygon(config.points);
    this.graphics.fillStyle(0x1e1e1e);
    this.graphics.fillPoints(this.room.points, true);
    this.openTween = config.scene.tweens.add({
      targets: this.graphics,
      paused: true,
      alpha: 0,
      duration: 1000,
    });
    this.closeTween = config.scene.tweens.add({
      targets: this.graphics,
      paused: true,
      alpha: 1,
      duration: 1000,
    });
  }

  close() {
    this.closeTween.play();
    this.opened = false;
  }

  open() {
    this.openTween.play();
    this.opened = true;
  }
}
