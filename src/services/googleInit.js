import { googleApiKey, googleClientId } from '../keys';
import { scope } from '../constants';

function initializeClient() {
  window.gapi.client.init({
    apiKey: googleApiKey,
    discoveryDocs: [
      'https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest',
    ],
    clientId: googleClientId,
    scope,
  });
}

function initializeAuth() {
  window.gapi.auth2.init({
    client_id: googleClientId,
    scope,
  }).then(initializeClient);
}

export function googleInit() {
  return new Promise((resolve) => {
    return window.gapi.load('client:auth2', () => resolve(initializeAuth()));
  });
}
