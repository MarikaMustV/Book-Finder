import { combineReducers } from '@reduxjs/toolkit';
import { reducer as booksReducer } from './booksSlice';

export default combineReducers({
  books: booksReducer,
});
