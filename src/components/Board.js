import { useState } from "react";
import "./Board.css";

const Square = ({ value, onSquareClick }) => {
    // const [value, setValue] = useState(null);

    // const handleClick = () => {
    //     console.log("Clicked");
    // };

    return (
        <button className="square" onClick={onSquareClick}>
            {value}
        </button>
    );
};

const Board = ({ xIsNext, squares, onPlay }) => {
    // const [xIsNext, setXIsNext] = useState(true);
    // const [winner, setWinner] = useState(null);
    // const [squares, setSquares] = useState(Array(9).fill(null));
    const handleClick = (i) => {
        if (squares[i] || calculateWinner(squares)) {
            return;
        }
        const newSquares = squares.slice();
        newSquares[i] = xIsNext ? "X" : "O";
        // setWinner(calculateWinner(newSquares));
        onPlay(newSquares);
        // setSquares(newSquares);
    };

    const winner = calculateWinner(squares);

    return (
        <div className="board">
            <div className="status">
                {winner
                    ? "Winner: " + winner
                    : "Next player: " + (xIsNext ? "X" : "O")}
            </div>
            <div className="board-row">
                <Square
                    value={squares[0]}
                    onSquareClick={() => handleClick(0)}
                />
                <Square
                    value={squares[1]}
                    onSquareClick={() => handleClick(1)}
                />
                <Square
                    value={squares[2]}
                    onSquareClick={() => handleClick(2)}
                />
            </div>
            <div className="board-row">
                <Square
                    value={squares[3]}
                    onSquareClick={() => handleClick(3)}
                />
                <Square
                    value={squares[4]}
                    onSquareClick={() => handleClick(4)}
                />
                <Square
                    value={squares[5]}
                    onSquareClick={() => handleClick(5)}
                />
            </div>
            <div className="board-row">
                <Square
                    value={squares[6]}
                    onSquareClick={() => handleClick(6)}
                />
                <Square
                    value={squares[7]}
                    onSquareClick={() => handleClick(7)}
                />
                <Square
                    value={squares[8]}
                    onSquareClick={() => handleClick(8)}
                />
            </div>
        </div>
    );
};

const Game = () => {
    // const [xIsNext, setXIsNext] = useState(true);
    const [history, setHistory] = useState([Array(9).fill(null)]);
    const [currentMove, setCurrentMove] = useState(0);
    const xIsNext = currentMove % 2 === 0;
    const currentSquares = history[currentMove];

    function handlePlay(nextSquares) {
        const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
        setHistory(nextHistory);
        setCurrentMove(nextHistory.length - 1);
        // setHistory([...history, nextSquares]);
        // setXIsNext(!xIsNext);
    }

    function jumpTo(nextMove) {
        setCurrentMove(nextMove);
        // setXIsNext(nextMove % 2 === 0);
    }

    const moves = history.map((squares, move) => {
        let description = "Go to game start";
        if (move > 0) {
            description = `Got to move # ${move}`;
        }
        return (
            <li key={move}>
                <button onClick={() => jumpTo(move)}>{description}</button>
            </li>
        );
    });

    return (
        <div className="game">
            <div className="game-board">
                <Board
                    xIsNext={xIsNext}
                    squares={currentSquares}
                    onPlay={handlePlay}
                />
            </div>
            <div className="game-info">
                <ol>{moves}</ol>
            </div>
        </div>
    );
};

const calculateWinner = (squares) => {
    const winning = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    for (let i = 0; i < winning.length; ++i) {
        const [one, two, three] = winning[i];
        if (
            squares[one] &&
            squares[one] === squares[two] &&
            squares[two] === squares[three]
        )
            return squares[one];
    }
    return null;
};

export default Game;
