import gunImage from '../../../assets/Player/handwithgun.png';
import bulletImage from '../../../assets/Player/bullet.png';
import gunbackImage from '../../../assets/Player/handswithgunback.png';
import dudeImage from '../../../assets/Player/spr.png';
import dudeLegsImage from '../../../assets/Player/AllLegs.png';
import climb from '../../../assets/Player/climb.png';
import dead from '../../../assets/Player/Dead.png';
import heal from '../../../assets/Player/Heal.png';
import reload from '../../../assets/Player/Reload.png';
import startClimb from '../../../assets/Player/GoRightStair.png';

import playerFootstep from '../../../assets/audio/playerFootstep.mp3';
import ladder from '../../../assets/audio/ladder.mp3';
import ladder2 from '../../../assets/audio/ladder2.mp3';
import ladder3 from '../../../assets/audio/ladder3.mp3';
import ladder4 from '../../../assets/audio/ladder4.mp3';
import ladder5 from '../../../assets/audio/ladder5.mp3';
import ladder6 from '../../../assets/audio/ladder6.mp3';
import heroHeal from '../../../assets/audio/heroHeal.mp3';
import pistolReload from '../../../assets/audio/pistolReload.mp3';
import pistolShoot from '../../../assets/audio/pistolShoot.mp3';

const animationPreload = (scene) => {
  scene.load.image('gun', gunImage);
  scene.load.image('bullet', bulletImage);
  scene.load.image('gunback', gunbackImage);
  scene.load.spritesheet('dude', dudeImage, {
    frameWidth: 32,
    frameHeight: 32,
  });
  scene.load.spritesheet('dudeLegs', dudeLegsImage, {
    frameWidth: 32,
    frameHeight: 32,
  });
  scene.load.spritesheet('climbing', climb, {
    frameWidth: 32,
    frameHeight: 32,
  });
  scene.load.spritesheet('dead', dead, {
    frameWidth: 32,
    frameHeight: 32,
  });
  scene.load.spritesheet('heal', heal, {
    frameWidth: 32,
    frameHeight: 32,
  });
  scene.load.spritesheet('reload', reload, {
    frameWidth: 32,
    frameHeight: 32,
  });
  scene.load.spritesheet('startClimb', startClimb, {
    frameWidth: 32,
    frameHeight: 32,
  });

  scene.load.audio('playerFootstep', playerFootstep);
  scene.load.audio('ladder', ladder);
  scene.load.audio('ladder2', ladder2);
  scene.load.audio('ladder3', ladder3);
  scene.load.audio('ladder4', ladder4);
  scene.load.audio('ladder5', ladder5);
  scene.load.audio('ladder6', ladder6);
  scene.load.audio('heroHeal', heroHeal);
  scene.load.audio('pistolShoot', pistolShoot);
  scene.load.audio('pistolReload', pistolReload);
};

export default animationPreload;
