import { googleInit } from './googleInit';
import { rooms } from '../constants/rooms';

const listEvents = async (opts = {}) => {
  const roomNames = opts.rooms || rooms.map((room) => room.name);
  const events = [];

  for (const roomName of roomNames) {
    const { id } = rooms.find((room) => room.name === roomName);
    await window.gapi.client.calendar.events.list({
      calendarId: id,
      timeMax: '2018-01-10T10:00:00-07:00',
      timeMin: '2018-01-03T10:00:00-07:00',
    }).then(({ result }) => {
      events.push({
        name: roomName,
        items: result.items,
      });
    });
  }

  return events.sort((a, b) => {
    if (a.name < b.name) return -1;
    return 1;
  });
};

export const getCalendarEvents = (opts) => {
  if (window.gapi.client && window.gapi.client.calendar) {
    return listEvents(opts);
  }

  return googleInit().then(listEvents(opts));
};
