import { ArrowLeftIcon, ChevronLeft } from 'lucide-react';
import Link from 'next/link';

export default function ChallengesLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className='flex flex-col h-screen'>
      <div className='h-12 border-b px-4 flex items-center'>
        <Link
          href='/'
          className='flex items-center gap-2 text-sm'
        >
          <ChevronLeft className='size-4' /> Go Back
        </Link>
      </div>
      <main className='p-4 flex-1'>{children}</main>
    </div>
  );
}
