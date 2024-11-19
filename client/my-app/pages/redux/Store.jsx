// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';

// Redux Store yaratish
export const store = configureStore({
  reducer: {
    cart: cartReducer,  // cartReducer ni qo'shish
  },
});
