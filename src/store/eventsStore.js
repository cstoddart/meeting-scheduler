import { observable, action } from 'mobx';
import { getCalendarEvents } from '../services/googleCalendar';
import { rooms } from '../rooms';

export class EventsStore {
  @observable events = [];
  @observable rooms = rooms;

  @action.bound
  getEvents = () => {
    getCalendarEvents((events) => {
      console.log('Setting events...', events);
      this.events = events;
    });
  }
}
