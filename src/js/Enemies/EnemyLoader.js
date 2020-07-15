import EnemyConstructor from './EnemyConstructor';
import enemyPositions from './enemyPositions';
import enemySettings from './enemySettings';
import collisionCategories from '../world/collisionCategories';
import { stairsArray } from '../objects/stairs/stairsCreation';

const enemiesArray = [];

export default class EnemyLoader {
  constructor(scene, playerInstance) {
    this.scene = scene;
    this.playerInstance = playerInstance;
    this.stairsArray = stairsArray;
  }

  create = () => {
    const collisionGroup = 0;
    Object.entries(enemyPositions.default)
      .filter((elem) => elem[0] !== 'default')
      .forEach((entry) => {
        const type = entry[0];
        const positionsArr = entry[1];

        const enemiesArr = positionsArr.map((position) => {
          const config = {};
          config.type = type;
          config.stairsArray = this.stairsArray;
          config.position = position;
          config.scene = this.scene;
          config.settings = enemySettings[type];
          config.playerInstance = this.playerInstance;
          config.collisionCategory = collisionCategories.enemies;
          config.collisionGroup = collisionGroup;

          return new EnemyConstructor(config);
        });
        enemiesArray.push(enemiesArr);
      });
  };

  update = () => {
    enemiesArray.forEach((enemyType) => {
      enemyType.forEach((enemy) => {
        const isAlive = enemy.enemy.getData('health') > 0;
        if (enemy.enemy.body && isAlive) {
          enemy.update();
        }
      });
    });
  };
}

export { enemiesArray };
