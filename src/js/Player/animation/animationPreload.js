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


};

export default animationPreload;
