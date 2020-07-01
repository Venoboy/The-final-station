import Door from '../interactionObjects/Door';
import Storage from '../interactionObjects/Storage';
import Lid from '../interactionObjects/Lid';

import {
  interactionObjectsData, doorsPosition, lidsPosition,
  lockersPosition, deadBody1Position, deadBody2Position,
  shadowsData,
} from '../data/level0';

const setInteractionObjects = (context) => {
  // eslint-disable-next-line no-unused-vars
  const objects = {
    doors: [],
    lids: [],
    storages: [],
  };
  doorsPosition.forEach((cords) => {
    const door = new Door({
      scene: context,
      x: cords.x,
      y: cords.y,
      beforeTexture: 'door',
      afterTexture: 'door_',
    });
    objects.doors.push(door);
  });
  lidsPosition.forEach((cords) => {
    const lid = new Lid({
      scene: context,
      x: cords.x,
      y: cords.y,
      beforeTexture: 'lid',
    });
    objects.lids.push(lid);
  });
  lockersPosition.forEach((cords) => {
    const lid = new Storage({
      scene: context,
      x: cords.x,
      y: cords.y,
      beforeTexture: 'locker',
      afterTexture: 'locker_',
      items: interactionObjectsData.locker1,
    });
    objects.storages.push(lid);
  });
  deadBody1Position.forEach((cords) => {
    const lid = new Storage({
      scene: context,
      x: cords.x,
      y: cords.y,
      beforeTexture: 'deadBody1',
      afterTexture: 'deadBody1',
      items: interactionObjectsData.deadBody1,
    });
    objects.storages.push(lid);
  });
  deadBody2Position.forEach((cords) => {
    const lid = new Storage({
      scene: context,
      x: cords.x,
      y: cords.y,
      beforeTexture: 'deadBody2',
      afterTexture: 'deadBody2',
      items: interactionObjectsData.deadBody2,
    });
    objects.storages.push(lid);
  });
  return objects;
};

export { setInteractionObjects };
