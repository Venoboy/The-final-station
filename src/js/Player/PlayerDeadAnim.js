import dead from '../../assets/Player/Dead.png';

export default class PersonDeadAnimation {
  constructor(scene) {
    this.scene = scene;
  }

  preload() {
    this.scene.load.spritesheet('dead', dead, {
      frameWidth: 32,
      frameHeight: 32,
    });
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
    return deadanim;
  }
}
