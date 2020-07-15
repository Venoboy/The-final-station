const GUN_DAMAGE = 20;

const enemyDamage = (enemyObject) => {
  const enemy = enemyObject;
  let enemyHealth = enemy.getData('health');
  enemyHealth -= GUN_DAMAGE;
  enemy.setData('health', enemyHealth);
  if (enemyHealth <= 0) {
    // запустить анимацию смерти
  }
};

export default enemyDamage;
