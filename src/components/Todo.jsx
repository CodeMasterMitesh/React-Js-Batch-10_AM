import { useState } from "react";
import "./Todo.css";
import { useSelector } from "react-redux";
import { actionAddTodo, actionRemoveTodo } from "../app/store.jsx";
import { useDispatch } from "react-redux";

export const Todo = () => {

const [todo, setTodo] = useState("");
const todos = useSelector((state) => state.todos);
// console.log("Todos from Redux Store:", todos);

const dispatch = useDispatch();

const addTodo = (e) => {
    e.preventDefault();
    // console.log("Adding Todo:", todo);
    dispatch(actionAddTodo(todo));
}

const deleteTodo = (index) => {
    // console.log("Deleting Todo at index:", index);
    dispatch(actionRemoveTodo(index));
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
                </form>
            </div>

            <ul className="todo-list">
                {todos.map((item,index) => (
                    console.log("item in list", item),
                    <li key={index} className={item.completed ? "completed" : ""}>
                        <input
                            type="checkbox"
                            checked={item.completed}
                            onChange={() => toggleTodo(item.id)}
                        />
                        <span>{item}</span>
                        <button onClick={() => deleteTodo(index)}>❌</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};
