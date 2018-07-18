import { startOfDay, endOfDay, startOfToday, endOfToday } from 'date-fns';

import { alphabetize } from '../../utils';
import { googleInit } from './init';
import { ROOMS } from '../../constants';
import { Promise } from 'core-js';

const listEvents = async (opts = {}) => {
  const { calendarView } = opts;
  const roomNames = ROOMS.map((room) => room.name);
  const roomEvents = [];

  const start = calendarView ? startOfDay(new Date(calendarView)) : startOfToday();
  const end = calendarView ? endOfDay(new Date(calendarView)) : endOfToday();

  for (const roomName of roomNames) {
    const { id } = ROOMS.find((room) => room.name === roomName);
    await window.gapi.client.calendar.events.list({
      calendarId: id,
      timeMin: start.toISOString(),
      timeMax: end.toISOString(),
      singleEvents: true,
    }).then(({ result }) => {
      roomEvents.push({
        name: roomName,
        events: result.items,
      });
    });
  }

  for (const room of roomEvents) {
    room.events = room.events.sort((a, b) => a.start.dateTime > b.start.dateTime);
  }

  return alphabetize(roomEvents, 'name');
};

export const getCalendarEvents = async (opts) => {
  if (window.gapi.client && window.gapi.client.calendar) {
    return listEvents(opts);
  }

  await googleInit();
  return listEvents(opts);
};

export const addCalendarEvent = (event) => {
  const room = ROOMS.find((r) => r.name === event.room).id;
  return new Promise((resolve) => {
    window.gapi.client.calendar.events.insert({
      calendarId: 'primary',
      sendNotifications: true,
      summary: event.title,
      start: {
        dateTime: event.start,
      },
      end: {
        dateTime: event.end,
      },
      description: event.description,
      creator: event.user,
      attendees: [...event.attendees, room].map((email) => ({ email })),
    }).then(() => resolve());
  });
};
