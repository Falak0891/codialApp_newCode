import {createStore , applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';


import combineReducers from '../Reducers/index';


let store;

export function configureStore(){
    store = createStore(combineReducers , applyMiddleware(thunk, logger));
    return store;
}