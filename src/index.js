import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { configureStore } from './store/configureStore';
import App from './components/app/App';
import registerServiceWorker from './registerServiceWorker';
import axios from 'axios';

require('dotenv').config();

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <div>
      <App />
      <div id="firebaseui-auth-container"></div>
    </div>
  </Provider>, document.getElementById('root')
);

registerServiceWorker();
