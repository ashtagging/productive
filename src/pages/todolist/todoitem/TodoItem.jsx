import React from 'react'
import "./todoitem.scss"

function TodoItem({ text, id, todo, completed,todos,setTodos }) {
    const deleteTodo = () => {
      const newArray = todos.filter((el) => el.id !== todo.id);
      setTodos(newArray);
    };

    const completeTodo = () => {
      setTodos(
        todos.map((item) =>
          item.id === todo.id ? { ...item, completed: !item.completed } : item
        )
      );
    };

    return  (
      <div className="todo">
        <button onClick={completeTodo} className="complete-button">
          <i className="fa-solid fa-check"></i>
        </button>
        <li className={`todo-item ${todo.completed ? "completed" : ""}`}>
          {text}
        </li>
        <button onClick={deleteTodo} className="trash-button">
          <i className="fa-solid fa-trash"></i>
        </button>
      </div>
    ) 
  }

  export default TodoItem