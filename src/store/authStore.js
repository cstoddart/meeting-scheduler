import { observable, action } from 'mobx';
import { googleAuth } from '../services/googleAuth';

class AuthStore {
  @observable accessToken = localStorage.getItem('accessToken') || '';

  @action.bound
  async setAccessToken() {
    console.log('@setAccessToken...');
    const accessToken = await googleAuth();

    this.accessToken = accessToken;
    localStorage.setItem('accessToken', accessToken);
  }
}

export default new AuthStore();
