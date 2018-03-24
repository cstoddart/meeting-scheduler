import { combineReducers } from 'redux';
import auth from './authReducer';
import events from './eventReducer';

const rootReducer = combineReducers({
  auth,
  events
});

export default rootReducer;
