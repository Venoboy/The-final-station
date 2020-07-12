/* eslint-disable camelcase */

import title_logo_domy from '../../../assets/menu/title_logo_domy.png';
import title_logo_tiny from '../../../assets/menu/title_logo_tiny.png';
import mainBG from '../../../assets/menu/MainBG.png';
import logo from '../../../assets/menu/Logo.png';
import menuButton from '../../../assets/menu/MenuButton.png';
import menuSound from '../../../assets/audio/SoundtrackPorthWen.mp3';
import keyboard from '../../../assets/menu/keyboard_eng.png';

const preloadScene = (scene) => {
  scene.load.image('title_logo_domy', title_logo_domy);
  scene.load.image('title_logo_tiny', title_logo_tiny);
  scene.load.image('mainBG', mainBG);
  scene.load.image('logo', logo);
  scene.load.image('menuButton', menuButton);
  scene.load.image('keyboard', keyboard);
  scene.load.audio('menuSound', menuSound);
};

export default preloadScene;
