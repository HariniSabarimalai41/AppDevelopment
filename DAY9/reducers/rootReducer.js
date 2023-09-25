import { combineReducers } from 'redux';
import movieReducer from './MovieReducer';

const rootReducer = combineReducers({
  favorites: movieReducer,
});

export default rootReducer;