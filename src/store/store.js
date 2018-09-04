import { observable, action } from 'mobx';

import { googleInit } from '../services/google/init';
import { getCalendarEvents } from '../services/google/calendar';
import { googleSignOut } from '../services/google/auth';
import { getSlackUsers } from '../services/slack/users';
import { DUMMY_ROOM_EVENTS, DUMMY_USER, DUMMY_EMAILS } from '../constants/dummyData';

class Store {
  @observable roomEvents = [];
  @observable user = false;
  @observable emails = [];

  @action
  getEvents = async (opts) => {
    // const roomEvents = await getCalendarEvents(opts);
    // this.roomEvents = roomEvents;
    this.roomEvents = DUMMY_ROOM_EVENTS;
  }

  @action
  signIn = async () => {
    // const GoogleUser = await googleInit();
    // const profile = GoogleUser.getBasicProfile();
    // const user = {
    //   name: profile.getName(),
    //   email: profile.getEmail(),
    //   firstName: profile.getGivenName(),
    //   lastName: profile.getFamilyName(),
    //   isSignedIn: GoogleUser.isSignedIn(),
    // };

    // this.user = user;
    this.user = DUMMY_USER;

    this.getEmails();
  }

  @action
  signOut = async () => {
    await googleSignOut();
    this.user = false;
    window.location.reload();
  }

  @action
  getEmails = async () => {
    // const slackUsers = await getSlackUsers();
    // const emails = slackUsers
    // .map(({ profile }) => profile.email)
    // .filter((email) => email && email.includes('dialexa.com'));

    // this.emails = emails;
    this.emails = DUMMY_EMAILS;
  }
}

export default new Store();
