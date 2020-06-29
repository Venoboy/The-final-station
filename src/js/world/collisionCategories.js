const collisionCategories = {};

const setCollisionCategory = (scene) => {
  collisionCategories.player = scene.matter.world.nextCategory();
  collisionCategories.playerBodySensor = scene.matter.world.nextCategory();
  collisionCategories.ground = scene.matter.world.nextCategory();
  collisionCategories.stairs = scene.matter.world.nextCategory();
};

export default collisionCategories;
export { setCollisionCategory };
