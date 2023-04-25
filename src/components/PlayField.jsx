import { useEffect, useState } from "react";
import { Square } from "./Square";
import { ConfettiBurst } from "./Confetti";

const PlayField = () => {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [showConfetti, setShowConfetti] = useState(false);

  const calculateWinner = (squares) => {
    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < winningCombinations.length; i++) {
      const [a, b, c] = winningCombinations[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }
    return null;
  };

  const winner = calculateWinner(squares);

  useEffect(() => {
    if (winner) {
      setShowConfetti(true);
    }
  }, [winner]);

  // zero starts always first then x and o

  const handleClick = (index) => {
    console.log("clicked a square");
    const squaresCopy = [...squares];
    if (winner || squaresCopy[index]) return;
    squaresCopy[index] = xIsNext ? "X" : "O";
    setSquares(squaresCopy);
    setXIsNext(!xIsNext);
  };

  const restartGame = () => {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
    setShowConfetti(false);
  };

  return (
    <>
      <div className="playfield">
        {squares.map((square, index) => {
          return (
            <Square
              squares={squares}
              key={index}
              id={index}
              value={square}
              onClick={() => handleClick(index)}
              restartGame={restartGame}
            />
          );
        })}
        <p>
          {winner
            ? "Winner " + winner
            : "Next player: " + (xIsNext ? "X" : "O")}
        </p>
      </div>
      {showConfetti && <ConfettiBurst />}
      <button className="reset-btn" onClick={restartGame}>
        Restart Game
      </button>
    </>
  );
};

export { PlayField };
