import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import axios from 'axios';
import thunk from 'redux-thunk';

import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';

import * as serviceWorker from './serviceWorker';
import HttpRequestInterceptor from 'services/HttpRequestInterceptor';
import HttpResponseInterceptor from 'services/HttpResponseInterceptor';
import rootReducer from 'reducers';

const middlewares = [
    thunk
];

const store = createStore(rootReducer, {}, applyMiddleware(...middlewares));

// Set axios interceptor
axios.interceptors.request.use(
    HttpRequestInterceptor.success, 
    HttpRequestInterceptor.fail,
);

axios.interceptors.response.use(
    HttpResponseInterceptor.success,
    HttpResponseInterceptor.fail,
);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>
    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
