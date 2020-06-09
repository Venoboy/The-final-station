/* eslint-disable linebreak-style */
/* eslint-disable camelcase */
import Phaser from 'phaser';
import b_1 from '../../assets/level0/b_1.png';
import b_2 from '../../assets/level0/b_2.png';
import b_3 from '../../assets/level0/b_3.png';
import bak_1 from '../../assets/level0/bak_1.png';
import bak_2 from '../../assets/level0/bak_2.png';
import bak_3 from '../../assets/level0/bak_3.png';
import bak_5 from '../../assets/level0/bak_5.png';
import moons from '../../assets/level0/backgr_3.png';

export default class Level extends Phaser.Scene {
  constructor() {
    super('game-scene');
  }

  init() {
    this.scale.scaleMode = Phaser.Scale.SHOW_ALL;
    this.scale.pageAlignVertically = true;
  }

  // eslint-disable-next-line class-methods-use-this
  preload() {
    this.load.image('moons', moons);
    this.load.image('b_1', b_1);
    this.load.image('b_2', b_2);
    this.load.image('b_3', b_3);
    this.load.image('bak_1', bak_1);
    this.load.image('bak_2', bak_2);
    this.load.image('bak_3', bak_3);
    this.load.image('bak_5', bak_5);
  }

  // eslint-disable-next-line class-methods-use-this
  create() {
    this.add.image(1020, 256, 'bak_2');
    this.add.image(648, 132, 'bak_1');
    this.add.image(655, 120, 'moons').setScrollFactor(1.1, 1);
    this.add.image(970, 315, 'bak_5').setScrollFactor(0.97, 1);
    this.add.image(263, 280, 'bak_1');
    this.add.image(0, 0, 'b_1').setOrigin(0);
    this.add.image(1000, 350, 'bak_3').setScrollFactor(0.95, 1);
    this.add.image(512, 0, 'b_2').setOrigin(0);
    this.add.image(1024, 0, 'b_3').setOrigin(0);


    this.cursors = this.input.keyboard.createCursorKeys();

    const controlConfig = {
      camera: this.cameras.main,
      left: this.cursors.left,
      right: this.cursors.right,
      up: this.cursors.up,
      down: this.cursors.down,
      zoomIn: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q),
      zoomOut: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E),
      acceleration: 0.02,
      drag: 0.0005,
      maxSpeed: 0.5,
    };

    this.controls = new Phaser.Cameras.Controls.SmoothedKeyControl(controlConfig);

    this.camera = this.cameras.main;
    this.camera.setBounds(0, 0, 1536, 512);
    this.camera.setZoom(2);


    //  Input Events
    // this.cursors = this.input.keyboard.createCursorKeys();
  }

  update(time, delta) {
    this.controls.update(delta);
  }
}
