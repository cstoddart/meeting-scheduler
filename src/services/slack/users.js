import axios from 'axios';
import { Promise } from 'core-js';

export function getSlackUsers() {
  return new Promise((resolve) => {
    axios({
      url: 'https://slack.com/api/users.list',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      params: {
        token: 'xoxa-2314941267-402756786179-402335364161-5f60117e3091c73fc468800dba061ce1',
      },
    }).then((res) => resolve(res.data.members));
  });
}
