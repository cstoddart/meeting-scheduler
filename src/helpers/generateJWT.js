import * as firebaseui from 'firebaseui';

// {
//   'type': 'service_account',
//   'project_id': 'meeting-scheduler-197918',
//   'private_key_id': '44b2aaaeb87ea9141824e04f189e3523ae1125fc',
//   'private_key': '-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDFVL67j8pQiN0x\nqrSyfJLTSCdjNrytUTuD/l3a9Uj002jh1ICOiT3q2WengtAnseHnFoVEokPm1qtk\nOYAUFOTYOkI5kOMLLOh2hrLzW3qUvV4QJY/fTYVzf/1el57m6brsKGrlnrISqz9r\nCrllhASyQrRicref1OD1yR0KNnRJwskbiysB13Nua5XRonFTfkuGQNPl+LRIcGPa\n6OzFMB2pSnKbVEMSZj7/D/KDTeDpnPPGXa19RpaXaLB1AA2aFBWmLMynXPwNTtpu\nc127c6DyHHJ2yXZe5aTpkOQu1lN7q8kd8EnPlNpxs2HyjKZ+bHl4iL5zEq/1Dmei\nhQ+z6innAgMBAAECggEAGKE/PUHxSqQKl8xqyWxrFxwGbofCfQ+KkisJo+7BsG1C\nxg00DpZquAlyuqHFQW8edy2EbNCkEQfyVIwoxFjnR2XeJjlDXX25djHR3DYq0q3g\nM7u8fW67nXL4OPpLxx6dSiSxUv+/0jy1qbKo+VbFD0rsIO2YpcZ4XbVAfqnVUe9Z\npg7LPPE1+uTx+gAjCIha3/JP/+8onmi0gF8JKAOCqtkZMMUDmJL34q6U9JwOq7Ay\ny61ccWehn/g++W4+3FttTNQsrknbvsr0TT2Suuxfm5dgJpmTs0lciKnq3XlRyiki\nKHqpAbcXA6wSfWYwkSsiXEH2F3yADi7sBwpoLyhzgQKBgQD58ZV4LOblVtHRRo1h\n2hy71M5lhahLX5zzstlTR2dPHLy9pM69dkCZjRIh7oJtf36OhGvyDyFdokqntYO9\nQNkzmX3d9NczJM0Ctj+bsYrZg8OsN7VH987ZLJz6mtz8+ZBRP/U8wHkom9yCXQoF\nzeaBlcv4JwRbMEwfkSo29P7Q9wKBgQDKHM05SXipwSHwpA2EX9zirieyx/4Flwot\nZmqvbZ1o04ozVvgNonN+9lu2sY4iLbDISBLG3E3v/PIArwxkC8uLCgIh0f1Fcf/O\nMxLV7WVB3Io62wDUvo8aSjVF23Kp5Yleh5QakSux/83q7f5fXSkY0/SodUkOdOyG\nOPY5NpMikQKBgQDuTdT5+K3I2cdA5iiktEWTHKoRB6dW/flyLQKiMUEhn7+gfQMU\nhyu+e09fhL1cUyPCFCWra5ufX74YOqs5hRvR47WrKucHfz3sKQFqm5NMIiItEAxK\nas4QKEYfdgnfNL7RiM50NvsNqdVLghOtRwxQXxdTKTgxDVJ3AnwiW+KcLwKBgEyP\n4IYE+PqFONAptR0iG1CbXFpzPBzt/GL6WwudYHWnPMD5/vlbQpkjxdZNKGR2HnOg\nKcy/A58XmKz9opn7hd1jqy8YlvLJnneEDWyQgz0RyCNHducgUKFK3ydZW/RUCVeP\n0GDIAV9qYZzPDv8dEUZgdFukIkqhrD+kMFG4BMChAoGAV0tkk2mGMySGeaixEgYe\n9bm9+zQiqcklmQI5+D0/xBuirypbuyIc+ic6vDJFke0cVT9M9uRo9T6bwt2w7h/s\nmXnQ0VvmCQhfbI7XTH6qENOGtFGkmGgCjals20jw/D5HGOaUuM4cYJnK7i2e727D\nVDPDvs8xAEdSt73OVtY9oi4=\n-----END PRIVATE KEY-----\n',
//   'client_email': 'meeting-scheduler@meeting-scheduler-197918.iam.gserviceaccount.com',
//   'client_id': '103710162278859994169',
//   'auth_uri': 'https://accounts.google.com/o/oauth2/auth',
//   'token_uri': 'https://accounts.google.com/o/oauth2/token',
//   'auth_provider_x509_cert_url': 'https://www.googleapis.com/oauth2/v1/certs',
//   'client_x509_cert_url': 'https://www.googleapis.com/robot/v1/metadata/x509/meeting-scheduler%40meeting-scheduler-197918.iam.gserviceaccount.com'
// }

