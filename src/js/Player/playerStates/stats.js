import { updateHealthBarUI } from '../../interface/UIHelpers';
import eventsCenter from '../../eventsCenter';

const HERO_MAX_HEALTH = 100;

const stats = {
  aids: 2,
  bullets: 6,
  food: 2,
  keys: 0,
  health: HERO_MAX_HEALTH,
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
  stats.health = HERO_MAX_HEALTH;
}

export { stats, looseHealth, setFullHealth };
