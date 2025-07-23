'use client';

import { cn } from '@/lib/utils';
import { BrickWall, FileQuestion, Frown, Handshake, PartyPopper, Scissors, Scroll } from 'lucide-react';
import { useState } from 'react';

export default function RockPaperScissors() {
  const [playerChoice, setPlayerChoice] = useState<string | null>(null);
  const [computerChoice, setComputerChoice] = useState<string | null>(null);
  const [gameState, setGameState] = useState<'playing' | 'result'>('playing');

  const computerChoices = ['rock', 'paper', 'scissors'];

  const handleCpuChoice = () => {
    const randomIndex = Math.floor(Math.random() * computerChoices.length);
    const randomChoice = computerChoices[randomIndex];
    setComputerChoice(randomChoice);
  };

  const handlePlayerChoice = (choice: string) => {
    setPlayerChoice(choice);
    handleCpuChoice();
    setGameState('result');
  };

  const findCorrectIcon = (choice: string | null) => {
    if (choice === 'rock') return <BrickWall className='size-12' />;
    if (choice === 'paper') return <Scroll className='size-12' />;
    if (choice === 'scissors') return <Scissors className='size-12' />;

    return <FileQuestion className='size-12' />;
  };

  const handleGameResult = () => {
    if (playerChoice === computerChoice) {
      return (
        <div className='flex flex-col items-center gap-2'>
          <div className='flex items-center gap-2 text-4xl pb-6'>
            Neither! Its a draw! <Handshake className='size-8' />
          </div>
          <div className='flex items-center gap-2'>
            <p className='text-green-500'>{findCorrectIcon(playerChoice)}</p>
            <p>vs</p>
            <p className='text-red-500'>{findCorrectIcon(computerChoice)}</p>
          </div>
        </div>
      );
    } else if (playerChoice === 'rock' && computerChoice === 'scissors') {
      return (
        <div className='flex flex-col items-center gap-2'>
          <div className='flex items-center gap-2 text-4xl pb-6'>
            You! <PartyPopper className='size-8' />
          </div>
          <div className='flex items-center gap-2'>
            <p className='animate-bounce text-green-500'>{findCorrectIcon(playerChoice)}</p>
            <p>vs</p>
            <p className='text-red-500'>{findCorrectIcon(computerChoice)}</p>
          </div>
        </div>
      );
    } else if (playerChoice === 'paper' && computerChoice === 'rock') {
      return (
        <div className='flex flex-col items-center gap-2'>
          <div className='flex items-center gap-2 text-4xl pb-6'>
            You! <PartyPopper className='size-8' />
          </div>
          <div className='flex items-center gap-2'>
            <p className='animate-bounce text-green-500'>{findCorrectIcon(playerChoice)}</p>
            <p>vs</p>
            <p className='text-red-500'>{findCorrectIcon(computerChoice)}</p>
          </div>
        </div>
      );
    } else if (playerChoice === 'scissors' && computerChoice === 'paper') {
      return (
        <div className='flex flex-col items-center gap-2'>
          <div className='flex items-center gap-2 text-4xl pb-6'>
            You! <PartyPopper className='size-8' />
          </div>
          <div className='flex items-center gap-2'>
            <p className='animate-bounce text-green-500'>{findCorrectIcon(playerChoice)}</p>
            <p>vs</p>
            <p className='text-red-500'>{findCorrectIcon(computerChoice)}</p>
          </div>
        </div>
      );
    } else {
      return (
        <div className='flex flex-col items-center gap-2'>
          <div className='flex items-center gap-2 text-4xl pb-6'>
            CPU... Better luck next time! <Frown className='size-8' />
          </div>
          <div className='flex items-center gap-2'>
            <p className='text-green-500'>{findCorrectIcon(playerChoice)}</p>
            <p>vs</p>
            <p className='animate-bounce text-red-500'>{findCorrectIcon(computerChoice)}</p>
          </div>
        </div>
      );
    }
  };

  const handleResetGame = () => {
    setPlayerChoice(null);
    setComputerChoice(null);
    setGameState('playing');
  };

  return (
    <div className='w-full h-full flex flex-col items-center justify-center'>
      {gameState === 'playing' && (
        <>
          <h2 className='text-2xl font-bold mb-4'>Choose your weapon</h2>
          <div className='flex items-center gap-4'>
            <PlayerCard
              icon={findCorrectIcon('rock')}
              label='rock'
              onClick={() => handlePlayerChoice('rock')}
            />
            <PlayerCard
              icon={findCorrectIcon('paper')}
              label='paper'
              onClick={() => handlePlayerChoice('paper')}
            />
            <PlayerCard
              icon={findCorrectIcon('scissors')}
              label='scissors'
              onClick={() => handlePlayerChoice('scissors')}
            />
          </div>
        </>
      )}
      {gameState === 'result' && (
        <>
          <h2 className='text-2xl font-bold mb-4'>And the winner is...</h2>
          <div className='text-2xl font-bold mb-4'>{handleGameResult()}</div>
          <button
            className='p-4 border rounded uppercase text-sm cursor-pointer'
            onClick={handleResetGame}
          >
            Reset Game
          </button>
        </>
      )}
    </div>
  );
}

const PlayerCard = ({
  icon,
  label,
  onClick,
  className,
}: {
  icon?: React.ReactNode;
  label: string;
  onClick: () => void;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        'w-56 h-96 rounded border flex items-center justify-center flex-col font-bold uppercase cursor-pointer hover:scale-105 transition-all duration-300 ease-in-out hover:shadow',
        className
      )}
      onClick={onClick}
    >
      {icon && icon}
      <p>{label}</p>
    </div>
  );
};
