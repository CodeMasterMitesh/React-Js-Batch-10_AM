import { createSlice } from '@reduxjs/toolkit';


const todoSlice = createSlice({
  name: 'todo',
  initialState: { todos: [] },
  reducers: {
    addTodo: (state, action) => {
        state.todos.push(action.payload);
    },
    removeTodo: (state, action) => {
        state.todos = state.todos.filter((_, index) => index !== action.payload);
    },
    fetchTodo: (state, action) => {
        state.todos = [...state.todos, ...action.payload];
    }
  }
});
console.log("todoSlice", todoSlice);
// console.log("todoSlice Reducer", todoSlice.reducer);
export const { addTodo, removeTodo, fetchTodo } = todoSlice.actions;
export default todoSlice.reducer;