import Phaser from 'phaser';

import MultiKey from './multi-key';

const createControls = (scene) => {
  const controls = {};

  // записать код нужной клавиши
  const {
    LEFT, RIGHT, UP, DOWN, A, S, D, W, E,
  } = Phaser.Input.Keyboard.KeyCodes;
  // присвоить экземпляр класса с нужными клавишами
  controls.left = new MultiKey(scene, [LEFT, A]);
  controls.right = new MultiKey(scene, [RIGHT, D]);
  controls.up = new MultiKey(scene, [UP, W]);
  controls.down = new MultiKey(scene, [DOWN, S]);
  controls.e = new MultiKey(scene, E);

  return controls;
};

export default createControls;
