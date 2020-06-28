import bigEnemyPic from '../../assets/level0/enemies/BigZombie Idle_02.png';
import EnemyConstructor from './EnemyConstructor';
import enemyPositions from './enemyPositions';
import enemySettings from './enemySettings';

export default class EnemyLoader {
  constructor(scene) {
    this.scene = scene;
    this.stringIDs = {
      enemyBig: 'enemyBig',
    };
  }

  preload = () => {
    this.scene.load.image(this.stringIDs.enemyBig, bigEnemyPic);
  };

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
          config.stringId = this.stringIDs.enemyBig;

          this.exampleEnemy = new EnemyConstructor(config);
          console.log(this.exampleEnemy.enemy.body.velocity);
        });
      });
  };

  update = () => {
    this.exampleEnemy.enemy.setVelocityX(0.5);
  };
}
