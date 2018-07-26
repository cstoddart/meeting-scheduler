const functions = require('firebase-functions');

exports.addEvent = functions.https.onRequest((request, response) => {
  response.send('HELLOOO!!!!!');
});
