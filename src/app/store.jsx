// store.js
import { configureStore } from '@reduxjs/toolkit';
import counterSlice from './createSlice.jsx'; 

// console.log(counterSlice);
export const store = configureStore({
  reducer: { counter: counterSlice }  
});

