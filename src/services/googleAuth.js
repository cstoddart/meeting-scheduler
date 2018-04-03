import { googleApiKey, googleClientId } from '../keys';

const scope = 'email profile https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/calendar.readonly';

function signIn() {
  return window.gapi.auth2.getAuthInstance()
    .then((GoogleAuth) => GoogleAuth.signIn({ scope }));
}

function initializeClient() {
  return window.gapi.client.init({
    apiKey: googleApiKey,
    discoveryDocs: [
      'https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest',
    ],
    clientId: googleClientId,
    scope,
  }).then(signIn);
}

function initializeAuth() {
  return window.gapi.auth2.init({
    client_id: googleClientId,
    scope,
  }).then(initializeClient);
}

export function googleAuth() {
  return new Promise((resolve) => {
    return window.gapi.load('client:auth2', () => resolve(initializeAuth()));
  });
}
