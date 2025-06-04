import { useState } from 'react';
import Square from './square';

export default function Board() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [turn, setTurn] = useState('X');
  const [winner, setWinner] = useState(null);

  const checkWinner = (newBoard) => {
    const lines = [
      [0,1,2], [3,4,5], [6,7,8], // filas
      [0,3,6], [1,4,7], [2,5,8], // columnas
      [0,4,8], [2,4,6]           // diagonales
    ];

    for (let [a, b, c] of lines) {
      if (newBoard[a] && newBoard[a] === newBoard[b] && newBoard[a] === newBoard[c]) {
        return newBoard[a];
      }
    }

    return newBoard.every(cell => cell) ? 'Empate' : null;
  };

  const handleClick = (index) => {
    if (board[index] || winner) return;

    const newBoard = board.slice();
    newBoard[index] = turn;

    const gameResult = checkWinner(newBoard);

    setBoard(newBoard);
    setTurn(turn === 'X' ? 'O' : 'X');
    setWinner(gameResult);
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setTurn('X');
    setWinner(null);
  };

  return (
    <div>
      <h2>Turno: {winner ? '—' : turn}</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', width: '270px' }}>
        {board.map((value, index) => (
          <Square key={index} value={value} onClick={() => handleClick(index)} />
        ))}
      </div>
      {winner && <h3>{winner === 'Empate' ? '¡Empate!' : `Ganó ${winner}`}</h3>}
      <button onClick={resetGame} style={{ marginTop: '15px' }}>
        Reiniciar juego
      </button>
    </div>
  );
}
