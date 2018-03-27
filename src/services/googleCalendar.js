import { googleAuth } from './googleAuth';

const listEvents = (opts, callback) => () => {
  window.gapi.client.calendar.events.list({
    // calendarId: "primary",
    calendarId: 'dialexa.com_36333236303434362d393430@resource.calendar.google.com',
    timeMax: '2018-02-03T10:00:00-07:00',
    timeMin: '2018-01-03T10:00:00-07:00',
  }).execute((events) => callback(events.items));
};

export const getCalendarEvents = (opts, callback) => {
  if (window.gapi.client && window.gapi.client.calendar) {
    listEvents(opts, callback)();
  } else {
    googleAuth(listEvents(opts, callback));
  }
};
