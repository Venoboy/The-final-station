import gunImage from '../../../assets/Player/handwithgun.png';
import bulletImage from '../../../assets/Player/bullet.png';
import gunbackImage from '../../../assets/Player/handswithgunback.png';
import dudeImage from '../../../assets/Player/spr.png';
import dudeLegsImage from '../../../assets/Player/AllLegs.png';
import climb from '../../../assets/Player/climb.png';

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
};

export default animationPreload;
