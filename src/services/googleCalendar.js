import { googleAuth } from './googleAuth';
// import { rooms } from '../rooms';

const listEvents = () => (
  window.gapi.client.calendar.events.list({
    // calendarId: "primary",
    calendarId: 'dialexa.com_36333236303434362d393430@resource.calendar.google.com',
    timeMax: '2018-02-03T10:00:00-07:00',
    timeMin: '2018-01-03T10:00:00-07:00',
  }).then(({ result }) => result.items)
);

export const getCalendarEvents = async () => {
  if (window.gapi.client && window.gapi.client.calendar) {
    return listEvents();
  }

  const ga = await googleAuth();
  console.log('GA', ga);

  return listEvents();
};
