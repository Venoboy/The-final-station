import heal from '../../assets/Player/Heal.png';
import reload from '../../assets/Player/Reload.png';

export default class PersonWithObjectAnimation {
  constructor(scene) {
    this.scene = scene;
  }

  preload() {
    this.scene.load.spritesheet('heal', heal, {
      frameWidth: 32,
      frameHeight: 32,
    });
    this.scene.load.spritesheet('reload', reload, {
      frameWidth: 32,
      frameHeight: 32,
    });
  }

  create() {
    const array = [this.scene.add.sprite(0, 0, 'heal').setVisible(false), this.scene.add.sprite(0, 0, 'reload').setVisible(false)];
    this.scene.anims.create({
      key: 'Heal',
      frames: this.scene.anims.generateFrameNumbers('heal', {
        start: 0,
        end: 25,
      }),
      frameRate: 8,
      repeat: 0,
      showOnStart: false,
      hideOnComplete: true,
    });
    this.scene.anims.create({
      key: 'HealR',
      frames: this.scene.anims.generateFrameNumbers('heal', {
        start: 26,
        end: 51,
      }),
      frameRate: 8,
      repeat: 0,
      showOnStart: false,
      hideOnComplete: true,
    });
    this.scene.anims.create({
      key: 'Reload',
      frames: this.scene.anims.generateFrameNumbers('reload', {
        start: 0,
        end: 15,
      }),
      frameRate: 8,
      repeat: 0,
      showOnStart: false,
      hideOnComplete: true,
    });
    this.scene.anims.create({
      key: 'ReloadR',
      frames: this.scene.anims.generateFrameNumbers('reload', {
        start: 16,
        end: 30,
      }),
      frameRate: 8,
      repeat: 0,
      showOnStart: false,
      hideOnComplete: true,
    });
    return array;
  }
}
