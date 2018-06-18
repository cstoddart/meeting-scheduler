import Promise from 'bluebird';

import { GOOGLE_API_KEY, GOOGLE_CLIENT_ID } from '../../constants';
import { googleSignIn } from './auth';
import { SCOPE } from '../../constants';

export function googleInit() {
  return new Promise((resolve) => {
    window.gapi.load('client:auth2', () => {
      window.gapi.client.init({
        apiKey: GOOGLE_API_KEY,
        discoveryDocs: [
          'https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest',
        ],
        clientId: GOOGLE_CLIENT_ID,
        scope: SCOPE,
      }).then(() => {
        return window.gapi.auth2.init({
          client_id: GOOGLE_CLIENT_ID,
          scope: SCOPE,
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
