import { scope } from '../constants';

export function signIn() {
  return new Promise((resolve) => {
    window.gapi.auth2.getAuthInstance()
      .then((GoogleAuth) => {
        const isSignedIn = GoogleAuth.isSignedIn.get();
        if (isSignedIn) {
          resolve();
        } else {
          GoogleAuth.signIn({ scope }).then(() => {
            resolve();
          });
        }
      });
  });
}
