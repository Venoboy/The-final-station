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

export {
  updateHealthUI, updateFoodUI, updateBulletsUI, updateKeysUI,
  updateMagazineUI, updateHealthBarUI,
};
