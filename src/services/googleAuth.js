import { googleInit } from './googleInit';

const authorize = (callback) => () => {
  if (window.gapi.auth2) {
    console.log("authorizing.....");
    window.gapi.auth2.authorize({
      client_id: '290258087421-l8cck249qan0k2nbealve3d4q3h1i52g.apps.googleusercontent.com',
      scope: "email profile https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/calendar.readonly",
      response_type: 'id_token permission',
    }, ({ access_token }) => callback(access_token));
  }
}

export const googleAuth = (callback) => {
  if (!window.gapi.auth2) {
    googleInit(authorize(callback));
  } else {
    authorize(callback);
  }
}
