import eventsCenter from '../eventsCenter';

const X_OFFSETS = {
  healthText: 0.1206,
  healthBar: 0.1447,
  weaponText: 0.4984,
  weaponMagazine: 0.5305,
  foodText: 0.7797,
  keysText: 0.9566,
};

function resize() {
  const YOffset = this.cameras.main.height - (this.frame.displayHeight / 2);

  const healthOffset = this.calculateOffset(X_OFFSETS.healthText);
  const healthBarOffset = this.calculateOffset(X_OFFSETS.healthBar);
  const bulletsOffset = this.calculateOffset(X_OFFSETS.weaponText);
  const magazineOffset = this.calculateOffset(X_OFFSETS.weaponMagazine);
  const foodOffset = this.calculateOffset(X_OFFSETS.foodText);
  const keysOffset = this.calculateOffset(X_OFFSETS.keysText);

  this.frame.setPosition(this.cameras.main.centerX, YOffset);
  this.health.setPosition(healthOffset, YOffset + 3);
  this.healthBar.setPosition(healthBarOffset, YOffset - 10);
  this.bullets.setPosition(bulletsOffset, YOffset + 3);
  this.magazine.setPosition(magazineOffset, YOffset + 2);
  this.food.setPosition(foodOffset, YOffset + 3);
  this.keys.setPosition(keysOffset, YOffset + 3);
}

const addSceneListeners = (scene) => {
  eventsCenter.on('update-health', scene.updateHealth, scene);
  eventsCenter.on('update-health-bar', scene.updateHealthBar, scene);
  eventsCenter.on('update-bullets', scene.updateBullets, scene);
  eventsCenter.on('update-magazine', scene.updateMagazine, scene);
  eventsCenter.on('update-food', scene.updateMagazine, scene);
  eventsCenter.on('update-keys', scene.updateMagazine, scene);
  eventsCenter.on('player-died', () => {
    scene.cameras.main.fadeOut(2500);
  });
  scene.scale.on('resize', resize, scene);
  resize.call(scene);

  scene.events.on('shutdown', () => {
    eventsCenter.off('update-health', scene.updateHealth, scene);
    eventsCenter.off('update-health-bar', scene.updateHealthBar, scene);
    eventsCenter.off('update-bullets', scene.updateBullets, scene);
    eventsCenter.off('update-magazine', scene.updateMagazine, scene);
    eventsCenter.off('update-food', scene.updateMagazine, scene);
    eventsCenter.off('update-keys', scene.updateMagazine, scene);
    eventsCenter.off('player-died', () => {
      scene.cameras.main.fadeOut(2500);
    });
    scene.scale.off('resize', resize, scene);
  });
};

export default addSceneListeners;
