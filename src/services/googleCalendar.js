import { googleAuth } from './googleAuth';
import { rooms } from '../rooms';

const listEvents = (opts, callback) => () => {
  window.gapi.client.calendar.events.list({
    // calendarId: "primary",
    calendarId: 'dialexa.com_36333236303434362d393430@resource.calendar.google.com',
    timeMax: '2018-02-03T10:00:00-07:00',
    timeMin: '2018-01-03T10:00:00-07:00',
  }).execute((events) => callback(events.items));
};

export const getCalendarEvents = (opts) => {
  return new Promise((resolve, reject) => {
    if (window.gapi.client && window.gapi.client.calendar) {
      listEvents(opts, (events, err) => {
        if (err) {
          reject(err);
        } else {
          resolve(events);
        }
      })();
    } else {
      googleAuth(listEvents(opts, (events) => {
        resolve(events);
      }));
    }
  });
};
