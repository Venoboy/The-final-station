

export default class PersonDeadAnimation {
  constructor(scene) {
    this.scene = scene;
  }

  create() {
    const deadanim = this.scene.add.sprite(0, 0, 'dead').setVisible(false);
    this.scene.anims.create({
      key: 'Dead',
      frames: this.scene.anims.generateFrameNumbers('dead', {
        start: 0,
        end: 9,
      }),
      frameRate: 7,
      repeat: 0,
      showOnStart: false,
      hideOnComplete: true,
    });
    this.scene.anims.create({
      key: 'DeadR',
      frames: this.scene.anims.generateFrameNumbers('dead', {
        start: 10,
        end: 19,
      }),
      frameRate: 7,
      repeat: 0,
      showOnStart: false,
      hideOnComplete: true,
    });
    this.scene.anims.create({
      key: 'end',
      frames: [{ key: 'dead', frame: 9 }],
      frameRate: 20,
    });
    this.scene.anims.create({
      key: 'endR',
      frames: [{ key: 'dead', frame: 19 }],
      frameRate: 20,
    });

    return deadanim;
  }
}
