/* eslint-disable linebreak-style */
/* eslint-disable camelcase */
import Phaser from 'phaser';

import b123 from '../../assets/level0/b_123.png';
import f123 from '../../assets/level0/f_123.png';
import PlayerInteraction, { stairsArray } from '../Player/PlayerInteraction';
import EnemyLoader from '../Enemies/EnemyLoader';
import { stats } from '../Player/playerStates/stats';
import bak_1 from '../../assets/level0/bak_1.png';
import bak_2 from '../../assets/level0/bak_2.png';
import bak_3 from '../../assets/level0/bak_3.png';
import bak_5 from '../../assets/level0/bak_5.png';
import moons from '../../assets/level0/backgr_3.png';
import tunnel from '../../assets/level0/tunnel.png';
import hunterPath from '../../assets/level0/hunter_1_0.png';
import bigEnemyPic from '../../assets/level0/enemies/BigZombie Idle_02.png';
import fastEnemyPic from '../../assets/level0/enemies/FastZombie Idle_03.png';
import door from '../../assets/interaction-objects/Door3.png';
import door_ from '../../assets/interaction-objects/Door1_.png';
import lid from '../../assets/interaction-objects/Lid.png';
import locker from '../../assets/interaction-objects/Locker.png';
import locker_ from '../../assets/interaction-objects/Locker_.png';
import deadBody1 from '../../assets/interaction-objects/DeadBody1.png';
import deadBody2 from '../../assets/interaction-objects/DeadBody2.png';
import { setInteractionObjects, setRooms, setTunnel } from '../setters/level0';

const heightPerScreen = 450;

export default class Level extends Phaser.Scene {
  constructor() {
    super('game-scene');
    this.playerInteraction = {};
    this.enemyLoader = {};
    this.path = '';
    this.follower = '';
    this.graphics = '';
  }

  init() {
    this.scale.pageAlignVertically = false;
  }

  preload() {
    this.load.image('b123', b123);
    this.load.image('f123', f123);
    this.load.image('moons', moons);
    this.load.image('bak_1', bak_1);
    this.load.image('bak_2', bak_2);
    this.load.image('bak_3', bak_3);
    this.load.image('bak_5', bak_5);

    this.load.image('tunnel', tunnel);
    this.load.image('door', door);
    this.load.image('door_', door_);
    this.load.image('lid', lid);
    this.load.image('locker', locker);
    this.load.image('locker_', locker_);
    this.load.image('deadBody1', deadBody1);
    this.load.image('deadBody2', deadBody2);

    this.load.image('hero', hunterPath);
    this.load.image('enemyBig', bigEnemyPic);
    this.load.image('enemyFast', fastEnemyPic);
  }

  create() {
    this.add.image(1020, 256, 'bak_2');
    this.add.image(648, 132, 'bak_1');
    this.add.image(760, 120, 'moons').setScrollFactor(0.13, 1);
    this.add.image(900, 315, 'bak_5').setScrollFactor(0.9, 1);
    this.add.image(263, 280, 'bak_1').setScrollFactor(0.9, 1);
    this.add.image(950, 350, 'bak_3').setScrollFactor(0.9, 1);
    this.add.image(768, 256, 'b123');

    this.interactionObjects = setInteractionObjects(this);

    this.cursors = this.input.keyboard.createCursorKeys();

    this.playerInteraction = new PlayerInteraction(this.scene.scene);
    this.playerInteraction.create();

    const startValues = {
      health: stats.aids,
      food: stats.food,
      keys: stats.keys,
      bullets: stats.bullets,
    };

    this.scene.launch('game-bar', startValues);

    this.enemyLoader = new EnemyLoader(
      this.scene.scene, this.playerInteraction.playerInstance, stairsArray,
    );
    this.enemyLoader.create();

    this.camera = this.cameras.main;
    this.camera.setBounds(0, 0, 1280, 512);
    this.camera.setZoom(this.camera.width / heightPerScreen);

    this.add.image(768, 256, 'f123');
    setRooms(this);
    setTunnel(this, this.playerInteraction.playerInstance.mainBody);
  }

  update() {
    this.playerInteraction.update();
    this.enemyLoader.update();
  }
}
