const GUN_DAMAGE = 20;

const enemyDamage = (enemyObject, player) => {
  const enemy = enemyObject;
  let enemyHealth = enemy.getData('health');
  enemyHealth -= GUN_DAMAGE;
  enemy.setData('health', enemyHealth);
  if (enemyHealth <= 0) {
    // запустить анимацию смерти
    if (player < enemy.x && enemy.texture.key === 'bigZombie') {
      enemy.anims.play('deadLeft');
    }
    else if (player < enemy.x && enemy.texture.key === 'smallZombie') {
      enemy.anims.play('deadLefts');
    }
    else if (player > enemy.x && enemy.texture.key === 'bigZombie') {
      enemy.anims.play('deadRight');
    }
    else if (player > enemy.x && enemy.texture.key === 'smallZombie') {
      enemy.anims.play('deadRights');
    }
  }
};

export default enemyDamage;
