import * as firebase from 'firebase';

var config = {
  apiKey: "AIzaSyBET2u2IqDZltYKApy0dHwOOqENlNH5iro",
  authDomain: "cstoddart-meeting-scheduler.firebaseapp.com",
  databaseURL: "https://cstoddart-meeting-scheduler.firebaseio.com",
  projectId: "cstoddart-meeting-scheduler",
  storageBucket: "cstoddart-meeting-scheduler.appspot.com",
  messagingSenderId: "394986955881"
};

firebase.initializeApp(config);

export const googleSignIn = async () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  provider.addScope('https://www.googleapis.com/auth/calendar');

  const result = await firebase.auth().signInWithPopup(provider)

  return result;
};
