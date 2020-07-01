import eventsCenter from '../eventsCenter';

export default class RoomManager {
  constructor(config) {
    this.rooms = config.rooms;
    this.openers = config.openers;
    eventsCenter.on('open-room', this.openRoom, this);
  }

  openRoom(openerID) {
    const roomsForOpener = this.openers.get(openerID);
    if(opener) {
    }
  }
}
