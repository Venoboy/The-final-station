import Phaser from 'phaser';
import eventsCenter from '../eventsCenter';

const updateHealthUI = (health) => {
  eventsCenter.emit('update-health', health);
};

const updateHealthBarUI = (health) => {
  eventsCenter.emit('update-health-bar', health);
};

const updateFoodUI = (food) => {
  eventsCenter.emit('update-food', food);
};

const updateBulletsUI = (bullets) => {
  eventsCenter.emit('update-bullets', bullets);
};

const updateMagazineUI = (bullets) => {
  eventsCenter.emit('update-magazine', bullets);
};

const updateKeysUI = (keys) => {
  eventsCenter.emit('update-keys', keys);
};

const updateUI = (uiName, value) => {
  // eslint-disable-next-line default-case
  switch (uiName) {
    case 'health': {
      updateHealthUI(value);
      break;
    }
    case 'bullets': {
      updateBulletsUI(value);
      break;
    }
    case 'food': {
      updateFoodUI(value);
      break;
    }
    case 'keys': {
      updateKeysUI(value);
      break;
    }
  }
};

const onEventListeners = (context) => {
  eventsCenter.on('update-health', context.updateHealth, context);
  eventsCenter.on('update-health-bar', context.updateHealthBar, context);
  eventsCenter.on('update-bullets', context.updateBullets, context);
  eventsCenter.on('update-magazine', context.updateMagazine, context);
  eventsCenter.on('update-food', context.updateMagazine, context);
  eventsCenter.on('update-keys', context.updateMagazine, context);
  eventsCenter.on('player-died', () => {
    context.cameras.main.fadeOut(2500);
  });
};

const offEventListeners = (context) => {
  eventsCenter.off('update-health', context.updateHealth, context);
  eventsCenter.off('update-health-bar', context.updateHealthBar, context);
  eventsCenter.off('update-bullets', context.updateBullets, context);
  eventsCenter.off('update-magazine', context.updateMagazine, context);
  eventsCenter.off('update-food', context.updateMagazine, context);
  eventsCenter.off('update-keys', context.updateMagazine, context);
  eventsCenter.off('player-died', () => {
    context.cameras.main.fadeOut(2500);
  });
};

export {
  updateHealthUI, updateFoodUI, updateBulletsUI, updateKeysUI,
  updateUI, updateMagazineUI, updateHealthBarUI, onEventListeners,
  offEventListeners,
};
