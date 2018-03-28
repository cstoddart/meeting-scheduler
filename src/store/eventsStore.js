import { observable, action } from 'mobx';
import { getCalendarEvents } from '../services/googleCalendar';

export class EventsStore {
  @observable events = [];

  @action.bound
  getEvents = async () => {
    const events = await getCalendarEvents();
    this.events = events;
  }
}

export default new EventsStore();
