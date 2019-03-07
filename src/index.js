import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';

import './index.module.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import burgerConstructReducer from './Store/Reducer/burgerConstruct';
import orderReducer from './Store/Reducer/order';
import authReducer from './Store/Reducer/auth'

const composeEnhancers = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose;

const rootReducer = combineReducers({
    burgerBuilder : burgerConstructReducer,
    order : orderReducer,
    auth : authReducer
})

const store = createStore(rootReducer,composeEnhancers(applyMiddleware(thunk)));

const app = (
    <Provider store = {store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
)

ReactDOM.render(app , document.getElementById('root'));
registerServiceWorker();
