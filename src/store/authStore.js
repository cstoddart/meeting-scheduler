import { observable, action } from 'mobx';
import { googleAuth } from '../services/googleAuth';

export class AuthStore {
  @observable accessToken = localStorage.getItem('accessToken') || "";

  @action.bound
  setAccessToken = () => {
    googleAuth((accessToken) => {
      console.log("SETTING ACCESS TOKEN...", accessToken);
      this.accessToken = accessToken;
      localStorage.setItem('accessToken', accessToken);
    });
  }
}
