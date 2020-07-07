import eventsCenter from '../eventsCenter';

export default class RoomManager {
  constructor(config) {
    this.rooms = config.rooms;
    this.openers = config.openers;
    eventsCenter.on('door-opened', this.openRoom, this);
    eventsCenter.on('lid-opened', this.openRoom, this);
  }

  findRoom(openerRoomsIDs) {
    for (let i = 0; i < openerRoomsIDs.length; i += 1) {
      const room = this.rooms.find((r) => r.id === openerRoomsIDs[i] && !r.opened);
      if (room) {
        return room;
      }
    }
    return null;
  }

  openRoom(openerID) {
    const openerRoomsIDs = this.openers.get(openerID);
    if (openerRoomsIDs) {
      const roomToOpen = this.findRoom(openerRoomsIDs);
      if (roomToOpen) {
        roomToOpen.open();
      }
      this.openers.delete(openerID);
    }
  }
}
