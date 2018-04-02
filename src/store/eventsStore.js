import { observable, action } from 'mobx';
import { getCalendarEvents } from '../services/googleCalendar';

class EventsStore {
  @observable events = [];

  @action.bound
  getEvents = async () => {
    const events = await getCalendarEvents();
    console.log('EVENTS', events);
    this.events = events;
  }
}

export default new EventsStore();
