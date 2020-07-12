function resize() {
  const centerX = window.innerWidth / 2;
  const centerY = window.innerHeight / 2;

  this.continueButton.button.setPosition(centerX - 5, centerY * 0.9);
  this.returnToMainMenuButtom.button.setPosition(centerX, centerY * 0.9 + 50);
  this.pauseLogo.setPosition(centerX, centerY * 0.4);
  this.keyboard.setPosition(centerX, centerY * 1.6);
}

function continueGame() {
  this.scene.resume('game-scene');
  this.scene.stop();
}

const addSceneListeners = (scene) => {
  scene.continueKey.on('up', continueGame, scene);

  scene.scale.on('resize', resize, scene);
  scene.events.on('shutdown', () => {
    scene.scale.off('resize', resize, scene);
  });
};

export default addSceneListeners;
