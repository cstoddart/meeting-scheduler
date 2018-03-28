import { observable, action } from 'mobx';
import { googleAuth } from '../services/googleAuth';

export class AuthStore {
  @observable accessToken = localStorage.getItem('accessToken') || '';

  @action.bound
  setAccessToken() {
    googleAuth((accessToken) => {
      this.accessToken = accessToken;
      localStorage.setItem('accessToken', accessToken);
    });
  }
}
