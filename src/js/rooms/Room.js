export default class Room {
  constructor(config) {
    this.id = config.id;
    this.opened = true;
    this.room = config.scene.add.rectangle(config.x, config.y, config.w, config.h, 0x1e1e1e, 0);
    this.openTween = config.scene.tweens.add({
      targets: this.room,
      paused: true,
      alpha: 0,
      duration: 1500,
    });
    this.CloseTween = config.scene.tweens.add({
      targets: this.room,
      paused: true,
      alpha: 1,
      duration: 1500,
    });
  }

  close() {
    this.CloseTween.play();
  }

  open() {
    this.openTween.play();
  }
}
