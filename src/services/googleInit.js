import { googleApiKey, googleClientId } from '../keys';
import { scope } from '../constants';
import Promise from 'bluebird';

export function googleInit() {
  console.log('Initializing gapi...');
  return new Promise((resolve) => {
    window.gapi.load('client:auth2', () => {
      window.gapi.client.init({
        apiKey: googleApiKey,
        discoveryDocs: [
          'https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest',
        ],
        clientId: googleClientId,
        scope,
      }).then(() => {
        return window.gapi.auth2.init({
          client_id: googleClientId,
          scope,
        }).then(resolve); // Google Thenable
      });
    });
  });
}
