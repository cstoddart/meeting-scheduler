// import Promise from 'bluebird';
import { googleApiKey, googleClientId } from '../keys';

const scope = 'email profile https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/calendar.readonly';

async function signIn() {
  return await window.gapi.auth2.getAuthInstance()
    .then(async (GoogleAuth) => await GoogleAuth.signIn({ scope }));
}

async function initializeClient() {
  return await window.gapi.client.init({
    apiKey: googleApiKey,
    discoveryDocs: [
      'https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest',
    ],
    clientId: googleClientId,
    scope,
  }).then(() => signIn());
}

async function initializeAuth() {
  return await window.gapi.auth2.init({
    client_id: googleClientId,
    scope,
  }).then(() => initializeClient());
}

export async function googleAuth() {
  const data = await window.gapi.load('client:auth2', () => initializeAuth());
  console.log('DATA', data);
  return data;
}
