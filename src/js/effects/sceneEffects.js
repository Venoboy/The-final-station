const createPreloadImageEffect = (scene, image1, image2) => {
  const timeline = scene.tweens.createTimeline();
  timeline.add({
    targets: image1,
    alpha: 1,
    duration: 1000,
  });
  timeline.add({
    targets: image1,
    alpha: 0,
    duration: 1000,
    delay: 2000,
  });
  timeline.add({
    targets: image2,
    alpha: 1,
    duration: 1000,
    delay: 1000,
  });
  timeline.add({
    targets: image2,
    alpha: 0,
    duration: 1000,
    delay: 2000,
    onComplete: () => {
      scene.scene.start('main-menu');
    },
  });
  return timeline;
};

const createMainMenuImageEffect = (scene, bg, logo, button) => {
  const timeline = scene.tweens.createTimeline();
  timeline.add({
    targets: bg,
    alpha: 1,
    duration: 1000,
  });
  timeline.add({
    targets: logo,
    alpha: 1,
    duration: 1000,
  });
  timeline.add({
    targets: button,
    alpha: 1,
    duration: 1000,
  });
  return timeline;
};

export {
  createPreloadImageEffect, createMainMenuImageEffect,
};
