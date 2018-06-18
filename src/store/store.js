import { observable, action } from 'mobx';

import { googleInit } from '../services/google/init';
import { getCalendarEvents } from '../services/google/calendar';
import { googleSignOut } from '../services/google/auth';

class Store {
  @observable roomEvents = [];
  @observable user = false;

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
      firstName: profile.getGivenName(),
      lastName: profile.getFamilyName(),
      isSignedIn: GoogleUser.isSignedIn(),
    };

    this.user = user;
  }

  @action
  signOut = () => {
    googleSignOut();
    this.user = false;
  }
}

export default new Store();
