/* eslint-disable camelcase */
import b_123 from '../../../assets/level0/b_123.png';
import f_123 from '../../../assets/level0/f_123.png';
import bak_1 from '../../../assets/level0/bak_1.png';
import bak_2 from '../../../assets/level0/bak_2.png';
import bak_3 from '../../../assets/level0/bak_3.png';
import bak_5 from '../../../assets/level0/bak_5.png';
import tunnel from '../../../assets/level0/tunnel.png';
import moons from '../../../assets/level0/backgr_3.png';
import bigZombie from '../../../assets/level0/enemies/bigDamSt.png';
import fastZombie from '../../../assets/level0/enemies/smallDamSt.png';
import door from '../../../assets/interaction-objects/Door3.png';
import door_ from '../../../assets/interaction-objects/Door1_.png';
import lid from '../../../assets/interaction-objects/Lid.png';
import locker from '../../../assets/interaction-objects/Locker.png';
import locker_ from '../../../assets/interaction-objects/Locker_.png';
import deadBody1 from '../../../assets/interaction-objects/DeadBody1.png';
import deadBody2 from '../../../assets/interaction-objects/DeadBody2.png';
import doorSound1 from '../../../assets/audio/door_met_1.mp3';
import doorSound3 from '../../../assets/audio/door_met_3.mp3';
import doorSound4 from '../../../assets/audio/door_met_4.mp3';
import lidSound from '../../../assets/audio/lid_open.mp3';
import lockerSound from '../../../assets/audio/locker_open.mp3';
import pickUpSound from '../../../assets/audio/pickUp.mp3';
import levelMusic from '../../../assets/audio/levelMusic.mp3';
import crowdTalks from '../../../assets/audio/crowd_talks.mp3';
import stream from '../../../assets/audio/stream.mp3';
import crowd_man from '../../../assets/level0/animationed-objects/crowd_man.png';
import hunter from '../../../assets/level0/animationed-objects/hunter.png';
import flies from '../../../assets/level0/animationed-objects/flies.png';
import animationPreload from '../../Player/animation/animationPreload';

const scenePreload = (scene) => {
  scene.load.image('moons', moons);
  scene.load.image('b_123', b_123);
  scene.load.image('f_123', f_123);
  scene.load.image('tunnel', tunnel);
  scene.load.image('bak_1', bak_1);
  scene.load.image('bak_2', bak_2);
  scene.load.image('bak_3', bak_3);
  scene.load.image('bak_5', bak_5);
  scene.load.image('door', door);
  scene.load.image('door_', door_);
  scene.load.image('lid', lid);
  scene.load.image('locker', locker);
  scene.load.image('locker_', locker_);
  scene.load.image('deadBody1', deadBody1);
  scene.load.image('deadBody2', deadBody2);


  scene.load.spritesheet('bigZombie', bigZombie, {
    frameWidth: 32,
    frameHeight: 32,
  });
  scene.load.spritesheet('smallZombie', fastZombie, {
    frameWidth: 32,
    frameHeight: 32,
  });



  scene.load.audio('doorSound1', doorSound1);
  scene.load.audio('doorSound3', doorSound3);
  scene.load.audio('doorSound4', doorSound4);
  scene.load.audio('lidSound', lidSound);
  scene.load.audio('lockerSound', lockerSound);
  scene.load.audio('pickUpSound', pickUpSound);
  scene.load.audio('levelMusic', levelMusic);
  scene.load.audio('crowdTalks', crowdTalks);
  scene.load.audio('stream', stream);

  scene.load.spritesheet('crowd_man', crowd_man, {
    frameWidth: 14,
    frameHeight: 26,
  });
  scene.load.spritesheet('hunter', hunter, {
    frameWidth: 24,
    frameHeight: 26,
  });
  scene.load.spritesheet('flies', flies, {
    frameWidth: 32,
    frameHeight: 32,
  });
  animationPreload(scene.scene.scene);
};

export default scenePreload;
