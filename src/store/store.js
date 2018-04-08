import { observable, action } from 'mobx';
import { getCalendarEvents } from '../services/googleCalendar';

class Store {
  @observable roomEvents = [];

  @action
  getEvents = async (opts) => {
    const roomEvents = await getCalendarEvents(opts);
    this.roomEvents = roomEvents;
  }
}

export default new Store();
