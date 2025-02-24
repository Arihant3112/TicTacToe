import React, { useEffect } from "react";
import "./TicTacToe.css";
import Board from "./Board.js";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

function TicTacToe({ bot }) {
  let [boardSize, setBoardSize] = React.useState(
    Math.ceil((0.8 * window.innerWidth) / 2)
  );
  const [show, setShow] = React.useState(false);

  const handleClose = () => setShow(false);

  const handleShow = () => setShow(true);

  const [msg, setMsg] = React.useState("");

  const [value, setValue] = React.useState(0);

  useEffect(() => {
    const resize = () => {
      setBoardSize((0.8 * window.innerWidth) / 2);
    };
    window.addEventListener("resize", resize);
    return () => {
      window.removeEventListener("resize", resize);
    };
  });

  const handleCallBack = (data) => {
    setMsg(data);
    handleShow();
  };
  function forceUpdate() {
    handleClose();
    setValue((value) => value + 1);
  }
  return (
    <div
      className="game"
      style={{
        width: boardSize,
        height: boardSize,
        marginLeft: Math.ceil(-boardSize / 2),
        marginTop: Math.ceil(-boardSize / 2),
      }}
    >
      <Board callback={handleCallBack} bot={bot} value={value}></Board>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Congratulations!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h1 style={{ textAlign: "center" }}>{msg}</h1>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => forceUpdate()}>
            Play Again
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
export default TicTacToe;
