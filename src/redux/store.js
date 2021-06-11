import { createStore, applyMiddleware, compose } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import reposReducer from './reducer';
import thunk from "redux-thunk";

const enhancers = [ applyMiddleware(thunk)];
export const store = createStore(
  reposReducer,
  composeWithDevTools(
  compose(...enhancers)
  )
);

