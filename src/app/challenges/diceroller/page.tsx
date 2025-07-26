'use client';

import { useState } from 'react';

export default function DiceRoller() {
  const [dice, setDice] = useState(2);
  const [faces, setFaces] = useState(6);
  const [wins, setWins] = useState<number[]>([]);

  function addDice() {
    if (dice < 5) {
      setDice(prev => prev + 1);
    }
  }

  function removeDice() {
    if (dice > 2) {
      setDice(prev => prev - 1);
    }
  }

  function removeFaces() {
    if (faces > 1) {
      setFaces(prev => prev - 1);
    }
  }

  function addFaces() {
    if (faces < 6) {
      setFaces(prev => prev + 1);
    }
  }

  function rollDice() {
    setWins([]);
    for (let i = 0; i < dice; i++) {
      const randomNumber = Math.floor(Math.random() * faces) + 1;
      setWins(prev => [...prev, randomNumber]);
    }
  }

  return (
    <div className='flex items-center justify-center h-full flex-col gap-4'>
      <div className='flex flex-col items-center justify-center'>
        <p>WINS</p>
        <div className='flex gap-2'>
          {wins.map((win, index) => (
            <div
              key={index}
              className='border w-8 h-8 flex items-center justify-center rounded shadow'
            >
              {win}
            </div>
          ))}
        </div>
      </div>
      <div className='min-w-md flex items-center justify-center flex-col gap-4 border p-8'>
        <div className='flex items-center gap-4'>
          <div className='flex flex-col gap-2 items-center'>
            <div>Add & Remove Dice</div>
            <div className='flex items-center gap-2'>
              <button
                className='border w-8 h-8 flex items-center justify-center rounded shadow cursor-pointer disabled:opacity-50 active:shadow-none'
                onClick={removeDice}
                disabled={dice === 2}
              >
                -
              </button>
              <div className='font-semibold'>{dice}</div>
              <button
                className='border w-8 h-8 flex items-center justify-center rounded shadow cursor-pointer disabled:opacity-50 active:shadow-none'
                onClick={addDice}
                disabled={dice === 5}
              >
                +
              </button>
            </div>
          </div>
          <div className='w-0.5 bg-black/50 h-10 rounded-full' />
          <div className='flex flex-col gap-2 items-center'>
            <div>Change Dice Faces</div>
            <div className='flex items-center gap-2'>
              <button
                className='border w-8 h-8 flex items-center justify-center rounded shadow cursor-pointer disabled:opacity-50 active:shadow-none'
                onClick={removeFaces}
                disabled={faces === 1}
              >
                -
              </button>
              <div className='font-semibold'>{faces}</div>
              <button
                className='border w-8 h-8 flex items-center justify-center rounded shadow cursor-pointer disabled:opacity-50 active:shadow-none'
                onClick={addFaces}
                disabled={faces === 6}
              >
                +
              </button>
            </div>
          </div>
        </div>
        <div className='flex gap-4'>
          {Array.from({ length: dice }).map((_, index) => (
            <DiceBlock
              key={index}
              faces={faces}
            />
          ))}
        </div>
        <button
          className='bg-blue-300 w-full p-2 rounded font-semibold uppercase cursor-pointer'
          onClick={rollDice}
        >
          roll
        </button>
      </div>
    </div>
  );
}

function DiceBlock({ faces }: { faces: number }) {
  return (
    <div className='w-20 h-20 rounded border flex items-center justify-center gap-4 flex-wrap flex-col'>
      {Array.from({ length: faces }).map((_, index) => (
        <div
          key={index}
          className='flex w-3 h-3 bg-black rounded-full'
        />
      ))}
    </div>
  );
}
