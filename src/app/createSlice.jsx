import { createSlice } from '@reduxjs/toolkit';

const counterSlice = createSlice({
  name: 'counter',
  initialState: { value: 0 },
  reducers: {
    increment: (state) => { state.value += 1; },
    decrement: (state) => { state.value -= 1; }
}
});
console.log(counterSlice);   
// console.log(counterSlice.actions);
// Action creators are generated for each case reducer function
export const { increment, decrement } = counterSlice.actions;

// Selectors for cleaner access in components
export const selectCounter = (state) => state.counter.value;

// The reducer function is exported to be added to the store
export default counterSlice.reducer;