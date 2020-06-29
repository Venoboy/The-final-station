import EnemyConstructor from './EnemyConstructor';
import enemyPositions from './enemyPositions';
import enemySettings from './enemySettings';

export default class EnemyLoader {
  constructor(scene, playerInstance, stairsArr) {
    this.scene = scene;
    this.playerInstance = playerInstance;
    this.stairsArray = stairsArr;
    this.exampleEnemy = {};
    this.COLLISION_GROUP_OFFSET = 100;
    this.enemiesArray = [];
  }

  create = () => {
    Object.entries(enemyPositions.default)
      .filter((elem) => elem[0] !== 'default')
      .forEach((entry) => {
        const type = entry[0];
        const positionsArr = entry[1];
        let collisionGroup = this.COLLISION_GROUP_OFFSET;

        const enemiesArr = positionsArr.map((position) => {
          const config = {};
          config.type = type;
          config.stairsArray = this.stairsArray;
          config.position = position;
          config.scene = this.scene;
          config.settings = enemySettings[type];
          config.stringId = 'enemyBig';
          config.playerInstance = this.playerInstance;
          config.collisionCategory = this.scene.matter.world.nextCategory();
          config.collisionGroup = collisionGroup;

          collisionGroup += 1;

          return new EnemyConstructor(config);
        });
        this.enemiesArray.push(enemiesArr);
      });
  };

  update = () => {
    this.enemiesArray.forEach((enemyType) => {
      enemyType.forEach((enemy) => {
        enemy.update();
      });
    });
  };
}
