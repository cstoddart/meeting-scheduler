import { googleInit } from './googleInit';

const requestEvents = (accessToken, callback) => async () => {
  console.log("REQUESTING EVENTS...");
  await window.gapi.client.request({
    path: 'https://content.googleapis.com/calendar/v3/calendars/primary/events?key=AIzaSyB3DyA_gJJn94MlsHdxoALORleuDNagzD0',
    headers: {
      authorization: `Bearer ${accessToken}`
    }
  }).execute(events => {
    callback(events.items);
  });
}

export const getCalendarEvents = async (accessToken, callback) => {
  if (!window.gapi.client) {
    googleInit(requestEvents(accessToken, callback));
  } else {
    requestEvents(accessToken, callback);
  }
}
