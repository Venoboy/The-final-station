

export default class PersonStartClimbAnimation {
  constructor(scene) {
    this.scene = scene;
  }


  create() {
    const stairClimbAnim = this.scene.add.sprite(0, 0, 'startClimb').setVisible(false);
    this.scene.anims.create({
      key: 'Down',
      frames: this.scene.anims.generateFrameNumbers('startClimb', {
        start: 0,
        end: 7,
      }),
      frameRate: 6,
      repeat: 0,
      showOnStart: false,
      hideOnComplete: true,
    });
    this.scene.anims.create({
      key: 'Up',
      frames: this.scene.anims.generateFrameNumbers('startClimb', {
        start: 9,
        end: 15,
      }),
      frameRate: 6,
      repeat: 0,
      showOnStart: false,
      hideOnComplete: true,
    });


    return stairClimbAnim;
  }
}
