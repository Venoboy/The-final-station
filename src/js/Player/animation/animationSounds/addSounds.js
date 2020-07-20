const addSounds = (scene) => {
  const sounds = {
    footstep: scene.sound.add('playerFootstep', { volume: 1 }),
    ladder: [
      scene.sound.add('ladder', { volume: 0.2 }),
      scene.sound.add('ladder2', { volume: 0.2 }),
      scene.sound.add('ladder3', { volume: 0.2 }),
      scene.sound.add('ladder4', { volume: 0.2 }),
      scene.sound.add('ladder5', { volume: 0.2 }),
      scene.sound.add('ladder6', { volume: 0.2 }),
    ],
    heal: scene.sound.add('heroHeal', { volume: 1 }),
    reload: scene.sound.add('pistolReload', { volume: 1 }),
  };
  return sounds;
};

export default addSounds;
