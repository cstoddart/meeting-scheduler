import Promise from 'bluebird';

import { googleApiKey, googleClientId } from '../keys';
import { googleSignIn } from './googleAuth';
import { SCOPE } from '../constants';

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
        SCOPE,
      }).then(() => {
        return window.gapi.auth2.init({
          client_id: googleClientId,
          SCOPE,
        }).then(() => {
          return googleSignIn().then(window.gapi.auth2.getAuthInstance()
            .then((GoogleAuth) => {
              resolve(GoogleAuth.currentUser.get());
            }));
        });
      });
    });
  });
}
