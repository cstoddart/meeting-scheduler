import { scope } from '../constants';

export function googleSignOut() {
  window.gapi.auth2.getAuthInstance()
    .then((GoogleAuth) => GoogleAuth.signOut());
}

export function googleSignIn() {
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
