import { observable, action } from 'mobx';

import { googleInit } from '../services/google/init';
import { getCalendarEvents } from '../services/google/calendar';
import { googleSignOut } from '../services/google/auth';
import { getSlackUsers } from '../services/slack/users';

class Store {
  @observable roomEvents = [];
  @observable user = false;
  @observable emails = [];

  @action
  getEvents = async (opts) => {
    const roomEvents = await getCalendarEvents(opts);
    this.roomEvents = roomEvents;
  }

  @action
  signIn = async () => {
    const GoogleUser = await googleInit();
    const profile = GoogleUser.getBasicProfile();
    const user = {
      name: profile.getName(),
      email: profile.getEmail(),
      firstName: profile.getGivenName(),
      lastName: profile.getFamilyName(),
      isSignedIn: GoogleUser.isSignedIn(),
    };

    this.user = user;

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
    const slackUsers = await getSlackUsers();
    const emails = slackUsers
      .map(({ profile }) => profile.email)
      .filter((email) => email && email.includes('dialexa.com'));

    this.emails = emails;
  }
}

export default new Store();
