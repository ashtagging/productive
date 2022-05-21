import React from "react";
import { useNavigate } from "react-router-dom";
import "./menu.scss";

function Menu() {
  let navigate = useNavigate();

  return (
    <div className="menu-container">
      <div className="app-button menu">
        <button
          className="calculator-button"
          onClick={() => {
            navigate("/calculator");
          }}
        >
          <i className="fa-solid fa-calculator"></i>Calculator
        </button>
        <button
          onClick={() => {
            navigate("/timer");
          }}
        >
          <i className="fa-regular fa-hourglass"></i>Timer
        </button>
        <button
          onClick={() => {
            navigate("/todolist");
          }}
          className="todolist-button"
        >
          <i className="fa-solid fa-list-check"></i>
          To Do List
        </button>
      </div>
    </div>
  );
}

export default Menu;
