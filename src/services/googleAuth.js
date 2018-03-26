const scope = "email profile https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/calendar.readonly";

const signIn = (callback) => {
  const GoogleAuth = window.gapi.auth2.getAuthInstance();
  GoogleAuth.signIn({
    scope,
  }).then(() => callback());
}

const initializeClient = (callback) => {
  window.gapi.client.init({
    apiKey: process.env.GOOGLE_API_KEY,
    discoveryDocs: [
      "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest",
    ],
    clientId: process.env.GOOGLE_CLIENT_ID,
    scope,
  }).then(() => signIn(callback));
}

const initializeAuth = (callback) => {
  console.log("PROCESS", process.env.GOOGLE_CLIENT_ID);
  window.gapi.auth2.init({
    client_id: process.env.GOOGLE_CLIENT_ID,
    scope,
  }).then(() => initializeClient(callback));
}

export const googleAuth = (callback) => {
  window.gapi.load('client:auth2', () => initializeAuth(callback));
}
