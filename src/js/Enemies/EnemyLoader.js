import EnemyConstructor from './EnemyConstructor';
import enemyPositions from './enemyPositions';
import enemySettings from './enemySettings';

export default class EnemyLoader {
  constructor(scene, player) {
    this.scene = scene;
    this.player = player;
    this.exampleEnemy = {};
  }

  create = () => {
    Object.entries(enemyPositions.default)
      .filter((elem) => elem[0] !== 'default')
      .forEach((entry) => {
        const type = entry[0];
        const positionsArr = entry[1];

        positionsArr.forEach((position) => {
          const config = {};
          config.type = type;
          config.position = position;
          config.scene = this.scene;
          config.settings = enemySettings[type];
          config.stringId = 'enemyBig';
          config.player = this.player;

          this.exampleEnemy = new EnemyConstructor(config);
        });
      });
  };

  update = () => {
    this.exampleEnemy.update();
  };
}
