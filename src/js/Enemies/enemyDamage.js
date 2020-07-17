const GUN_DAMAGE = 20;

const enemyDamage = (enemyObject, player) => {
  const enemy = enemyObject;
  let enemyHealth = enemy.getData('health');
  enemyHealth -= GUN_DAMAGE;
  enemy.setData('health', enemyHealth);
  if (enemyHealth <= 0) {
    // запустить анимацию смерти
    if (player < enemy.x && enemy.texture.key === 'bigZombie') {
      enemy.anims.play('deadLeft', true);
    } else if (player < enemy.x && enemy.texture.key === 'smallZombie') {
      enemy.anims.play('deadLefts', true);
    } else if (player > enemy.x && enemy.texture.key === 'bigZombie') {
      enemy.anims.play('deadRight', true);
    } else if (player > enemy.x && enemy.texture.key === 'smallZombie') {
      enemy.anims.play('deadRights', true);
    }
  } else if (enemyHealth > 0) {
    if (player < enemy.x && enemy.texture.key === 'bigZombie') {
      console.log('попал');
      enemy.anims.play('damagedLeft', true);
    } else if (player < enemy.x && enemy.texture.key === 'smallZombie') {
      enemy.anims.play('damagedRights', true);
    } else if (player > enemy.x && enemy.texture.key === 'bigZombie') {
      enemy.anims.play('damagedRight', true);
    } else if (player > enemy.x && enemy.texture.key === 'smallZombie') {
      enemy.anims.play('damagedLefts', true);
    }
  }
};

export default enemyDamage;
