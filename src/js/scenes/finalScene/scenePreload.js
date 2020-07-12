/* eslint-disable camelcase */

import gg_sleep from '../../../assets/finalScene/gg_sleep.png';
import gg_stay from '../../../assets/finalScene/gg_stay.png';
import house from '../../../assets/finalScene/house.png';
import b0 from '../../../assets/finalScene/b0.png';
import b1 from '../../../assets/finalScene/b1.png';
import alarm from '../../../assets/audio/alarm clock.mp3';
import getReadySound from '../../../assets/audio/pickUp.mp3';

const preloadScene = (scene) => {
  scene.load.spritesheet('gg_sleep', gg_sleep, {
    frameWidth: 34,
    frameHeight: 27,
  });
  scene.load.spritesheet('gg_stay', gg_stay, {
    frameWidth: 32,
    frameHeight: 35,
  });
  scene.load.image('gg_house', house);
  scene.load.image('b1', b1);
  scene.load.image('b0', b0);
  scene.load.audio('alarm', alarm);
  scene.load.audio('getReadySound', getReadySound);
};

export default preloadScene;
