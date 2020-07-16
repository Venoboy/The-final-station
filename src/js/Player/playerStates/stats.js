import {
  updateBulletsUI,
  updateFoodUI,
  updateHealthBarUI,
  updateAidsUI,
  updateKeysUI,
  updateMagazineUI,
} from '../../interface/UIHelpers';
import eventsCenter from '../../eventsCenter';

const HERO_MAX_HEALTH = 100;

const stats = {
  aids: 2,
  bullets: 6,
  bulletsInReserve: 6,
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

const isMagazineFull = () => {
  return stats.bullets === stats.magazineSize;
};

const canShoot = () => {
  return stats.bullets > 0;
};

const canReload = () => {
  return stats.bulletsInReserve > 0;
};

const canHeal = () => {
  return stats.health !== HERO_MAX_HEALTH && stats.aids > 0;
};

const looseHealth = (amount) => {
  if (stats.health > 0) {
    stats.health -= amount;
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
  stats.bullets -= 1;
  updateMagazineUI(stats.bullets);
};

const setBullets = () => {
  const bulletsNeeded = stats.magazineSize - stats.bullets;
  if (stats.bulletsInReserve >= bulletsNeeded) {
    stats.bulletsInReserve -= bulletsNeeded;
    stats.bullets += bulletsNeeded;
  } else {
    stats.bullets += stats.bulletsInReserve;
    stats.bulletsInReserve = 0;
  }
  updateMagazineUI(stats.bullets);
  updateBulletsUI(stats.bulletsInReserve);
};

const updateStats = (statName, value) => {
  switch (statName) {
    case 'aids': {
      stats[statName] += value;
      updateAidsUI(stats[statName]);
      break;
    }
    case 'bullets': {
      stats.bulletsInReserve += value;
      updateBulletsUI(stats.bulletsInReserve);
      break;
    }
    case 'food': {
      stats[statName] += value;
      updateFoodUI(stats[statName]);
      break;
    }
    case 'keys': {
      stats[statName] += value;
      updateKeysUI(stats[statName]);
      break;
    }
    default: {
      if (stats[statName]) {
        stats[statName] += value;
      } else {
        stats[statName] = value;
      }
    }
  }
};

export {
  stats, looseHealth, setFullHealth, updateStats, useBullet,
  setBullets, isMagazineFull, canShoot, canReload, canHeal,
};
