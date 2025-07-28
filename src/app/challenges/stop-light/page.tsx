'use client';

import { cn } from '@/lib/utils';
import { useState, useEffect, useRef } from 'react';

type Light = 'red' | 'yellow' | 'green';

export default function StopLight() {
  const [enabled, setEnabled] = useState<boolean>(false);
  const [light, setLight] = useState<Light>('red');

  const RED_DELAY = 5000;
  const GREEN_DELAY = 5000;
  const YELLOW_DELAY = 3000;

  useEffect(() => {
    if (enabled) {
      if (light === 'red') {
        setTimeout(() => {
          setLight('green');
        }, RED_DELAY);
      }

      if (light === 'yellow') {
        setTimeout(() => {
          setLight('red');
        }, YELLOW_DELAY);
      }

      if (light === 'green') {
        setTimeout(() => {
          setLight('yellow');
        }, GREEN_DELAY);
      }
    } else {
      setLight('red');
    }
  }, [enabled, light]);

  return (
    <div className='flex items-center justify-center h-full w-full flex-col gap-8'>
      <div className='border flex flex-col gap-4 p-4 rounded-md'>
        <div className={cn('size-15 bg-red-500 rounded-full border border-black', light != 'red' && 'opacity-35')} />
        <div
          className={cn('size-15 bg-yellow-500 rounded-full border border-black', light != 'yellow' && 'opacity-35')}
        />
        <div
          className={cn('size-15 bg-green-500 rounded-full border border-black', light != 'green' && 'opacity-35')}
        />
      </div>
      <button
        className='p-4 bg-blue-400 rounded cursor-pointer font-semibold uppercase'
        onClick={() => {
          setEnabled(!enabled);
        }}
      >
        {enabled ? 'stop light' : 'start light'}
      </button>
    </div>
  );
}
