
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
      frameRate: 12,
      repeat: 0,
      showOnStart: true,
      hideOnComplete: false,
    });
    this.scene.anims.create({
      key: 'DeadR',
      frames: this.scene.anims.generateFrameNumbers('dead', {
        start: 10,
        end: 19,
      }),
      frameRate: 12,
      repeat: 0,
      showOnStart: true,
      hideOnComplete: false,
    });
    // this.scene.anims.create({
    //   key: 'end',
    //   frames: [{ key: 'dead', frame: 9 }],
    //   frameRate: 5,
    // });
    // this.scene.anims.create({
    //   key: 'endR',
    //   frames: [{ key: 'dead', frame: 19 }],
    //   frameRate: 5,
    // });

    return deadanim;
  }
}
