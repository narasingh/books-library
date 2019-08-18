import { combineReducers } from 'redux';
import { RootState } from './state';
import { bookReducer } from './books';
import { routerReducer, RouterState } from 'react-router-redux';

export { RootState, RouterState };

// NOTE: current type definition of Reducer in 'react-router-redux' and 'redux-actions' module
// doesn't go well with redux@4
export const rootReducer = combineReducers<RootState>({
  books: bookReducer as any,
  router: routerReducer as any
});
