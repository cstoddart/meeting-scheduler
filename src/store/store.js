import { observable, action } from 'mobx';
import { getCalendarEvents } from '../services/googleCalendar';

class Store {
  @observable events = [];

  @action.bound
  async getEvents(opts) {
    const events = await getCalendarEvents(opts);
    this.events = events;
  }

  @action.bound
  setEvents(events) {
    this.events = events;
  }
}

export default new Store();
