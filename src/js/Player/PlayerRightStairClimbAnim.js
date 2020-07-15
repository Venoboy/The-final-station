import startClimb from '../../assets/Player/GoRightStair.png';

export default class PersonStartClimbAnimation {
  constructor(scene) {
    this.scene = scene;
  }

  preload() {
    this.scene.load.spritesheet('startClimb', startClimb, {
      frameWidth: 32,
      frameHeight: 32,
    });
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
      frameRate: 7,
      repeat: 0,
      showOnStart: false,
      hideOnComplete: true,
    });


    return stairClimbAnim;
  }
}
