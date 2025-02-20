import React from "react";
import "./App.css";
import TicTacToe from "./components/TicTacToe.js";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import { Routes, Route, useNavigate } from "react-router-dom";

function App() {
  let navigate = useNavigate();
  function nav(path) {
    navigate(path);
  }
  return (
    <div>
      <Button variant="dark" className="ml-2 mt2" onClick={() => nav(`/P1`)}>
        With Bot
      </Button>
      <Button variant="dark" className="ml-1 mt2" onClick={() => nav(`/P2`)}>
        Two Players
      </Button>
      <Routes>
        <Route path="/P1" element={<TicTacToe bot={true} />} />
        <Route path="/P2" element={<TicTacToe bot={false} />} />
      </Routes>
    </div>
  );
}

export default App;
