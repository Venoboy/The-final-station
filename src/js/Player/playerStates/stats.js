import {
  updateBulletsUI,
  updateHealthBarUI,
  updateAidsUI,
  updateMagazineUI,
  updateStoksUI,
} from '../../interface/UIHelpers';
import eventsCenter from '../../eventsCenter';

const HERO_MAX_HEALTH = 100;
const HeroAttacking = {
  attacking: false,
};

const stats = {
  aids: 2,
  bullets: 6,
  bulletsInMagazine: 6,
  magazineSize: 6,
  food: 2,
  keys: 0,
  health: HERO_MAX_HEALTH,
  playerSizes: {
    h: 40,
    w: 32,
  },
  bodyContainerYOffset: 2.33,
  MAX_ANGLE: Math.PI / 6,
};

const playerActions = {
  reloading: false,
  healing: false,
};

const noActions = () => {
  return !playerActions.healing && !playerActions.reloading;
}

const isMagazineFull = () => {
  return stats.bulletsInMagazine === stats.magazineSize;
};

const canShoot = () => {
  return stats.bulletsInMagazine > 0;
};

const canReload = () => {
  return stats.bullets > 0;
};

const canHeal = () => {
  return stats.health !== HERO_MAX_HEALTH && stats.aids > 0;
};

const looseHealth = (amount) => {
  if (stats.health > 0) {
    stats.health -= amount;
    HeroAttacking.attacking = true;
    if (stats.health < 0) {
      stats.health = 0;
    }
    updateHealthBarUI(stats.health);
    if (stats.health === 0) {
      eventsCenter.emit('player-died');
    }
  }
};

const setFullHealth = () => {
  if (!canHeal()) {
    return;
  }
  stats.health = HERO_MAX_HEALTH;
  stats.aids -= 1;
  updateHealthBarUI(stats.health);
  updateAidsUI(stats.aids);
};

const useBullet = () => {
  stats.bulletsInMagazine -= 1;
  updateMagazineUI(stats.bulletsInMagazine);
};

const setBullets = () => {
  const bulletsNeeded = stats.magazineSize - stats.bulletsInMagazine;
  if (stats.bullets >= bulletsNeeded) {
    stats.bullets -= bulletsNeeded;
    stats.bulletsInMagazine += bulletsNeeded;
  } else {
    stats.bulletsInMagazine += stats.bullets;
    stats.bullets = 0;
  }
  updateMagazineUI(stats.bulletsInMagazine);
  updateBulletsUI(stats.bullets);
};

const restock = (items) => {
  items.forEach((item) => {
    if (stats[item.name]) {
      stats[item.name] += item.quantity;
    } else {
      stats[item.name] = item.quantity;
    }
  });
  updateStoksUI(stats.aids, stats.bullets, stats.food, stats.keys);
};

export {
  stats, looseHealth, setFullHealth, restock, useBullet,
  setBullets, isMagazineFull, canShoot, canReload, canHeal,
  HeroAttacking, playerActions, noActions,
};
