// store.js
// import { configureStore } from '@reduxjs/toolkit';
// import counterSlice from './createSlice.jsx'; 
import { createStore } from 'redux';
// import reducer from './createSlice';
// const { default: reducer } = require("./createSlice");

// // console.log(counterSlice);
// export const store = configureStore({
//   reducer: { counter: counterSlice }  
// });

const initialState = {
  todos: []
};

const ADD_TODO = 'todo/ADD_TODO';
const REMOVE_TODO = 'todo/REMOVE_TODO';

const todoAppReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TODO:
      return {
        ...state,
        todos: [...state.todos, action.payload]
      };
      case REMOVE_TODO:
      return {
        todos: state.todos.filter((e,index) => 
          // console.log("inside remove",e, index, action.payload);
          index !== action.payload
        )
      }
    default:
      return state;
  }
};
export const store = createStore(todoAppReducer);

store.dispatch({ type: ADD_TODO, payload: 'Learn Redux' });
store.dispatch({ type: ADD_TODO, payload: 'Learn React js' });

console.log(store.getState());

console.log('Redux Store is working');
store.dispatch({ type: REMOVE_TODO, payload: 1 });
store.dispatch({ type: REMOVE_TODO, payload: 0 });


console.log(store.getState());