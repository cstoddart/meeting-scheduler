import { startOfDay, endOfDay, startOfToday, endOfToday } from 'date-fns';

import { googleInit } from './googleInit';
import { roomsArray } from '../constants/rooms';

const listEvents = async (opts = {}) => {
  const { calendarView } = opts;
  const roomNames = opts.rooms || roomsArray.map((room) => room.name);
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
    room.events = room.events.filter((item) => {
      if (item.status === 'cancelled') return false;

      const itemStart = new Date(item.start.dateTime).getTime();
      const itemEnd = new Date(item.end.dateTime).getTime();

      return (itemStart > new Date(start).getTime()) &&
      (itemEnd < new Date(end).getTime());
    });
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
