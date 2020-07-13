const addSceneEffect = (scene, ...images) => {
  images.forEach((image) => image.setAlpha(0));
  const timeline = scene.tweens.createTimeline();
  timeline.add({
    targets: images[0],
    alpha: 1,
    duration: 1000,
    yoyo: true,
    hold: 2000,
  });
  timeline.add({
    targets: images[1],
    alpha: 1,
    duration: 1000,
    delay: 1000,
    yoyo: true,
    hold: 2000,
    onComplete: () => {
      scene.scene.start('main-menu');
    },
  });
  return timeline;
};

export default addSceneEffect;
