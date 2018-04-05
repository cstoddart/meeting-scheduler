import { scope } from '../constants';

export const isSignedIn = () => (
  window.gapi.auth2.getAuthInstance()
    .then((GoogleAuth) => GoogleAuth.isSignedIn.get())
);

export function signIn() {
  window.gapi.auth2.getAuthInstance()
    .then((GoogleAuth) => GoogleAuth.signIn({ scope }));
}