const firebase = new firebaseui.auth.AuthUI(firebaseui.auth());

const firebaseConfig = {
  signInSuccessful: 'https://cstoddart-meeting-scheduler.firebaseapp.com/about',
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
  ]
}

firebase.start('#firebaseuiauth-container', firebaseConfig);

// export const generateJWT = () => {
//   const now = new Date();

//   const header = {'alg':'RS256','typ':'JWT'};
//   const headerString = JSON.stringify(header);
//   const header64 = Buffer.from(headerString).toString('base64');

//   const claimSet = {
//     iss: 'meeting-scheduler@meeting-scheduler-197918.iam.gserviceaccount.com',
//     scope: 'https://www.googleapis.com/auth/calendar',
//     aud: 'https://www.googleapis.com/oauth2/v4/token',
//     exp: addHours(now, 1).getTime(),
//     iat: now,
//     sub: 'chris.stoddart@dialexa.com'
//   };

//   const claimSetString = JSON.stringify(claimSet);
//   const claimSet64 = Buffer.from(claimSetString).toString('base64');

//   // const signatureString = process.env.REACT_APP_PRIVATE_ID;
//   const signatureString = '-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDFVL67j8pQiN0x\nqrSyfJLTSCdjNrytUTuD/l3a9Uj002jh1ICOiT3q2WengtAnseHnFoVEokPm1qtk\nOYAUFOTYOkI5kOMLLOh2hrLzW3qUvV4QJY/fTYVzf/1el57m6brsKGrlnrISqz9r\nCrllhASyQrRicref1OD1yR0KNnRJwskbiysB13Nua5XRonFTfkuGQNPl+LRIcGPa\n6OzFMB2pSnKbVEMSZj7/D/KDTeDpnPPGXa19RpaXaLB1AA2aFBWmLMynXPwNTtpu\nc127c6DyHHJ2yXZe5aTpkOQu1lN7q8kd8EnPlNpxs2HyjKZ+bHl4iL5zEq/1Dmei\nhQ+z6innAgMBAAECggEAGKE/PUHxSqQKl8xqyWxrFxwGbofCfQ+KkisJo+7BsG1C\nxg00DpZquAlyuqHFQW8edy2EbNCkEQfyVIwoxFjnR2XeJjlDXX25djHR3DYq0q3g\nM7u8fW67nXL4OPpLxx6dSiSxUv+/0jy1qbKo+VbFD0rsIO2YpcZ4XbVAfqnVUe9Z\npg7LPPE1+uTx+gAjCIha3/JP/+8onmi0gF8JKAOCqtkZMMUDmJL34q6U9JwOq7Ay\ny61ccWehn/g++W4+3FttTNQsrknbvsr0TT2Suuxfm5dgJpmTs0lciKnq3XlRyiki\nKHqpAbcXA6wSfWYwkSsiXEH2F3yADi7sBwpoLyhzgQKBgQD58ZV4LOblVtHRRo1h\n2hy71M5lhahLX5zzstlTR2dPHLy9pM69dkCZjRIh7oJtf36OhGvyDyFdokqntYO9\nQNkzmX3d9NczJM0Ctj+bsYrZg8OsN7VH987ZLJz6mtz8+ZBRP/U8wHkom9yCXQoF\nzeaBlcv4JwRbMEwfkSo29P7Q9wKBgQDKHM05SXipwSHwpA2EX9zirieyx/4Flwot\nZmqvbZ1o04ozVvgNonN+9lu2sY4iLbDISBLG3E3v/PIArwxkC8uLCgIh0f1Fcf/O\nMxLV7WVB3Io62wDUvo8aSjVF23Kp5Yleh5QakSux/83q7f5fXSkY0/SodUkOdOyG\nOPY5NpMikQKBgQDuTdT5+K3I2cdA5iiktEWTHKoRB6dW/flyLQKiMUEhn7+gfQMU\nhyu+e09fhL1cUyPCFCWra5ufX74YOqs5hRvR47WrKucHfz3sKQFqm5NMIiItEAxK\nas4QKEYfdgnfNL7RiM50NvsNqdVLghOtRwxQXxdTKTgxDVJ3AnwiW+KcLwKBgEyP\n4IYE+PqFONAptR0iG1CbXFpzPBzt/GL6WwudYHWnPMD5/vlbQpkjxdZNKGR2HnOg\nKcy/A58XmKz9opn7hd1jqy8YlvLJnneEDWyQgz0RyCNHducgUKFK3ydZW/RUCVeP\n0GDIAV9qYZzPDv8dEUZgdFukIkqhrD+kMFG4BMChAoGAV0tkk2mGMySGeaixEgYe\n9bm9+zQiqcklmQI5+D0/xBuirypbuyIc+ic6vDJFke0cVT9M9uRo9T6bwt2w7h/s\nmXnQ0VvmCQhfbI7XTH6qENOGtFGkmGgCjals20jw/D5HGOaUuM4cYJnK7i2e727D\nVDPDvs8xAEdSt73OVtY9oi4=\n-----END PRIVATE KEY-----\n';
//   const signature64 = Buffer.from(signatureString).toString('base64');

