'use client';

import { useState } from 'react';

export default function GradientTool() {
  const [from, setFrom] = useState('#e66465');
  const [to, setTo] = useState('#9198e5');

  const [direction, setDirection] = useState<string>('top');

  return (
    <div className='h-full w-full flex items-center justify-center'>
      <div className='w-4xl rounded h-[500px] bg-gray-800 flex gap-4'>
        <form className='bg-gray-700 p-4 gap-4 flex flex-col'>
          <label
            htmlFor='from'
            className='text-white'
          >
            From Hex
          </label>
          <input
            name='from'
            value={from}
            onChange={e => setFrom(e.target.value)}
            className='bg-gray-300 rounded'
          />
          <label
            htmlFor='to'
            className='text-white'
          >
            To Hex
          </label>
          <input
            name='to'
            value={to}
            onChange={e => setTo(e.target.value)}
            className='bg-gray-300 rounded'
          />
          <label
            htmlFor='direction'
            className='text-white'
          ></label>
          <select
            name='direction'
            className='bg-gray-300 rounded p-2'
            onChange={e => setDirection(e.target.value)}
          >
            <option value='top'>top</option>
            <option value='bottom'>bottom</option>
            <option value='left'>left</option>
            <option value='right'>right</option>
          </select>
        </form>
        <div className='flex-1 p-4'>
          <div
            className='w-full h-full bg-green-500 rounded'
            style={{ background: `linear-gradient(to ${direction}, ${from}, ${to})` }}
          />
        </div>
      </div>
    </div>
  );
}
