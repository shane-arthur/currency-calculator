import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';
import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from './store/configureStore';
import createRoutes from './routes/index';

let state = {};

if (window.__REDUX_STATE__) {
    try {
        state = JSON.parse(unescape(__REDUX_STATE__));
    } catch (e) {
        console.log('error');
    }
}

const store = configureStore(state);
ReactDOM.hydrate((
  <Provider store={store}>
    <Router>
      {createRoutes(createBrowserHistory())}
    </Router>
  </Provider>), document.getElementById('main'));
