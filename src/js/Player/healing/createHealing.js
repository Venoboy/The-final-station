/* eslint-disable linebreak-style */
import { setFullHealth } from '../playerStates/stats';
import PersonAnimation from '../animation/PlayerAnimation';


function createHealing(scene) {
  const animation = new PersonAnimation(scene);
  function heal() {
    const wasHealed = setFullHealth();
    if (wasHealed) {
      animation.healAnimation();
    }
  }
  const healKey = scene.input.keyboard.addKey('Q');
  healKey.on('up', heal);
}

export default createHealing;
