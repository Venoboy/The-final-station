/* eslint-disable linebreak-style */
const createPreloadImageEffect = (scene, image1, image2) => {
  const timeline = scene.tweens.createTimeline();
  timeline.add({
    targets: image1,
    alpha: 1,
    duration: 1000,
    yoyo: true,
    hold: 2000,
  });
  timeline.add({
    targets: image2,
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

const createFinalSceneEffects = (scene, texts, bg, musics, players) => {
  texts.forEach((text) => text.setAlpha(0));
  bg.forEach((bgImg) => bgImg.setAlpha(0));
  players.forEach((player) => player.setAlpha(0));
  const subscene1 = scene.tweens.createTimeline();
  const subscene2 = scene.tweens.createTimeline();
  const subscene3 = scene.tweens.createTimeline();
  const subscene4 = scene.tweens.createTimeline();
  const subscene5 = scene.tweens.createTimeline();
  subscene1.add({
    targets: texts[0],
    alpha: 1,
    duration: 2500,
  });
  subscene1.add({
    targets: musics[0],
    duration: 0,
    delay: 1000,
    inComplete: () => {
      musics[0].play();
    },
  });
  subscene1.add({
    targets: texts[0],
    alpha: 0,
    duration: 2500,
    delay: 1000,
    inComplete: () => {
      scene.cameras.main.fadeOut(2500);
      subscene2.play();
    },
  });
  subscene2.add({
    targets: scene,
    duration: 2500,
    delay: 2500,
    inStart: () => {
      [...bg, players[0]].forEach((obj) => obj.setAlpha(1));
      players[0].anims.play('sleep');
      scene.cameras.main.startFollow(players[0]);
      scene.cameras.main.setZoom(window.innerWidth / 450);
      scene.cameras.main.fadeIn(2500);
    },
  });
  subscene2.add({
    targets: musics[0],
    duration: 0,
    delay: 1000,
    inComplete: () => {
      musics[0].stop();
      subscene3.play();
    },
  });
  subscene3.add({
    targets: scene,
    duration: 2500,
    delay: 1000,
    inStart: () => {
      scene.cameras.main.fadeOut(2500);
    },
  });
  subscene3.add({
    targets: musics[1],
    duration: 1000,
    delay: 1000,
    inComplete: () => {
      musics[1].play();
      players[0].anims.stop('sleep');
      players[0].setAlpha(0);
      subscene4.play();
    },
  });
  subscene4.add({
    targets: scene,
    duration: 2500,
    delay: 1000,
    inStart: () => {
      scene.cameras.main.fadeIn(2500);
      players[1].setAlpha(1);
      players[1].anims.play('stay');
    },
  });
  subscene4.add({
    targets: scene,
    duration: 2500,
    inComplete: () => {
      scene.cameras.main.fadeOut(2500);
      scene.cameras.main.once('camerafadeoutcomplete', () => {
        [...bg, players[1]].forEach((obj) => obj.setAlpha(0));
        players[1].anims.stop('stay');
        subscene5.play();
      });
    },
  });
  subscene5.add({
    targets: texts[1],
    alpha: 1,
    duration: 2500,
    yoyo: true,
    hold: 2000,
    onStart: () => {
      scene.cameras.main.fadeIn(2500);
      scene.cameras.main.startFollow(texts[0]);
      scene.cameras.main.setZoom(1);
    },
    onComplete: () => {
      scene.scene.start('main-menu');
    },
  });
  return subscene1;
};

export {
  createPreloadImageEffect, createMainMenuImageEffect,
  createFinalSceneEffects,
};
