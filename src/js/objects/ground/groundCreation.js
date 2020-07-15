import collisionCategories from '../../helpers/collisionCategories';
import level0json from '../../../assets/level0Physics/level-start.xml.json';
import level0MiddleJson from '../../../assets/level0Physics/level-middle.xml.json';
import level0EndJson from '../../../assets/level0Physics/level-end.xml.json';

const groundArray = [];

const groundCreation = (sceneObj) => {
  const scene = sceneObj;
  const ground = scene.matter.add.fromPhysicsEditor(250, 260.65, level0json.f_1);
  ground.frictionStatic = 0.5;
  ground.friction = 0.5;
  ground.collisionFilter.category = collisionCategories.ground;
  groundArray.push(ground);

  const groundMiddle = scene.matter.add.fromPhysicsEditor(779, 261, level0MiddleJson.f_2);
  groundMiddle.collisionFilter.category = collisionCategories.ground;
  groundArray.push(groundMiddle);

  const groundEnd = scene.matter.add.fromPhysicsEditor(1303, 273, level0EndJson.f_3);
  groundEnd.collisionFilter.category = collisionCategories.ground;
  groundArray.push(groundEnd);
};

export { groundArray };
export default groundCreation;
