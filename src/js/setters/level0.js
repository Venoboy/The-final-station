/* eslint-disable linebreak-style */
import Door from '../objects/interactionObjects/Door';
import Storage from '../objects/interactionObjects/Storage';
import Lid from '../objects/interactionObjects/Lid';
import Room from '../rooms/Room';
import RoomManager from '../rooms/RoomManager';
import TunnelSensor from '../objects/interactionObjects/TunnelSensor';
import SoundSensor from '../objects/soundSensors/SoundSensor';

import {
  interactionObjectsData, doorsData, lidsData,
  lockersData, deadBody1Data, deadBody2Data,
  roomsData, openRoomsData, soundSensorsData,
} from '../data/level0';

const doors = [];
const setInteractionObjects = (context) => {
  const objects = [];
  doorsData.forEach((data) => {
    const door = new Door({
      scene: context,
      id: data.id,
      x: data.x,
      y: data.y,
      beforeTexture: 'door',
      afterTexture: 'door_',
      soundKey: data.soundKey,
    });
    objects.push(door);
    doors.push(door);
  });
  lidsData.forEach((data) => {
    const lid = new Lid({
      scene: context,
      id: data.id,
      x: data.x,
      y: data.y,
      beforeTexture: 'lid',
      soundKey: data.soundKey,
    });
    objects.push(lid);
  });
  lockersData.forEach((data) => {
    const locker = new Storage({
      scene: context,
      x: data.x,
      y: data.y,
      beforeTexture: 'locker',
      afterTexture: 'locker_',
      items: interactionObjectsData.locker1,
      soundKey: data.soundKey,
    });
    objects.push(locker);
  });
  deadBody1Data.forEach((data) => {
    const deadBody = new Storage({
      scene: context,
      x: data.x,
      y: data.y,
      beforeTexture: 'deadBody1',
      afterTexture: 'deadBody1',
      items: interactionObjectsData.deadBody1,
      soundKey: data.soundKey,
    });
    objects.push(deadBody);
  });
  deadBody2Data.forEach((data) => {
    const deadBody = new Storage({
      scene: context,
      x: data.x,
      y: data.y,
      beforeTexture: 'deadBody2',
      afterTexture: 'deadBody2',
      items: interactionObjectsData.deadBody2,
      soundKey: data.soundKey,
    });
    objects.push(deadBody);
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
    scene: context,
    rooms,
    openers: new Map(openRoomsData),
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

const setSoundSensors = (scene, sensorTrigger) => {
  const soundSensors = [];
  soundSensorsData.forEach((data) => {
    const sensor = new SoundSensor({
      scene,
      x: data.x,
      y: data.y,
      soundKey: data.soundKey,
      trigger: sensorTrigger,
      distanceThreshold: data.distanceThreshold,
    });
    soundSensors.push(sensor);
  });
  return soundSensors;
};

export {
  setInteractionObjects, setRooms, setTunnel, doors, setSoundSensors,
};
