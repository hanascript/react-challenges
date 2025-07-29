'use client';

import { Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function RandomQuote() {
  const [quote, setQuote] = useState('');
  const [getQuote, setGetQuote] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const fetchQuote = () => {
    fetch('https://api.gameofthronesquotes.xyz/v1/random')
      .then(res => res.json())
      .then(data => setQuote(data.sentence))
      .catch(err => console.log(err));
  };

  useEffect(() => {
    fetchQuote();
  }, []);

  useEffect(() => {
    if (getQuote) {
      setIsLoading(true);
      fetchQuote();
      setIsLoading(false);
      setGetQuote(false);
    }
  }, [getQuote]);

  return (
    <div className='w-full h-full flex items-center justify-center'>
      <div className='w-4xl p-4 rounded flex flex-col items-center justify-center gap-4 border'>
        <p className='text-4xl font-bold'>Game of Quotes</p>
        <div className='text-center italic text-xl'>
          {isLoading ? (
            <>
              <Loader2 className='animate-spin' />
            </>
          ) : (
            <p>"{quote}"</p>
          )}
        </div>
        <button
          className='bg-blue-500 text-white p-2 rounded text-xl cursor-pointer'
          onClick={() => setGetQuote(true)}
        >
          Get Quote
        </button>
      </div>
    </div>
  );
}
