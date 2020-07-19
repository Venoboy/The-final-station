const GUN_DAMAGE = 20;
const obj = {
  damaged: false,
};


const enemyDamage = (enemyObject, player, scene) => {
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
    obj.damaged = true;
    let anim;

    if (player < enemy.x && enemy.texture.key === 'bigZombie') {
      anim = scene.scene.anims.get('damagedRight');
      enemy.anims.play('damagedRight');
    } else if (player < enemy.x && enemy.texture.key === 'smallZombie') {
      anim = scene.scene.anims.get('damagedRights');
      enemy.anims.play('damagedRights', true);
    } else if (player > enemy.x && enemy.texture.key === 'bigZombie') {
      anim = scene.scene.anims.get('damagedLeft');
      enemy.anims.play('damagedLeft', true);
    } else if (player > enemy.x && enemy.texture.key === 'smallZombie') {
      anim = scene.scene.anims.get('damagedLefts');
      enemy.anims.play('damagedLefts', true);
    }
    anim.on('complete', () => {
      obj.damaged = false;
    });
  }
};

export { enemyDamage, obj };
