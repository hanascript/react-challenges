'use client';

import { useEffect, useRef, useState } from 'react';

export default function StopWatch() {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  const isDisabled = time === 0 || isRunning;
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const formatTime = (time: number) => {
    const hours = Math.floor(time / 3600)
      .toString()
      .padStart(2, '0');
    const minutes = Math.floor((time % 3600) / 60)
      .toString()
      .padStart(2, '0');
    const seconds = (time % 60).toString().padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  };

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTime(prevTime => prevTime + 1);
      }, 100);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }
  }, [isRunning]);

  const handleStart = () => {
    setIsRunning(true);
  };

  const handlePause = () => {
    setIsRunning(false);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTime(0);
  };

  return (
    <div className='w-full h-full flex items-center justify-center'>
      <div className='p-4 border rounded flex-1 max-w-xl'>
        <div className='w-full flex items-stretch justify-between gap-4'>
          <div className='border flex-1 flex items-center justify-center rounded text-2xl'>{formatTime(time)}</div>
          <div className='flex flex-col gap-2'>
            <button
              className='h-10 w-40 bg-purple-400 rounded cursor-pointer'
              onClick={handleStart}
            >
              start
            </button>
            <button
              className='h-10 w-40 bg-purple-400 rounded cursor-pointer'
              onClick={handlePause}
            >
              pause
            </button>
            <button
              className='h-10 w-40 bg-purple-400 rounded cursor-pointer disabled:opacity-50'
              onClick={handleReset}
              disabled={isDisabled}
            >
              reset
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
