import { createSlice } from '@reduxjs/toolkit';

const { reducer, actions } = createSlice({
  name: 'books',
  initialState: {
    favorites: [],
  },
  reducers: {
    favoriteBook(state, action) {
      state.favorites.push(action.payload);
    },
    removeFavoriteBook(state, action) {
      state.favorites = state.favorites.filter(
        (book) => book.id !== action.payload.id
      );
    },
  },
});

export { reducer, actions };
