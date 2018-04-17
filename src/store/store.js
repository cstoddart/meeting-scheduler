import { observable, action } from 'mobx';
import { getCalendarEvents } from '../services/googleCalendar';
import { googleInit } from '../services/googleInit';

class Store {
  @observable roomEvents = [];
  @observable user = false;

  @action
  getEvents = async (opts) => {
    const roomEvents = await getCalendarEvents(opts);
    this.roomEvents = roomEvents;
  }

  @action
  googleInit = async () => {
    const user = await googleInit();
    this.user = user;
  }
}

export default new Store();
