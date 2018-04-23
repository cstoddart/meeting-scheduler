import { observable, action } from 'mobx';
import { getCalendarEvents } from '../services/googleCalendar';
import { googleInit } from '../services/googleInit';
import { googleSignOut } from '../services/googleAuth';

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

    console.log('USER', user);

    this.user = user;
  }

  @action
  signOut = async () => {
    googleSignOut();
    this.user = false;
  }
}

export default new Store();
