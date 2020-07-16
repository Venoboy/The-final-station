import eventsCenter from '../eventsCenter';

const updateAidsUI = (health) => {
  eventsCenter.emit('update-aids', health);
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
  updateAidsUI, updateFoodUI, updateBulletsUI, updateKeysUI,
  updateMagazineUI, updateHealthBarUI,
};
