import { stats, updateStats, STAT_NAME } from '../playerStates/stats';

const bulletFire = () => {
  const isBullets = stats.bullets > 0;
  if (isBullets) {
    updateStats(STAT_NAME.bullets, -1);
  }
  return isBullets;
};

export default bulletFire;
