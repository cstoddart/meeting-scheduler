import { observable, action } from 'mobx';
import { getCalendarEvents } from '../services/googleCalendar';

export class EventsStore {
  @observable events = [];

  @action.bound
  getEvents = async (accessToken) => {
    getCalendarEvents(accessToken, (events) => {
      console.log("Setting events...", events);
      this.events = events;
    });
  }
}
