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

const createFinalSceneEffects = (scene, text, showScene) => {
  const timeline = scene.tweens.createTimeline();
  timeline.add({
    targets: text,
    alpha: 1,
    duration: 2500,
    inComplete: () => {
      scene.cameras.main.fadeIn(2500);
    },
  });
  timeline.add({
    targets: text,
    alpha: 1,
    duration: 2000,
    inComplete: () => {
      scene.cameras.main.fadeOut(2500);
    },
    delay: 2500,
  });
  timeline.add({
    targets: text,
    alpha: 1,
    duration: 0,
    inComplete: () => {
      text.destroy();
      showScene(scene);
    },
    delay: 2500,
  });
  return timeline;
};

export {
  createPreloadImageEffect, createMainMenuImageEffect,
  createFinalSceneEffects,
};
