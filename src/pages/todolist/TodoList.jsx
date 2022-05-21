import React, { useState, useEffect } from "react";
import uniqid from "uniqid";
import MenuButton from "../../components/menuButton/MenuButton";
import TodoItem from "./todoitem/TodoItem";
import "./todolist.scss";

function TodoList() {
  const [todoItem, setToDoItem] = useState("");
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    getTodos();
  }, []);

  useEffect(() => {
    saveTodos();
  }, [todos]);

  const handleChange = (event) => {
    setToDoItem(event.target.value);
  };

  const handleSubmit = (event) => {
    //Below stops the page from refreshing when the form is submitted
    event.preventDefault();
    setTodos([...todos, { id: uniqid(), text: todoItem, completed: false }]);
    setToDoItem("");
  };

  //Save to Local Storage
  const saveTodos = () => {
    localStorage.setItem("todos", JSON.stringify(todos));
  };

  const getTodos = () => {
    if (localStorage.getItem("todos") === null) {
      localStorage.setItem("todos", JSON.stringify([]));
    } else {
      let todoLocal = JSON.parse(localStorage.getItem("todos"));
      setTodos(todoLocal);
    }
  };

  return (
    <div className="todo-list">
    <MenuButton/>
      <div className="todo-wrapper">
        <div className="todo-container">
          <h1>To Do List</h1>
          <form>
            <div className="input">
              <input
                type="text"
                placeholder="Please enter a to do item..."
                value={todoItem}
                onChange={handleChange}
                className="todo-input"
              />
              <button className="todo-add" onClick={handleSubmit}>
                <i class="fa-solid fa-plus"></i>
              </button>
            </div>
          </form>
          <div className="list-container">
            <ul className="list-item">
              {todos.map((todo) => (
                <TodoItem
                  text={todo.text}
                  todo={todo}
                  key={todo.id}
                  id={todo.id}
                  completed={todo.completed}
                  todos={todos}
                  setTodos={setTodos}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TodoList;
