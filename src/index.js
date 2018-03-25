import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';
import App from './components/app/App';
import registerServiceWorker from './registerServiceWorker';

import { AuthStore } from './store/authStore';
import { EventsStore } from './store/eventsStore';

const authStore = new AuthStore();
const eventsStore = new EventsStore();

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

registerServiceWorker();
