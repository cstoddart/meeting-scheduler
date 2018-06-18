import { startOfDay, endOfDay, startOfToday, endOfToday } from 'date-fns';

import { alphabetize } from '../../helpers';
import { googleInit } from './init';
import { ROOMS } from '../../constants';

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

      if (eventIds.includes(event.etag)) return false;
      eventIds.push(event.etag);

      if (!event.location.includes(room.name)) return false;

      const eventStart = new Date(event.start.dateTime).getTime();
      const eventEnd = new Date(event.end.dateTime).getTime();

      return (eventStart > new Date(start).getTime()) &&
      (eventEnd < new Date(end).getTime());
    }).sort((a, b) => a.start.dateTime > b.start.dateTime);
  }

  console.log('EVENTS', alphabetize(roomEvents, 'name'));

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
  console.log('ADDING EVENT', event);
  window.gapi.client.calendar.events.insert({
    calendarId: 'chris.stoddart@dialexa.com',
    // resource: event,
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
    attendees: event.attendees,
  }).then((result) => console.log('result', result));
};
