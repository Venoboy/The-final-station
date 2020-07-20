/* eslint-disable camelcase */
import Phaser from 'phaser';
import scenePreload from './scenePreload';
import addSceneListeners from './sceneListeners';

import PlayerInteraction from '../../Player/PlayerInteraction';
import EnemyLoader from '../../Enemies/EnemyLoader';
import { stats } from '../../Player/playerStates/stats';
import groundCreation from '../../objects/ground/groundCreation';
import stairsCreation from '../../objects/stairs/stairsCreation';
import createControls from '../../Player/controls/controls';
import {
  setInteractionObjects, setRooms, setSoundSensors, setTunnel,
  setAnimatedObjects, setBackgroundImages, setFrontImages,
} from './sceneSetters';
import eventsCenter from '../../eventsCenter';

export default class GameScene extends Phaser.Scene {
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
    scenePreload(this);
  }

  create() {
    eventsCenter.emit('start-game');
    setBackgroundImages(this);
    setAnimatedObjects(this);
    setInteractionObjects(this);

    this.cursors = createControls(this);
    this.playerInteraction = new PlayerInteraction(this);
    this.playerInteraction.create();

    groundCreation(this);
    stairsCreation(this);

    this.enemyLoader = new EnemyLoader(this.scene.scene, this.playerInteraction.playerInstance);
    this.enemyLoader.create();

    setFrontImages(this);
    setTunnel(this, this.playerInteraction.playerInstance.mainBody);
    setRooms(this);

    this.soundSensors = setSoundSensors(this, this.playerInteraction.player);
    this.music = this.sound.add('levelMusic');
    this.music.loop = true;
    this.music.play(); // откл. звук

    const startValues = {
      aids: stats.aids,
      food: stats.food,
      keys: stats.keys,
      bullets: stats.bullets,
    };
    this.scene.launch('game-bar', startValues);
    this.cameras.main.setBounds(0, 0, 1536, 512);
    this.cameras.main.fadeIn(2500);
    this.pauseKey = this.input.keyboard.addKey(27);
    addSceneListeners(this);
  }

  update() {
    this.playerInteraction.update();
    this.enemyLoader.update();
    this.soundSensors.forEach((soundSensor) => soundSensor.checkDistance());
  }
}
