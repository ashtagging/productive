import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Calculator from "./pages/calculator/Calculator";
import Menu from "./pages/menu/Menu";
import Timer from "./pages/timer/Timer";
import TodoList from "./pages/todolist/TodoList";
import ErrorPage from "./pages/ErrorPage";
import "./app.scss"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Menu />} />
        <Route path="/calculator" element={<Calculator />} />
        <Route path="/timer" element={<Timer />} />
        <Route path="/todolist" element={<TodoList />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Router>
  );
}

export default App;
