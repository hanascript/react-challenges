import Link from 'next/link';

export default function Home() {
  return (
    <div className='h-screen flex flex-col items-center justify-center'>
      <h1 className='text-6xl font-bold mb-8'>React Challegnes</h1>
      <ul className='list-inside text-sm'>
        <li className='hover:underline'>
          <Link href='/challenges/rock-paper-scissors'>Rock Paper Scissors</Link>
        </li>
        <li className='hover:underline'>
          <Link href='/challenges/rock-paper-scissors'>Rock Paper Scissors</Link>
        </li>
        <li className='hover:underline'>
          <Link href='/challenges/rock-paper-scissors'>Rock Paper Scissors</Link>
        </li>
        <li className='hover:underline'>
          <Link href='/challenges/rock-paper-scissors'>Rock Paper Scissors</Link>
        </li>
      </ul>
    </div>
  );
}
