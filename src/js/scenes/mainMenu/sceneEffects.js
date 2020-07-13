const addSceneEffect = (scene, ...images) => {
  images.forEach((image) => image.setAlpha(0));
  const timeline = scene.tweens.createTimeline();
  timeline.add({
    targets: images[0],
    alpha: 1,
    duration: 1000,
  });
  timeline.add({
    targets: images[1],
    alpha: 1,
    duration: 1000,
  });
  timeline.add({
    targets: images[2],
    alpha: 1,
    duration: 1000,
  });
  return timeline;
};

export default addSceneEffect;
