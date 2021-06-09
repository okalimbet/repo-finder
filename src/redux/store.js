import { createStore, applyMiddleware, compose } from 'redux';
import reposReducer from './reducer';
import thunk from "redux-thunk";

const enableReduxDevTools = window.__REDUX_DEVTOOLS_EXTENSION__?.();
const enhancers = [enableReduxDevTools, applyMiddleware(thunk)];
export const store = createStore(
  reposReducer,
  compose(...enhancers)
);

