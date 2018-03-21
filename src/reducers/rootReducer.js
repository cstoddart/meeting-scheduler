import { combineReducers } from 'redux';
import accessToken from './accessTokenReducer';
import events from './eventReducer';

const rootReducer = combineReducers({
  accessToken,
  events
});

export default rootReducer;
