import Door from '../../objects/interactionObjects/Door';
import Storage from '../../objects/interactionObjects/Storage';
import Lid from '../../objects/interactionObjects/Lid';
import Room from '../../rooms/Room';
import RoomManager from '../../rooms/RoomManager';
import TunnelSensor from '../../objects/interactionObjects/TunnelSensor';
import SoundSensor from '../../objects/soundSensors/SoundSensor';

import {
  interactionObjectsData, doorsData, lidsData,
  lockersData, deadBody1Data, deadBody2Data,
  roomsData, openRoomsData, soundSensorsData,
} from './data';

const doors = [];
const lids = [];

const setBackgroundImages = (scene) => {
  const moonsOffset = 130 + window.innerWidth * 0.4;
  scene.add.image(1020, 256, 'bak_2');
  scene.add.image(648, 132, 'bak_1');
  scene.add.image(moonsOffset, 120, 'moons').setScrollFactor(0.2, 1);
  scene.add.image(900, 315, 'bak_5').setScrollFactor(0.9, 1);
  scene.add.image(263, 280, 'bak_1').setScrollFactor(0.9, 1);
  scene.add.image(950, 350, 'bak_3').setScrollFactor(0.9, 1);
  scene.add.image(768, 256, 'b_123');
};

const setFrontImages = (scene) => {
  scene.add.image(768, 256, 'f_123');
};

const setAnimationedObjects = (scene) => {
  scene.anims.create({
    key: 'blink',
    frames: scene.anims.generateFrameNumbers('crowd_man'),
    frameRate: 1,
    repeat: -1,
  });
  scene.anims.create({
    key: 'smoke',
    frames: scene.anims.generateFrameNumbers('hunter'),
    frameRate: 2,
    repeat: -1,
  });
  scene.anims.create({
    key: 'fly',
    frames: scene.anims.generateFrameNumbers('flies'),
    frameRate: 8,
    repeat: -1,
  });

  scene.add.sprite(649, 195, 'crowd_man').anims.play('blink');
  scene.add.sprite(393, 329, 'hunter').anims.play('smoke');
  scene.add.sprite(363, 195, 'flies').anims.play('fly');
  scene.add.sprite(1100, 350, 'flies').anims.play('fly');
};

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
    lids.push(lid);
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
  setInteractionObjects, setRooms, setTunnel, doors, lids, setSoundSensors,
  setAnimationedObjects, setBackgroundImages, setFrontImages,
};
