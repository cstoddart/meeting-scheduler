import { startOfDay, endOfDay, startOfToday, endOfToday } from 'date-fns';

import { googleInit } from './googleInit';
import { roomsArray } from '../constants/rooms';

const listEvents = async (opts = {}) => {
  const { calendarView } = opts;
  const roomNames = roomsArray.map((room) => room.name);
  const roomEvents = [];

  const start = calendarView ? startOfDay(new Date(calendarView)) : startOfToday();
  const end = calendarView ? endOfDay(new Date(calendarView)) : endOfToday();

  for (const roomName of roomNames) {
    const { id } = roomsArray.find((room) => room.name === roomName);
    await window.gapi.client.calendar.events.list({
      calendarId: id,
      timeMin: start.toISOString(),
      timeMax: end.toISOString(),
    }).then(({ result }) => {
      roomEvents.push({
        name: roomName,
        events: result.items,
      });
    });
  }

  for (const room of roomEvents) {
    const eventIds = [];
    room.events = room.events.filter((event) => {
      if (event.status === 'cancelled') return false;

      if (eventIds.includes(event.etag)) {
        return false;
      }

      eventIds.push(event.etag);

      const eventStart = new Date(event.start.dateTime).getTime();
      const eventEnd = new Date(event.end.dateTime).getTime();

      return (eventStart > new Date(start).getTime()) &&
      (eventEnd < new Date(end).getTime());
    }).sort((a, b) => a.start.dateTime > b.start.dateTime);
  }

  roomEvents.sort((a, b) => {
    if (a.name < b.name) return -1;
    return 1;
  });

  console.log('EVENTS@LIST EVENTS', roomEvents);

  return roomEvents;
};

export const getCalendarEvents = async (opts) => {
  if (window.gapi.client && window.gapi.client.calendar) {
    return listEvents(opts);
  }

  await googleInit();
  return listEvents(opts);
};

export const addCalendarEvent = (event) => {
  console.log('ADDING EVENT...');
  window.gapi.client.calendar.events.insert({
    calendarId: 'primary',
    resource: event,
  }).then((result) => console.log('result', result));
};
