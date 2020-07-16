/* eslint-disable linebreak-style */
import { setFullHealth, canHeal } from '../playerStates/stats';
import PersonAnimation from '../animation/PlayerAnimation';


function createHealing(scene) {
  const animation = new PersonAnimation(scene);
  function heal() {
    if (canHeal()) {
      animation.healAnimation(setFullHealth);
    }
  }
  const healKey = scene.input.keyboard.addKey('Q');
  healKey.on('up', heal);
}

export default createHealing;
