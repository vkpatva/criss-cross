import React, { useState } from 'react';

type Cell = string;
type Grid = Cell[][];
interface LastFilled {
  row: number;
  col: number;
}

const DiceGridGame: React.FC = () => {
  const [grid, setGrid] = useState<Grid>(Array.from({ length: 5 }, () => Array(5).fill('')));
  const [dice1, setDice1] = useState<number>(0);
  const [dice2, setDice2] = useState<number>(0);
  const [lastFilled, setLastFilled] = useState<LastFilled | null>(null);
  const [initialFilled, setInitialFilled] = useState<boolean>(false);
  const [diceSelected, setDiceSelected] = useState<number | null>(null);

  const rollDice = (): void => {
    const newDice1 = Math.floor(Math.random() * 6) + 1;
    const newDice2 = Math.floor(Math.random() * 6) + 1;
    setDice1(newDice1);
    setDice2(newDice2);
    setDiceSelected(null); // Reset dice selection after roll
  };

  const fillCell = (row: number, col: number): void => {
    if (!initialFilled && row === 0 && col === 0) { // Only fill the first cell if it's not already filled
      setGrid(prevGrid => {
        const newGrid = [...prevGrid];
        newGrid[row][col] = dice1.toString();
        return newGrid;
      });
      setInitialFilled(true);
      return;
    }

    if (diceSelected && isAdjacent(row, col) && grid[row][col] === '') {
      setGrid(prevGrid => {
        const newGrid = [...prevGrid];
        newGrid[row][col] = diceSelected.toString();
        return newGrid;
      });
      setLastFilled({ row, col });
      setDiceSelected(null); // Reset after placing a number
    }
  };

  const isAdjacent = (row: number, col: number): boolean => {
    if (!lastFilled) return row === 0 && col === 0; // For the first move after initial placement
    const { row: lastRow, col: lastCol } = lastFilled;
    return Math.abs(lastRow - row) + Math.abs(lastCol - col) === 1;
  };

  return (
    <div>
      <h1>Dice Grid Game</h1>
      <table style={{ margin: 'auto', borderCollapse: 'collapse' }}>
        <tbody>
          {grid.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, colIndex) => (
                <td
                  key={`${rowIndex}-${colIndex}`}
                  style={{
                    width: '40px',
                    height: '40px',
                    border: '1px solid black',
                    textAlign: 'center',
                    verticalAlign: 'middle',
                    cursor: 'pointer'
                  }}
                  onClick={() => fillCell(rowIndex, colIndex)}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {!initialFilled && (
        <div>
          <p>Select a number for the first cell:</p>
          {[1, 2, 3, 4, 5, 6].map(number => (
            <button key={number} onClick={() => {
              setDice1(number);
              setDice2(number); // Optional, not necessary for first cell
            }}>
              {number}
            </button>
          ))}
        </div>
      )}
      <button
        style={{ display: 'block', margin: '20px auto' }}
        onClick={rollDice}
        disabled={!initialFilled || diceSelected !== null}
      >
        Roll Dice
      </button>
      {initialFilled && dice1 && dice2 && (
        <div>
          <p>Dice Rolls: {dice1} and {dice2}</p>
          <button disabled={diceSelected !== null} onClick={() => setDiceSelected(dice1)}>Place {dice1}</button>
          <button disabled={diceSelected !== null} onClick={() => setDiceSelected(dice2)}>Place {dice2}</button>
        </div>
      )}
    </div>
  );
}

export default DiceGridGame;
