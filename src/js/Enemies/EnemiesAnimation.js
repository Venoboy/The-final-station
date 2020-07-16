
const BigZombieAnimationCreate = (scene) => {
  scene.anims.create({
    key: 'stayLeft',
    frames: scene.anims.generateFrameNumbers('bigZombie', {
      start: 10,
      end: 13,
    }),
    frameRate: 10,
    repeat: -1,
  });
  scene.anims.create({
    key: 'stayRight',
    frames: scene.anims.generateFrameNumbers('bigZombie', {
      start: 6,
      end: 9,
    }),
    frameRate: 10,
    repeat: -1,
  });
  scene.anims.create({
    key: 'walkLeft',
    frames: scene.anims.generateFrameNumbers('bigZombie', {
      start: 14,
      end: 18,
    }),
    frameRate: 10,
    repeat: -1,
  });
  scene.anims.create({
    key: 'walkRight',
    frames: scene.anims.generateFrameNumbers('bigZombie', {
      start: 19,
      end: 23,
    }),
    frameRate: 10,
    repeat: -1,
  });
  scene.anims.create({
    key: 'atackLeft',
    frames: scene.anims.generateFrameNumbers('bigZombie', {
      start: 29,
      end: 33,
    }),
    frameRate: 10,
    repeat: -1,
  });
  scene.anims.create({
    key: 'atackRight',
    frames: scene.anims.generateFrameNumbers('bigZombie', {
      start: 24,
      end: 28,
    }),
    frameRate: 10,
    repeat: -1,
  });
  scene.anims.create({
    key: 'deadLeft',
    frames: scene.anims.generateFrameNumbers('bigZombie', {
      start: 42,
      end: 49,
    }),
    frameRate: 10,
    repeat: -1,
  });
  scene.anims.create({
    key: 'deadRight',
    frames: scene.anims.generateFrameNumbers('bigZombie', {
      start: 34,
      end: 41,
    }),
    frameRate: 10,
    repeat: -1,
  });
  scene.anims.create({
    key: 'damagedLeft',
    frames: scene.anims.generateFrameNumbers('bigZombie', {
      start: 0,
      end: 2,
    }),
    frameRate: 10,
    repeat: -1,
  });
  scene.anims.create({
    key: 'damagedLeft',
    frames: scene.anims.generateFrameNumbers('bigZombie', {
      start: 3,
      end: 5,
    }),
    frameRate: 10,
    repeat: -1,
  });
};

const SmallZombieAnimationCreate = (scene) => {
  scene.anims.create({
    key: 'stayLeft',
    frames: scene.anims.generateFrameNumbers('smallZombie', {
      start: 11,
      end: 15,
    }),
    frameRate: 10,
    repeat: -1,
  });
  scene.anims.create({
    key: 'stayRight',
    frames: scene.anims.generateFrameNumbers('smallZombie', {
      start: 6,
      end: 10,
    }),
    frameRate: 10,
    repeat: -1,
  });
  scene.anims.create({
    key: 'walkLeft',
    frames: scene.anims.generateFrameNumbers('smallZombie', {
      start: 36,
      end: 43,
    }),
    frameRate: 10,
    repeat: -1,
  });
  scene.anims.create({
    key: 'walkRight',
    frames: scene.anims.generateFrameNumbers('smallZombie', {
      start: 28,
      end: 35,
    }),
    frameRate: 10,
    repeat: -1,
  });
  scene.anims.create({
    key: 'atackLeft',
    frames: scene.anims.generateFrameNumbers('smallZombie', {
      start: 22,
      end: 27,
    }),
    frameRate: 10,
    repeat: -1,
  });
  scene.anims.create({
    key: 'atackRight',
    frames: scene.anims.generateFrameNumbers('smallZombie', {
      start: 16,
      end: 21,
    }),
    frameRate: 10,
    repeat: -1,
  });
  scene.anims.create({
    key: 'deadLeft',
    frames: scene.anims.generateFrameNumbers('smallZombie', {
      start: 50,
      end: 55,
    }),
    frameRate: 10,
    repeat: -1,
  });
  scene.anims.create({
    key: 'deadRight',
    frames: scene.anims.generateFrameNumbers('smallZombie', {
      start: 44,
      end: 49,
    }),
    frameRate: 10,
    repeat: -1,
  });
  scene.anims.create({
    key: 'damagedLeft',
    frames: scene.anims.generateFrameNumbers('smallZombie', {
      start: 0,
      end: 2,
    }),
    frameRate: 10,
    repeat: -1,
  });
  scene.anims.create({
    key: 'damagedLeft',
    frames: scene.anims.generateFrameNumbers('smallZombie', {
      start: 3,
      end: 5,
    }),
    frameRate: 10,
    repeat: -1,
  });
};

export { BigZombieAnimationCreate, SmallZombieAnimationCreate };
