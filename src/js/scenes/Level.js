/* eslint-disable camelcase */
/* Для отключения музыки уровня закомменте строку 128 */
import Phaser from 'phaser';

import PlayerInteraction from '../Player/PlayerInteraction';
import EnemyLoader from '../Enemies/EnemyLoader';
import { stats } from '../Player/playerStates/stats';
import groundCreation from '../objects/ground/groundCreation';
import stairsCreation from '../objects/stairs/stairsCreation';

import b_123 from '../../assets/level0/b_123.png';
import f_123 from '../../assets/level0/f_123.png';
import bak_1 from '../../assets/level0/bak_1.png';
import bak_2 from '../../assets/level0/bak_2.png';
import bak_3 from '../../assets/level0/bak_3.png';
import bak_5 from '../../assets/level0/bak_5.png';
import tunnel from '../../assets/level0/tunnel.png';
import moons from '../../assets/level0/backgr_3.png';
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
import {
  setInteractionObjects, setRooms, setTunnel, setSoundSensors,
} from '../setters/level0';

import doorSound1 from '../../assets/audio/door_met_1.mp3';
import doorSound3 from '../../assets/audio/door_met_3.mp3';
import doorSound4 from '../../assets/audio/door_met_4.mp3';
import lidSound from '../../assets/audio/lid_open.mp3';
import lockerSound from '../../assets/audio/locker_open.mp3';
import pickUpSound from '../../assets/audio/pickUp.mp3';
import levelMusic from '../../assets/audio/levelMusic.mp3';
import crowdTalks from '../../assets/audio/crowd_talks.mp3';
import stream from '../../assets/audio/stream.mp3';

const heightPerScreen = 450;

export default class Level extends Phaser.Scene {
  constructor() {
    super('game-scene');
    this.playerInteraction = {};
    this.enemyLoader = {};
  }

  init() {
    this.scale.pageAlignVertically = false;
  }

  preload() {
    this.cameras.main.fadeOut(0);
    this.load.image('moons', moons);
    this.load.image('b_123', b_123);
    this.load.image('f_123', f_123);
    this.load.image('tunnel', tunnel);
    this.load.image('bak_1', bak_1);
    this.load.image('bak_2', bak_2);
    this.load.image('bak_3', bak_3);
    this.load.image('bak_5', bak_5);
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

    this.load.audio('doorSound1', doorSound1);
    this.load.audio('doorSound3', doorSound3);
    this.load.audio('doorSound4', doorSound4);
    this.load.audio('lidSound', lidSound);
    this.load.audio('lockerSound', lockerSound);
    this.load.audio('pickUpSound', pickUpSound);
    this.load.audio('levelMusic', levelMusic);
    this.load.audio('crowdTalks', crowdTalks);
    this.load.audio('stream', stream);

    this.playerInteraction = new PlayerInteraction(this.scene.scene);
    this.playerInteraction.preload();
  }

  create() {
    const moonsOffset = 130 + window.innerWidth * 0.4;
    this.add.image(1020, 256, 'bak_2');
    this.add.image(648, 132, 'bak_1');
    this.add.image(moonsOffset, 120, 'moons').setScrollFactor(0.2, 1);
    this.add.image(900, 315, 'bak_5').setScrollFactor(0.9, 1);
    this.add.image(263, 280, 'bak_1').setScrollFactor(0.9, 1);
    this.add.image(950, 350, 'bak_3').setScrollFactor(0.9, 1);
    this.add.image(768, 256, 'b_123');

    setInteractionObjects(this);

    this.cursors = this.input.keyboard.createCursorKeys();

    this.playerInteraction.create();

    groundCreation(this);

    stairsCreation(this);

    const startValues = {
      health: stats.aids,
      food: stats.food,
      keys: stats.keys,
      bullets: stats.bullets,
    };

    this.enemyLoader = new EnemyLoader(this.scene.scene, this.playerInteraction.playerInstance);
    this.enemyLoader.create();

    this.camera = this.cameras.main;
    this.camera.setBounds(0, 0, 1536, 512);
    this.camera.setZoom(this.camera.width / heightPerScreen);

    this.add.image(768, 256, 'f_123');
    setRooms(this);
    setTunnel(this, this.playerInteraction.playerInstance.mainBody);

    this.music = this.sound.add('levelMusic');
    this.music.loop = true;
    // this.music.play(); // откл. звук

    this.soundSensors = setSoundSensors(this, this.playerInteraction.player);

    this.cameras.main.fadeIn(2500);
    this.scene.launch('game-bar', startValues);

    this.pauseKey = this.input.keyboard.addKey(27);
    this.pauseKey.on('up', this.pause, this);

    this.events.on('resume', () => {
      this.music.play();
    });
    this.events.on('pause', () => {
      this.music.pause();
    });
    this.events.on('shutdown', () => {
      this.pauseKey.off('up', this.pause, this);
      this.music.stop();
    });
  }

  pause() {
    this.scene.pause();
    this.scene.launch('pause-menu');
  }

  update() {
    this.playerInteraction.update();
    this.enemyLoader.update();
    this.soundSensors.forEach((soundSensor) => soundSensor.checkDistance());
  }
}
