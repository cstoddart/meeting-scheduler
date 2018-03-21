import initialState from './initialState';
import { SET_ACCESS_TOKEN} from '../actions/actionTypes';

export default function accessToken(state = initialState.accessToken, action) {
  switch (action.type) {
    case SET_ACCESS_TOKEN:
      console.log('Setting access token...', action.accessToken);
      return action.accessToken;
    default:
      return state;
  }
};
