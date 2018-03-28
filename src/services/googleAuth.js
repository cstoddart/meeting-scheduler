import { googleApiKey, googleClientId } from '../keys';

const scope = 'email profile https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/calendar.readonly';

const signIn = (callback) => {
  const GoogleAuth = window.gapi.auth2.getAuthInstance();
  GoogleAuth.signIn({
    scope,
  }).then(() => callback());
};

const initializeClient = (callback) => {
  window.gapi.client.init({
    apiKey: googleApiKey,
    discoveryDocs: [
      'https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest',
    ],
    clientId: googleClientId,
    scope,
  }).then(() => signIn(callback));
};

const initializeAuth = (callback) => {
  window.gapi.auth2.init({
    client_id: googleClientId,
    scope,
  }).then(() => initializeClient(callback));
};

export const googleAuth = (callback) => {
  window.gapi.load('client:auth2', () => initializeAuth(callback));
};

