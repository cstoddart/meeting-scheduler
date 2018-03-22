/* global firebase */
/* global firebaseui */

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { configureStore } from './store/configureStore';
import App from './components/app/App';
import registerServiceWorker from './registerServiceWorker';
import axios from 'axios';

require('dotenv').config();

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <div>
      <App />
      <div id="firebaseui-auth-container"></div>
    </div>
  </Provider>, document.getElementById('root')
);

registerServiceWorker();

var config = {
  apiKey: "AIzaSyBET2u2IqDZltYKApy0dHwOOqENlNH5iro",
  authDomain: "cstoddart-meeting-scheduler.firebaseapp.com",
  databaseURL: "https://cstoddart-meeting-scheduler.firebaseio.com",
  projectId: "cstoddart-meeting-scheduler",
  storageBucket: "cstoddart-meeting-scheduler.appspot.com",
  messagingSenderId: "394986955881",
  clientId: "290258087421-l8cck249qan0k2nbealve3d4q3h1i52g.apps.googleusercontent.com",
  scopes: [
    "email",
    "profile",
    "https://www.googleapis.com/auth/calendar",
    "https://www.googleapis.com/auth/calendar.readonly",
  ],
  discoveryDocs: [
    "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest",
  ]
};


firebase.initializeApp(config);

var uiConfig = {
  signInSuccessUrl: "localhost:3000", // Assuming you are running on your local machine
  signInOptions: [
    {
      provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      scopes: config.scopes
    }
  ],
  // Terms of service url.
  tosUrl: "<your-tos-url>"
};

// Initialize the FirebaseUI Widget using Firebase.
var ui = new firebaseui.auth.AuthUI(firebase.auth());
// The start method will wait until the DOM is loaded.
ui.start("#firebaseui-auth-container", uiConfig);

window.gapi.load('client:auth2', {
  callback: function() {
    // Handle gapi.client initialization.
    console.log('callback...');
    // window.gapi.client
    //   .init({
    //     apiKey: config.apiKey,
    //     // apiKey: "AIzaSyB3DyA_gJJn94MlsHdxoALORleuDNagzD0",
    //     clientId: config.clientID,
    //     discoveryDocs: config.discoveryDocs,
    //     scope: config.scopes.join(" ")
    //   })
    //   // Loading is finished, so start the app
    //   .then(function() {
    //     // Make sure the Google API Client is properly signed in
    //     // if (window.gapi.auth2.getAuthInstance().isSignedIn.get()) {
    //     //   startApp();
    //     // } else {
    //     //   console.log('signing out...');
    //     //   firebase.auth().signOut(); // Something went wrong, sign out
    //     // }
    //     window.gapi.auth2.init({
    //       client_id: "290258087421-l8cck249qan0k2nbealve3d4q3h1i52g.apps.googleusercontent.com"
    //     })
    //     startApp();
    //   });
    window.gapi.auth2.authorize({
      client_id: '290258087421-l8cck249qan0k2nbealve3d4q3h1i52g.apps.googleusercontent.com',
      scope: "email profile https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/calendar.readonly",
      response_type: 'id_token permission',
    }, (user) => startApp(user));
  },
  onerror: function() {
    // Handle loading error.
    alert('gapi.client failed to load!');
  },
  timeout: 5000, // 5 seconds.
  ontimeout: function() {
    // Handle timeout.
    alert('gapi.client could not load in a timely manner!');
  }
});

// This function will trigger when there is a login event
firebase.auth().onAuthStateChanged(function(user) {
  console.log(user)
  // Make sure there is a valid user object
  if (user) {
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "https://apis.google.com/js/api.js";
    // Once the Google API Client is loaded, you can run your code
    script.onload = function(e) {
      // Initialize the Google API Client with the config object
      // window.gapi.client
      //   .init({
      //     apiKey: config.apiKey,
      //     clientId: config.clientID,
      //     discoveryDocs: config.discoveryDocs,
      //     scope: config.scopes.join(" ")
      //   })
      //   // Loading is finished, so start the app
      //   .then(function() {
      //     // Make sure the Google API Client is properly signed in
      //     if (window.gapi.auth2.getAuthInstance().isSignedIn.get()) {
      //       startApp(user);
      //     } else {
      //       firebase.auth().signOut(); // Something went wrong, sign out
      //     }
      //   });
    };
    // Add to the document
    document.getElementsByTagName("head")[0].appendChild(script);
  }
});

function startApp(user) {
  console.log('user@startApp()', user);

  // Make sure to refresh the Auth Token in case it expires!
  firebase.auth().currentUser.getToken()
  .then(async function(token){
    await window.gapi.client.request({
      path: `https://www.googleapis.com/oauth2/v2/tokeninfo?access_token=${user.access_token}&key=AIzaSyB3DyA_gJJn94MlsHdxoALORleuDNagzD0`,
      method: 'post'
    })
    return window.gapi.client.request({
      path: 'https://content.googleapis.com/calendar/v3/calendars/primary/events?key=AIzaSyB3DyA_gJJn94MlsHdxoALORleuDNagzD0',
      headers: {
        authorization: `Bearer ${user.access_token}`
      }
    });
  //  return window.gapi.client.calendar.events
  //   .list({
  //     calendarId: "primary",
  //     timeMin: new Date().toISOString(),
  //     showDeleted: false,
  //     singleEvents: true,
  //     maxResults: 10,
  //     orderBy: "startTime"
  //   })
  })
  .then(function(response) {
    console.log(response);
  });
}
