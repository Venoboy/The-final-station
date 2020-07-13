const createSoundFadeIn = (scene, sound, duration, delay = 0) => {
  return scene.tweens.add({
    targets: sound,
    volume: 1,
    duration,
    delay,
    paused: true,
  });
};

const createSoundFadeOut = (scene, sound, duration, delay = 0) => {
  return scene.tweens.add({
    targets: sound,
    volume: 0,
    duration,
    delay,
    paused: true,
  });
};

export { createSoundFadeIn, createSoundFadeOut };
