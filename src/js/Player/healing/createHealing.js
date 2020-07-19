import { setFullHealth, canHeal } from '../playerStates/stats';
import PersonAnimation from '../animation/PlayerAnimation';
import eventsCenter from '../../eventsCenter';

function createHealing(scene, stairsInfo) {
  const animation = new PersonAnimation(scene);
  function heal() {
    if (!stairsInfo.playerInstance.isTouching.ground && stairsInfo.st.label === 'stairs-right') {
      return;
    }
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
