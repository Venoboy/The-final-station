import level0stairsJson from '../../../assets/level0Physics/level-start-stairs.xml.json';
import collisionCategories from '../../helpers/collisionCategories';
import level0stairsMiddleJson from '../../../assets/level0Physics/level-middle-stairs.xml.json';

const stairsArray = [];

const stairsCreation = (sceneObj) => {
  const scene = sceneObj;
  const stairsStart = scene.matter.add.fromPhysicsEditor(486, 235, level0stairsJson.f_1);
  stairsStart.collisionFilter.category = collisionCategories.stairs;
  stairsArray.push(stairsStart);
  const stairsMiddle = scene.matter.add
    .fromPhysicsEditor(770, 315.5, level0stairsMiddleJson.f_2);
  stairsMiddle.collisionFilter.category = collisionCategories.stairs;
  stairsArray.push(stairsMiddle);
};

export { stairsArray };
export default stairsCreation;