//   const jwt = `${header64}.${claimSet64}.${signature64}`;
//   console.log('JWT', jwt);
//   return jwt;
// }

// const claimSet = {
//   iss: 'meeting-scheduler@meeting-scheduler-197918.iam.gserviceaccount.com',
//   scope: 'https://www.googleapis.com/auth/calendar',
//   aud: 'https://www.googleapis.com/oauth2/v4/token',
//   sub: 'chris.stoddart@dialexa.com'
// };

// const cert = '-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDFVL67j8pQiN0x\nqrSyfJLTSCdjNrytUTuD/l3a9Uj002jh1ICOiT3q2WengtAnseHnFoVEokPm1qtk\nOYAUFOTYOkI5kOMLLOh2hrLzW3qUvV4QJY/fTYVzf/1el57m6brsKGrlnrISqz9r\nCrllhASyQrRicref1OD1yR0KNnRJwskbiysB13Nua5XRonFTfkuGQNPl+LRIcGPa\n6OzFMB2pSnKbVEMSZj7/D/KDTeDpnPPGXa19RpaXaLB1AA2aFBWmLMynXPwNTtpu\nc127c6DyHHJ2yXZe5aTpkOQu1lN7q8kd8EnPlNpxs2HyjKZ+bHl4iL5zEq/1Dmei\nhQ+z6innAgMBAAECggEAGKE/PUHxSqQKl8xqyWxrFxwGbofCfQ+KkisJo+7BsG1C\nxg00DpZquAlyuqHFQW8edy2EbNCkEQfyVIwoxFjnR2XeJjlDXX25djHR3DYq0q3g\nM7u8fW67nXL4OPpLxx6dSiSxUv+/0jy1qbKo+VbFD0rsIO2YpcZ4XbVAfqnVUe9Z\npg7LPPE1+uTx+gAjCIha3/JP/+8onmi0gF8JKAOCqtkZMMUDmJL34q6U9JwOq7Ay\ny61ccWehn/g++W4+3FttTNQsrknbvsr0TT2Suuxfm5dgJpmTs0lciKnq3XlRyiki\nKHqpAbcXA6wSfWYwkSsiXEH2F3yADi7sBwpoLyhzgQKBgQD58ZV4LOblVtHRRo1h\n2hy71M5lhahLX5zzstlTR2dPHLy9pM69dkCZjRIh7oJtf36OhGvyDyFdokqntYO9\nQNkzmX3d9NczJM0Ctj+bsYrZg8OsN7VH987ZLJz6mtz8+ZBRP/U8wHkom9yCXQoF\nzeaBlcv4JwRbMEwfkSo29P7Q9wKBgQDKHM05SXipwSHwpA2EX9zirieyx/4Flwot\nZmqvbZ1o04ozVvgNonN+9lu2sY4iLbDISBLG3E3v/PIArwxkC8uLCgIh0f1Fcf/O\nMxLV7WVB3Io62wDUvo8aSjVF23Kp5Yleh5QakSux/83q7f5fXSkY0/SodUkOdOyG\nOPY5NpMikQKBgQDuTdT5+K3I2cdA5iiktEWTHKoRB6dW/flyLQKiMUEhn7+gfQMU\nhyu+e09fhL1cUyPCFCWra5ufX74YOqs5hRvR47WrKucHfz3sKQFqm5NMIiItEAxK\nas4QKEYfdgnfNL7RiM50NvsNqdVLghOtRwxQXxdTKTgxDVJ3AnwiW+KcLwKBgEyP\n4IYE+PqFONAptR0iG1CbXFpzPBzt/GL6WwudYHWnPMD5/vlbQpkjxdZNKGR2HnOg\nKcy/A58XmKz9opn7hd1jqy8YlvLJnneEDWyQgz0RyCNHducgUKFK3ydZW/RUCVeP\n0GDIAV9qYZzPDv8dEUZgdFukIkqhrD+kMFG4BMChAoGAV0tkk2mGMySGeaixEgYe\n9bm9+zQiqcklmQI5+D0/xBuirypbuyIc+ic6vDJFke0cVT9M9uRo9T6bwt2w7h/s\nmXnQ0VvmCQhfbI7XTH6qENOGtFGkmGgCjals20jw/D5HGOaUuM4cYJnK7i2e727D\nVDPDvs8xAEdSt73OVtY9oi4=\n-----END PRIVATE KEY-----\n';

// export const generateJWT = () => {
//   const token = jwt.sign(claimSet, cert, { algorithm: 'RS256', expiresIn: '1h' });
//   console.log('TOKEN', token);

//   // const verify = jwt.verify(token, cert);
//   // console.log('VERIFY', verify);

//   return token;
// };
