import Link from 'next/link';

export default function Home() {
  const challenges = [
    { name: 'rock-paper-scissors' },
    { name: 'stopwatch' },
    { name: 'diceroller' },
    { name: 'stop-light' },
    { name: 'random-quote' },
  ];

  return (
    <div className='h-screen flex flex-col items-center justify-center'>
      <h1 className='text-6xl font-bold mb-8'>React Challegnes</h1>
      <ul className='list-inside text-sm'>
        {challenges.map(challenge => (
          <li
            className='hover:underline'
            key={challenge.name}
          >
            <Link href={`/challenges/${challenge.name}`}>{challenge.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
