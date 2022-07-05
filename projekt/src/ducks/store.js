import { createStore, applyMiddleware, combineReducers } from 'redux';
import { createMiddleware } from 'redux-api-middleware';
import movieReducer from './Movies/reducer';
import personReducer from './Persons/reducer'
import logger from 'redux-logger';

const reducer = combineReducers({movies: movieReducer, persons: personReducer});
 
const store = createStore(reducer, applyMiddleware(createMiddleware(), logger))

export default store