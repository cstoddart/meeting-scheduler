const admin = require('firebase-admin');
const functions = require('firebase-functions');
const { google } = require('googleapis');

const rooms = [
  'dialexa.com_2d36353630343238393639@resource.calendar.google.com',
  'dialexa.com_3230393539393139333338@resource.calendar.google.com',
  // 'dialexa.com_33363639383435332d363534@resource.calendar.google.com',
  // 'dialexa.com_3336373831383538363830@resource.calendar.google.com',
  // 'dialexa.com_3430353337323538383438@resource.calendar.google.com',
  // 'dialexa.com_34313336323338362d313236@resource.calendar.google.com',
  // 'dialexa.com_3537323630303837333231@resource.calendar.google.com',
  // 'dialexa.com_3633313231353031313733@resource.calendar.google.com',
  // 'dialexa.com_36333236303434362d393430@resource.calendar.google.com',
  // 'dialexa.com_36363237303736302d3531@resource.calendar.google.com',
  // 'dialexa.com_36383239353238313732@resource.calendar.google.com',
];

admin.initializeApp(functions.config().firebase);
const firestore = admin.firestore();
const settings = { timestampsInSnapshots: true }; // added to appease console error gods
firestore.settings(settings);

function createClient() {
  return new Promise((resolve, reject) => {
    const private_key = "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCnA/PCpoUNL0Wi\nxHvsgOXXMvdLlJNlc8COks/E39YevexczBk7TMpXjk290ko2qk5tIRhwqs4bjqzC\n8Ln7SbywYboYS4NckDSuaT1+0dcl3OljRic+Qzq+5QqEyjBpVTPEV8zca4M7AjYH\nwltvAuBBmA4jJHnXXd7MTDuJ7wQqrfa4WJ3shILh0nmRNVtPZ6THeBGVBEUpfhBj\nJ4oWhuhnMCpeksHyOLro/C6Jfbl8i1tH7wjk/9Po/fuLAd8GEWbuDUzVFRekW6na\ng2GMv1YVHSizZchiJKAJTLe+jlxMtfUyQkuAhhLumWiYmFsFLIMjwaWD1Q09zsdo\nnvFnWwwTAgMBAAECggEANaTlVK4bqkJ2wXMOwsYcDOUH3TTZqwpk3OZ26atjoPgr\nxRqhOBTQIRNKESBMSgalrhOlP/r8vIk1IGAlvHrQqm6ZUVhf1wlSgnq3D9binfy4\n0fQkgrEhW1NB76jpp8uAFx6EZH/75KYvKIrax2tLEIaAc/UxVWWHPGN39DPbSMGW\nb3mHql0g56C2epcjnURj2AExofyi01qpnR5d3Lm2HVPPwLaG0VzIY1/IJJKJ0a8C\nJU5EJSIGVAHFz+pc/+mGaIFmAtoHHRYzGXWdM8Ni5zivsP71hgnFjecPhTCRDUWY\n9Jn+E2XfiIohR/xRgcHAE+QtLhTVUf4I9TPLeePbQQKBgQDf2QZN8YdBP3ACWgQy\nrU5lamZuwv9J1Lqmkb+DCHucO66YK+P6/xgqWaLyf50iwv6bh6Tyg0lEyWn7oaud\n/vECMjHTWnNbNxeL22IPA2euU9fPZlI2tYAE0avSw24NBf12BkwoObhvvh8jMgyy\n5VZgSRGnodxPYcn5HSxAzYZKEQKBgQC/AS37+E3Y9owIT530BHw6kS44Udur3iug\nNPwxDCbxT43EozjXJnQkRZlbHn61RZeAe6tJ+mk+IJL69A+uht1hLqoXrEyIaR19\na4d+1hlIbPKp6VgUqokT3RD7Z1zYxr/QszwVJv1GZFaj2HSIHURrODsVCPxTDAQW\nwygn4opv4wKBgQC5q/ImxKhD3rKxwKiqwEW+qTq9tNC8FM+dSldoAKlHNdnkLsOz\nddQ9jIw0SNW197fomeKfpXYosEhQiBEpxEV0ZN4fSW9VwaSuRRJZEaH2X2Uqity2\ntGWzmZbEA4ZNFyLduuuAkiABz9lUADe4S7IRu4oBWai7z4kQMLp8Jf21gQKBgFTI\nzkOxxcSQNDqgNMoTj51jwnOHio4w8YaM3oFbFpI5MQHfPiTq0dUj+93hnHcUrBqB\nSthsynikdvnkim17OhugXiph9hr7Jfb9W0jm+pQWoGThypJp3K0vjRE7oZAsMQsP\n9JSjGPw9H+Rc+eVNsIgzjq5YrcCjbdE40cNaoP7nAoGAWg4U4HR2iAG4QFW0fnD9\nUJobn0JcGK94DTqCPpbqTyz99LjtJCwYaxIlxENoLP8EpdwYqap2MbA8o9tVfK25\nQ003zBbDoSpLV2Y/+kLYjqBJc2rlZTCTv7OmUQJKQe2b+HoBBusOvKcIdCXa8ysD\nC9YoefN4dFEWAHwyEuMH3VA=\n-----END PRIVATE KEY-----\n";
    const client_id = "106586540095744025602";
    const scopes = 'https://www.googleapis.com/auth/calendar';
    const client = new google.auth.JWT(client_id, null, private_key, scopes, 'chris.stoddart@dialexa.com');

    client.authorize((err) => {
      if (err) reject(err);
      else resolve(client);
    });
  });
}

// function listEvents(client) {
//   return new Promise((resolve, reject) => {
//     google.calendar({
//       version: 'v3',
//       auth: client,
//     }).events.list({
//       calendarId: 'dialexa.com_3336373831383538363830@resource.calendar.google.com',
//     }).then(({ data }) => {
//       return resolve(data);
//     }).catch(reject(err));
//   });
// }

function watchCalendar(client, calendarId) {
  return new Promise((resolve, reject) => {
    google.calendar({
      version: 'v3',
      auth: client,
    }).events.watch({
      calendarId,
      resource: {
        id: 'calendarWatch',
        type: 'web_hook',
        token: calendarId,
        address: 'https://meetings.dialexa.com/updateEvents',
        params: {
          ttl: '864000'
        },
      },
    }).then(({ data }) => {
      return resolve(data);
    }).catch(reject);
  });
}

exports.watch = functions.https.onRequest((request, response) => {
  console.log('WATCH REQUEST RECEIVED...');
  let responses = [];
  rooms.forEach((room, index) => {
    createClient()
      .then((client) => {
        return watchCalendar(client, room).then((results) => {
          console.log('RESULTS SNEAK PEEK', results);
          responses.push(results);
          if (responses.length === rooms.length) {
            return response.status(200).send(responses);
          }
          return false;
        });
      })
      .catch((error) => response.status(500).send(error));
  });
});

exports.updateEvents = functions.https.onRequest((request, response) => {
  console.log('UPDATE REQUEST RECEIVED...');
  console.log('REQUEST HEADERS', request.headers['x-goog-channel-token']);
  firestore.collection('test_names').add({ name: 'name' });
  response.status(200).send(`Hey`);
});

/*
- Watch calendars at set interval
  - probably daily
  - watch is pub/sub that attaches to App Engine cron job
  - clear channel of watches first (https://developers.google.com/calendar/v3/reference/channels/stop)
  - set notification token = calendarId
  - receive sync token

- Receive notification at updateEvent
  - check token to determine calendarId

- Retrive updated events using calendarId
  - use sync token if not expired
  - if expired use updatedMin param
*/
