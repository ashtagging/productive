import React from "react";
import { useNavigate } from "react-router-dom";
import "./menuButton.scss"

function MenuButton() {
let navigate = useNavigate();
  return (
    <div className="menu-button-container">
      <button
        className="menu-button"
        onClick={() => {
          navigate("/");
        }}
      ><i class="fa-solid fa-bars"></i>Menu</button>
    </div>
  );
}

export default MenuButton;
