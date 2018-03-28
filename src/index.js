import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';
import App from './components/app/App';

import authStore from './store/authStore';
import eventsStore from './store/eventsStore';

require('dotenv').config();

ReactDOM.render(
  <Provider
    authStore={authStore}
    eventsStore={eventsStore}
  >
    <div>
      <App />
    </div>
  </Provider>, document.getElementById('root')
);
