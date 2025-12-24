// store.js
import { configureStore } from '@reduxjs/toolkit';
import todoSlice, { fetchTodo as fetchTodoAction } from './todoSlice.jsx';
// import { composeWithDevTools } from '@redux-devtools/extension';
// import { applyMiddleware, createStore } from 'redux';
// import { thunk } from 'redux-thunk';


// const initialState = {
//   todos: []
// };

// const ADD_TODO = 'todo/ADD_TODO';
// const REMOVE_TODO = 'todo/REMOVE_TODO';
// const FETCH_TODO = 'todo/FETCH_TODO';

// const todoAppReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case ADD_TODO:
//       return {
//         ...state,
//         todos: [...state.todos, action.payload]
//       };
//       case REMOVE_TODO:
//       return {
//         todos: state.todos.filter((e,index) => 
//           // console.log("inside remove",e, index, action.payload);
//           index !== action.payload
//         )
//       };
//       case FETCH_TODO:
//       return {
//         ...state,
//         todos: [...state.todos, ...action.payload]
//       };
//     default:
//       return state;
//   }
// };
// export const store = createStore(todoAppReducer,composeWithDevTools(applyMiddleware(thunk)));

// export const actionAddTodo = (data) => ({
//   type: ADD_TODO,
//   payload: data,
// });

// export const actionRemoveTodo = (index) => ({
//   type: REMOVE_TODO,
//   payload: index,
// });

export const store = configureStore({
  reducer: {
    todo: todoSlice
  }
});

export const fetchTodo = () => async (dispatch) => {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=5');
    const data = await response.json();
    dispatch(fetchTodoAction(data.map(item => item.title)));
  } catch (error) {
    console.error("Error fetching todo:", error);
  }
};

// Test initial todos (optional - remove in production)
// store.dispatch(addTodo('Learn Redux'));
// store.dispatch(addTodo('Learn React Js'));  
// store.dispatch(addTodo('Today We Understand Redux Store Actions'));


// console.log('Redux Store is working');
// console.log('Initial state:', store.getState());