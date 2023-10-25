/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import { useState } from "react"
import confetti from "canvas-confetti";

import { Square } from "./components/Square";
import { TURNS } from "./constants";
import { checkEndGame, checkWinnerFrom } from "./logic/board";
import { WinnerModal } from "./components/WinnerModal";


function App() {
  
  const [board, setBoard] = useState(Array(9).fill(null))

  const [turn, setTurn] = useState(TURNS.X)
  
  // null es que no hay ganador, false es que hay un empate
  const [winner, setWinner] = useState(null);


  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X);
    setWinner(null)
  }

  const updateBoard = (index) => {
    //No actualizar la posición si ya tiene valor
    if (board[index] || winner) return;

    //Actualizar el tablero
    const newBoard = [...board];
    newBoard[index] = turn;
    setBoard(newBoard);

    //Cambiar turno
    const newTurn = turn == TURNS.X ? TURNS.O : TURNS.X;
    setTurn(newTurn);

    // Revisar si hay un ganador
    const newWinner = checkWinnerFrom(newBoard);
    if (newWinner) {
      confetti()
      setWinner(newWinner)
    }
    else if (checkEndGame(newBoard)) {
      setWinner(false) //empate
    }
    // Check if game is over
  }

  return (
    <main className="board">
      <h1>Tic tac toe</h1>
      <button onClick={resetGame}>Reset del juego</button>
      <section className="game">
        {
          board.map((square, index) => {
            return (
              <Square
                key={index}
                index={index}
                updateBoard={updateBoard}
              >
                {square}
              </Square>
            )
          })
        }
      </section>
      <section className="turn">
        <Square isSelected={turn == TURNS.X}>
          {TURNS.X}
        </Square>
        <Square isSelected={turn == TURNS.O}>
          {TURNS.O}
        </Square>
      </section>

      <WinnerModal resetGame={ resetGame } winner = {winner} />

    </main>
  )
}

export default App
