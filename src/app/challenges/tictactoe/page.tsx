'use client';

import { cn } from '@/lib/utils';
import { useState, useEffect } from 'react';

type Token = 'x' | 'o' | '';

export default function TicTacToe() {
  const [currentTurn, setCurrentTurn] = useState<'x' | 'o'>('x');
  const [winner, setWinner] = useState<'x' | 'o' | 'tie' | 'none'>('none');
  const [grid, setGrid] = useState<Token[][]>([
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
  ]);

  useEffect(() => {
    setGrid([
      ['', '', ''],
      ['', '', ''],
      ['', '', ''],
    ]);
  }, []);

  useEffect(() => {
    const win = checkWin();
    if (win !== 'none') {
      setWinner(win);
    }
  }, [grid]);

  const handleCellClick = (rowId: number, colId: number) => {
    setGrid(prev => {
      const newGrid = [...prev.map(row => [...row])];
      if (newGrid[rowId][colId] === '') {
        newGrid[rowId][colId] = currentTurn;
      }
      return newGrid;
    });
    setCurrentTurn(prev => (prev === 'x' ? 'o' : 'x'));
  };

  const checkWin = () => {
    for (let i = 0; i < 3; i++) {
      const row = grid[i];
      if (row[0] === row[1] && row[1] === row[2] && row[0] !== '') {
        return row[0];
      }
    }

    for (let i = 0; i < 3; i++) {
      const col = grid.map(row => row[i]);

      if (col[0] === col[1] && col[1] === col[2] && col[0] !== '') {
        return col[0];
      }
    }

    if (grid[0][0] === grid[1][1] && grid[1][1] === grid[2][2] && grid[0][0] !== '') {
      return grid[0][0];
    }

    if (grid[0][2] === grid[1][1] && grid[1][1] === grid[2][0] && grid[0][2] !== '') {
      return grid[0][2];
    }

    const isTie = grid.every(row => row.every(cell => cell !== ''));

    if (isTie) return 'tie';

    return 'none';
  };

  const handleReset = () => {
    setGrid([
      ['', '', ''],
      ['', '', ''],
      ['', '', ''],
    ]);
    setWinner('none');
    setCurrentTurn('x');
  };

  return (
    <div className='flex w-full h-full items-center justify-center flex-col gap-4'>
      <h1 className='text-7xl font-semibold font-mono'>TIC-TAC-TOE!</h1>
      <div className='flex gap-4 bg-cyan-800 p-4 flex-col'>
        {grid.map((row, rowId) => (
          <div
            key={rowId}
            className='flex gap-4'
          >
            {row.map((col, colId) => (
              <button
                key={colId}
                className={cn(
                  'bg-teal-200 h-24 w-24 flex items-center justify-center text-7xl',
                  col === '' && 'hover:bg-teal-200/50 cursor-pointer',
                  winner !== 'none' && 'cursor-not-allowed'
                )}
                onClick={() => handleCellClick(rowId, colId)}
                disabled={col !== '' || winner !== 'none'}
              >
                {col}
              </button>
            ))}
          </div>
        ))}
      </div>
      {winner === 'none' && <div className='font-bold'>Turn: {currentTurn === 'x' ? 'Player One' : 'Player Two'}</div>}
      {winner === 'tie' && <div className='font-bold'>Tie!</div>}
      {winner !== 'none' && winner !== 'tie' && (
        <div className='font-bold'>Winner: {winner === 'x' ? 'Player One' : 'Player Two'}</div>
      )}
      {winner !== 'none' && winner !== 'tie' && (
        <button
          className='bg-teal-200 p-4 rounded-md font-bold cursor-pointer'
          onClick={handleReset}
        >
          Reset
        </button>
      )}
    </div>
  );
}
