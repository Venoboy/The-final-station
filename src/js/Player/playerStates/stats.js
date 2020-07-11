import eventsCenter from '../../eventsCenter';
import {
  updateHealthBarUI, updateBulletsUI, updateFoodUI,
  updateKeysUI, updateHealthUI,
} from '../../interface/UIHelpers';

const HERO_MAX_HEALTH = 100;

const stats = {
  aids: 2,
  bullets: 6,
  food: 2,
  keys: 0,
  health: HERO_MAX_HEALTH,
  playerSizes: {
    h: 40,
    w: 32,
  },
  bodyContainerYOffset: 2.33,
};

const looseHealth = (amount) => {
  if (stats.health > 0) {
    stats.health -= amount;
    if (stats.health < 0) {
      stats.health = 0;
    }
    updateHealthBarUI(stats.health);
    // if (stats.health === 0) {
    //   eventsCenter.emit('player-died');
    // }
  }
};

const setFullHealth = () => {
  stats.health = HERO_MAX_HEALTH;
}

const updateStats = (statName, value) => {
  switch (statName) {
    case 'health': {
      stats[statName] += value;
      updateHealthUI(stats[statName]);
      break;
    }
    case 'bullets': {
      stats[statName] += value;
      updateBulletsUI(stats[statName]);
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
}

export { stats, looseHealth, setFullHealth, updateStats };
