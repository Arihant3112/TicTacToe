import React from "react";
import logo from "./logo.svg";
import "./App.css";
import TicTacToe from "./components/TicTacToe.js";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";

function App() {
  let navigate = useNavigate();
  function nav(path) {
    navigate(path);
  }
  return (
    <div>
      <Button variant="dark" className="ml-2 mt2" onClick={() => nav(`/AI`)}>
        With Bot
      </Button>
      <Button variant="dark" className="ml-1 mt2" onClick={() => nav(`/users`)}>
        Two Players
      </Button>
      <Routes>
        <Route path="/AI" element={<TicTacToe bot={true} />} />
        <Route path="/users" element={<TicTacToe bot={false} />} />
      </Routes>
    </div>
  );
}

export default App;
