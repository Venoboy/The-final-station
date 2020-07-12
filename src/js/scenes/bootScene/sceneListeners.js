function resize() {
  const centerX = window.innerWidth / 2;
  const centerY = window.innerHeight / 2;
  this.title_logo_domy_img.setPosition(centerX, centerY);
  this.title_logo_tiny_img.setPosition(centerX, centerY);
}

const addSceneListeners = (scene) => {
  scene.scale.on('resize', resize, scene);
  scene.events.on('shutdown', () => {
    scene.scale.off('resize', resize, scene);
  });
};

export default addSceneListeners;
