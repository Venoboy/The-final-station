function resize() {
  const centerX = window.innerWidth / 2;
  const centerY = window.innerHeight / 2;

  this.bg.setPosition(centerX, centerY * 0.9);
  this.logoImg.setPosition(centerX, centerY * 0.7);
  this.playButton.button.setPosition(centerX, centerY * 1.1);
}

const addSceneListeners = (scene) => {
  scene.scale.on('resize', resize, scene);
  scene.events.on('shutdown', () => {
    scene.scale.off('resize', resize, scene);
  });
};

export default addSceneListeners;
