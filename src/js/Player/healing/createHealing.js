import { setFullHealth, canHeal } from '../playerStates/stats';
import PersonAnimation from '../animation/PlayerAnimation';
import eventsCenter from '../../eventsCenter';

function createHealing(scene) {
  const animation = new PersonAnimation(scene);
  function heal() {
    if (canHeal()) {
      animation.healAnimation(setFullHealth);
    }
  }
  const healKey = scene.input.keyboard.addKey('Q');
  healKey.on('up', heal);
  eventsCenter.on('player-died', () => {
    healKey.off('up', heal);
  });
}

export default createHealing;
