/* eslint-disable linebreak-style */
import Door from '../objects/interactionObjects/Door';
import Storage from '../objects/interactionObjects/Storage';
import Lid from '../objects/interactionObjects/Lid';
import Room from '../rooms/Room';
import RoomManager from '../rooms/RoomManager';
import TunnelSensor from '../objects/interactionObjects/TunnelSensor';

import {
  interactionObjectsData, doorsPosition, lidsPosition,
  lockersPosition, deadBody1Position, deadBody2Position,
  roomsData, openRoomsData,
} from '../data/level0';

const doors = [];

const setInteractionObjects = (context) => {
  const objects = [];
  doorsPosition.forEach((data) => {
    const door = new Door({
      scene: context,
      id: data.id,
      x: data.x,
      y: data.y,
      beforeTexture: 'door',
      afterTexture: 'door_',
    });
    objects.push(door);
    doors.push(door);
  });
  lidsPosition.forEach((data) => {
    const lid = new Lid({
      scene: context,
      id: data.id,
      x: data.x,
      y: data.y,
      beforeTexture: 'lid',
    });
    objects.push(lid);
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
    objects.push(lid);
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
    objects.push(lid);
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
    objects.push(lid);
  });
  return objects;
};

const setRooms = (context) => {
  const rooms = [];
  roomsData.forEach((config) => {
    const room = new Room({
      scene: context,
      points: config.points,
      id: config.id,
    });
    rooms.push(room);
  });
  const roomManager = new RoomManager({
    rooms,
    openers: openRoomsData,
  });
  return roomManager;
};

const setTunnel = (context, collisionBodies) => {
  const tunnel = new TunnelSensor({
    scene: context,
    x: 650,
    y: 455,
    texture: 'tunnel',
    collisionBodies,
  });

  return tunnel;
};

export {
  setInteractionObjects, setRooms, setTunnel, doors,
};
