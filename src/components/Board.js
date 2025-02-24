import React, { useEffect } from "react";
import "./Board.css";
const classesDefaultValue = ["", "", "", "", "", "", "", "", ""];
const lines = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
function isMovesLeft(board) {
  for (var i = 0; i < 9; i++) if (board[i].length === 0) return true;
  return false;
}

const evaluate = (board) => {
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      if (board[a] === "circle") {
        return -10;
      } else if (board[a] === "x") {
        return 10;
      }
    }
  }
  return 0;
};

const minimax = (board, depth, isMax) => {
  var score = evaluate(board);
  if (score === 10) return score;
  if (score === -10) return score;

  if (isMovesLeft(board) === false) return 0;

  if (isMax) {
    let best = -1000;
    for (let i = 0; i < 9; i++) {
      if (board[i].length === 0) {
        board[i] = "x";
        best = Math.max(best, minimax([...board], depth + 1, !isMax));
        board[i] = "";
      }
    }
    return best;
  } else {
    let best = 1000;
    for (var i = 0; i < 9; i++) {
      if (board[i].length === 0) {
        board[i] = "circle";
        best = Math.min(best, minimax([...board], depth + 1, !isMax));
        board[i] = "";
      }
    }
    return best;
  }
};

const findBestMove = (classes) => {
  var bestVal = -1000;
  let row = -1;
  let moveVal;
  let brd = [...classes];
  for (let i = 0; i < 9; i++) {
    if (brd[i].length === 0) {
      brd[i] = "x";
      moveVal = minimax([...brd], 0, false);
      brd[i] = "";
      if (moveVal > bestVal) {
        row = i;
        bestVal = moveVal;
      }
    }
  }
  return row;
};

function checkWinner(classes) {
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (classes[a] && classes[a] === classes[b] && classes[a] === classes[c]) {
      return classes[a];
    }
  }
  if (!isMovesLeft(classes)) {
    return "tie";
  }
  return null;
}

function Board({ bot, value, ...props }) {
  const [classes, setClasses] = React.useState(classesDefaultValue);
  let [turn, setTurn] = React.useState(true);
  let [gameOver, setGameOver] = React.useState(false);

  useEffect(() => {
    if (bot) {
      setClasses((prev) => {
        prev = [...classesDefaultValue];
        prev[findBestMove(prev)] = "x";
        return [...prev];
      });
    } else {
      setClasses([...classesDefaultValue]);
    }
    setGameOver(false);
  }, [bot, value]);

  function mark(id) {
    if (!gameOver) {
      function marking(prev) {
        prev[id] = turn ? "circle" : "x";
        if (bot) {
          // prev[findBestMove()] = "x";
        } else {
          setTurn(!turn);
        }
        return [...prev];
      }
      setClasses((prev) => {
        prev = marking(prev);
        if (bot) {
          prev[findBestMove(prev)] = "x";
        }
        let winner = checkWinner(prev);
        displayWinner(winner);
        return [...prev];
      });
    }
  }

  function displayWinner(winner) {
    if (winner === "circle") {
      props.callback("O wins");
      setGameOver(true);
    } else if (winner === "x") {
      props.callback("X wins");
      setGameOver(true);
    } else if (winner === "tie") {
      props.callback("TIE");
      setGameOver(true);
    }
  }

  return (
    <div className="board">
      <div className="square top left" onClick={() => mark(0)}>
        <div className={classes[0]}></div>
      </div>
      <div className="square top" onClick={() => mark(1)}>
        <div className={classes[1]}></div>
      </div>
      <div className="square top right" onClick={() => mark(2)}>
        <div className={classes[2]}></div>
      </div>
      <div className="square left" onClick={() => mark(3)}>
        <div className={classes[3]}></div>
      </div>
      <div className="square" onClick={() => mark(4)}>
        <div className={classes[4]}></div>
      </div>
      <div className="square right" onClick={() => mark(5)}>
        <div className={classes[5]}></div>
      </div>
      <div className="square bottom left" onClick={() => mark(6)}>
        <div className={classes[6]}></div>
      </div>
      <div className="square bottom" onClick={() => mark(7)}>
        <div className={classes[7]}></div>
      </div>
      <div className="square bottom right" onClick={() => mark(8)}>
        <div className={classes[8]}></div>
      </div>
    </div>
  );
}
export default Board;
