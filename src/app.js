/* eslint no-undef : 0, no-underscore-dangle: 0*/

import createBrowserHistory from 'history/createBrowserHistory'
import { Provider } from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from './store/configureStore';
import { BrowserRouter as Router } from "react-router-dom";
import createRoutes from './routes/index';

let state = {};

if (window.__REDUX_STATE__) {
    try {
        state = JSON.parse(unescape(__REDUX_STATE__));
    } // eslint-disable-line brace-style
    catch (e) {
        console.log('error'); // eslint-disable-line no-console
    }
}

const store = configureStore(state);
ReactDOM.hydrate(( // eslint-disable-next-line react/jsx-filename-extension
    <Provider store={store}>
        <Router>
        {createRoutes(createBrowserHistory())}
        </Router>
    </Provider>), document.getElementById('main'));

