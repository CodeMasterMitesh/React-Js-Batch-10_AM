import { useState } from "react";
import "./Todo.css";
import { useSelector, useDispatch } from "react-redux";
import { addTodo as addTodoAction, removeTodo as removeTodoAction } from "../app/todoSlice.jsx";
import { fetchTodo } from "../app/store.jsx";

export const Todo = () => {

const [todo, setTodo] = useState("");
const todos = useSelector((state) => state.todo.todos);
console.log("Todos from Redux Store:", todos);

const dispatch = useDispatch();

const addTodo = (e) => {
    e.preventDefault();
    if (todo.trim()) {
        dispatch(addTodoAction(todo));
        setTodo("");
    }
}


const deleteTodo = (index) => {
    dispatch(removeTodoAction(index));
}
    return (
        <div className="todo-container">
            <h2>📝 My Todo List</h2>

            <div className="todo-input-box">
                    <form onSubmit={addTodo}>
                        <input
                        type="text"
                        placeholder="Enter your task..."
                        value={todo}
                        onChange={(e) => setTodo(e.target.value)}
                    />
                    <button>Add</button>
                    <button onClick={() => dispatch(fetchTodo())}>Get Task</button>
                </form>
            </div>

            <ul className="todo-list">
                {todos && todos.map((item,index) => (
                    <li key={index}>
                        <span>{item}</span>
                        <button onClick={() => deleteTodo(index)}>❌</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};
