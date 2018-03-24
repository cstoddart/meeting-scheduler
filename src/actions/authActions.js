import { SET_ACCESS_TOKEN } from './actionTypes';
import { googleAuth } from '../services/googleAuth';

export const authorizeUser = () => {
  const result = googleAuth();
  console.log("RESULT", result);
  const accessToken = "";
  return { type: SET_ACCESS_TOKEN, accessToken };
}
