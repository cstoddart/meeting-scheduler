import { scope } from '../constants';

export function getUser() {
  if (!window.gapi || !window.gapi.auth2) {
    return false;
  }

  window.gapi.auth2.getAuthInstance()
    .then((GoogleAuth) => {
      return GoogleAuth.currentUser.get();
    });

  return false;
}

export function signIn() {
  return new Promise((resolve) => {
    window.gapi.auth2.getAuthInstance()
      .then((GoogleAuth) => {
        const isSignedIn = GoogleAuth.isSignedIn.get();
        if (isSignedIn) {
          resolve();
        } else {
          GoogleAuth.signIn({ scope, ux_mode: 'redirect' }).then(() => {
            resolve();
          });
        }
      });
  });
}
