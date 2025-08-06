'use client';

import { cn } from '@/lib/utils';
import { useEffect, useRef, useState } from 'react';

export default function WhackAMole() {
  const ratRef = useRef<NodeJS.Timeout>(null);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [isGameover, setIsGameOver] = useState(false);
  const [board, setBoard] = useState<boolean[][]>([
    [false, false, false, false],
    [false, false, false, false],
    [false, false, false, false],
    [false, false, false, false],
  ]);

  const RAT_SPAWN_RATE = 1000;
  const GAME_DURATION = 10000;

  useEffect(() => {
    setBoard([
      [false, false, false, false],
      [false, false, false, false],
      [false, false, false, false],
      [false, false, false, false],
    ]);
  }, []);

  useEffect(() => {
    if (isRunning) {
      ratRef.current = setInterval(() => {
        handleMouseSpawn();
      }, RAT_SPAWN_RATE);

      setTimeout(() => {
        setIsRunning(false);
        setIsGameOver(true);
        if (ratRef.current) {
          clearInterval(ratRef.current);
        }
      }, GAME_DURATION);
    } else {
      if (ratRef.current) {
        clearInterval(ratRef.current);
      }
    }
  }, [isRunning]);

  const handlePlay = () => {
    if (isRunning) {
      if (ratRef.current) {
        clearInterval(ratRef.current);
      }
      setScore(0);
      setIsGameOver(false);
      setIsRunning(prev => !prev);
    } else {
      setIsGameOver(false);
      setBoard([
        [false, false, false, false],
        [false, false, false, false],
        [false, false, false, false],
        [false, false, false, false],
      ]);
      setScore(0);
      setIsRunning(prev => !prev);
    }
  };

  const handleMouseSpawn = () => {
    const ratx = Math.floor(Math.random() * 4);
    const raty = Math.floor(Math.random() * 4);

    if (board[ratx][raty] === true) {
      handleMouseSpawn();
    }

    setBoard(prev => {
      const newBoard = [...prev.map(row => [...row])];
      newBoard[ratx][raty] = true;
      return newBoard;
    });

    setTimeout(() => {
      setBoard(prev => {
        const newBoard = [...prev.map(row => [...row])];
        newBoard[ratx][raty] = false;
        return newBoard;
      });
    }, 700);
  };

  const handleSmack = (rowId: number, colId: number) => {
    if (isRunning) {
      if (board[rowId][colId] === false) {
        return;
      }

      setBoard(prev => {
        const newBoard = [...prev.map(row => [...row])];
        newBoard[rowId][colId] = false;
        return newBoard;
      });
      setScore(prev => prev + 1);
    }
  };

  return (
    <div className='bg-zinc-800 h-full w-full flex items-center justify-center text-white'>
      <div className='flex flex-col gap-4'>
        <div className='flex items-center justify-between'>
          <h1 className='italic text-4xl text-center font-bold'>SMACK DA RAT</h1>
          <button
            onClick={handlePlay}
            className='bg-violet-800 px-4 py-2 rounded font-bold uppercase cursor-pointer'
          >
            {isRunning ? 'Quit' : 'Play'}
          </button>
        </div>
        <div className='flex flex-col gap-4'>
          {board.map((row, rowId) => (
            <div
              key={rowId}
              className='flex gap-4'
            >
              {row.map((cell, colId) => (
                <button
                  key={colId}
                  onClick={() => handleSmack(rowId, colId)}
                  className={cn(
                    'p-2 border rounded h-32 w-32 text-7xl flex items-center justify-center',
                    isRunning && 'cursor-pointer'
                  )}
                >
                  {cell ? '🐭' : '🕳️'}
                </button>
              ))}
            </div>
          ))}
        </div>
        <div className='flex justify-between items-center text-2xl'>
          <p className='font-semibold'>SCORE: {score}</p>
          <p className='text-red-500 font-bold'>
            {isGameover && (
              <>
                <span>GAMEOVER YOU SCORED: {score}</span>
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  );
}
