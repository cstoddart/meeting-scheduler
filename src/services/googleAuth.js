import { googleInit } from './googleInit';

export const googleAuth = async () => {
  if (!window.gapi.auth2) {
    const result = await googleInit();
    console.log('GOOGLE INIT RESULT', result);
  }

  if (window.gapi.auth2) {
    await window.gapi.auth2.authorize({
      client_id: '290258087421-l8cck249qan0k2nbealve3d4q3h1i52g.apps.googleusercontent.com',
      scope: "email profile https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/calendar.readonly",
      response_type: 'id_token permission',
    }, ({ access_token }) => {
      return access_token;
    });
  }
}
