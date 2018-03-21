import initialState from './initialState';
import { SET_EVENTS} from '../actions/actionTypes';

export default function events(state = initialState.events, action) {
  switch (action.type) {
    case SET_EVENTS:
      return action.events;
    default:
      return state;
  }
};
