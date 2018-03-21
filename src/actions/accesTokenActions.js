import { SET_ACCESS_TOKEN } from './actionTypes';

export const setAccessToken = (accessToken) => {
  return { type: SET_ACCESS_TOKEN, accessToken };
}
