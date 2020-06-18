/* eslint-disable camelcase */
import Phaser from 'phaser';

import PlayerInteraction from '../Player/PlayerInteraction';
import b_1 from '../../assets/level0/b_1.png';
import b_2 from '../../assets/level0/b_2.png';
import b_3 from '../../assets/level0/b_3.png';
import bak_1 from '../../assets/level0/bak_1.png';
import bak_2 from '../../assets/level0/bak_2.png';
import bak_3 from '../../assets/level0/bak_3.png';
import bak_5 from '../../assets/level0/bak_5.png';
import moons from '../../assets/level0/backgr_3.png';
import hunter from '../../assets/level0/hunter_1_0.png';

export default class Level extends Phaser.Scene {
  constructor() {
    super('game-scene');
    this.playerInteraction = {};
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
    this.load.image('hunterImg', hunter);

    this.playerInteraction = new PlayerInteraction(this.scene.scene);
    this.playerInteraction.preload();
  }

  // eslint-disable-next-line class-methods-use-this
  create() {
    this.add.image(1020, 256, 'bak_2');
    this.add.image(648, 132, 'bak_1');
    this.add.image(695, 120, 'moons').setScrollFactor(1.15, 1);
    this.add.image(900, 315, 'bak_5').setScrollFactor(0.9, 1);
    this.add.image(263, 280, 'bak_1');
    this.add.image(0, 0, 'b_1').setOrigin(0);
    this.add.image(950, 350, 'bak_3').setScrollFactor(0.9, 1);
    this.add.image(511, 0, 'b_2').setOrigin(0);
    this.add.image(1023, 0, 'b_3').setOrigin(0);

    this.add.image(10, 10, 'hunterImg').setOrigin(0);

    this.playerInteraction.create();
  }

  update() {
    this.playerInteraction.update();
  }
}
