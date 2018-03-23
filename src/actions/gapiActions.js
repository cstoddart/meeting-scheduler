import { GAPI_LOAD, GAPI_AUTHORIZE, GAPI_REQUEST_EVENTS } from './actionTypes';

export const gapiLoad = (events) => {
  return { type: SET_EVENTS, events };
};
