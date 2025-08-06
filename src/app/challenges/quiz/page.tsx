'use client';

import { cn } from '@/lib/utils';
import { useState } from 'react';

type Answer = {
  answer: string;
  isCorrect: boolean;
};

type Question = {
  question: string;
  answers: Answer[];
};

const QUESTIONS: Question[] = [
  {
    question: 'Which one is A',
    answers: [
      { answer: 'a', isCorrect: true },
      { answer: 'b', isCorrect: false },
      { answer: 'c', isCorrect: false },
      { answer: 'd', isCorrect: false },
    ],
  },
  {
    question: 'Which one is B',
    answers: [
      { answer: 'a', isCorrect: false },
      { answer: 'b', isCorrect: true },
      { answer: 'c', isCorrect: false },
      { answer: 'd', isCorrect: false },
    ],
  },
  {
    question: 'Which one is C',
    answers: [
      { answer: 'a', isCorrect: false },
      { answer: 'b', isCorrect: false },
      { answer: 'c', isCorrect: true },
      { answer: 'd', isCorrect: false },
    ],
  },
];

export default function Quiz() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState<number | null>(null);
  const [score, setScore] = useState(0);

  const currentQuestion = QUESTIONS[currentQuestionIndex];
  const isQuizFinished = currentQuestionIndex === QUESTIONS.length;

  const handleAnswerClick = (answerIndex: number) => {
    setSelectedAnswerIndex(answerIndex);
  };

  const handleSubmit = () => {
    const isCorrect = currentQuestion.answers[selectedAnswerIndex!].isCorrect;

    if (isCorrect) {
      setScore(score + 1);
    }

    setSelectedAnswerIndex(null);
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  };

  function Quiz() {
    return (
      <>
        <h1 className='font-bold text-4xl text-white'>{currentQuestion.question}?</h1>
        <div className='grid grid-cols-2 gap-4'>
          {currentQuestion.answers.map((option, optionIndex) => (
            <button
              key={optionIndex}
              className={cn(
                'bg-white rounded px-6 py-2 cursor-pointer',
                selectedAnswerIndex === optionIndex && 'bg-blue-300'
              )}
              onClick={() => handleAnswerClick(optionIndex)}
            >
              {option.answer}
            </button>
          ))}
        </div>
        <button
          className={cn('bg-blue-500 text-white px-4 py-2 rounded-md', selectedAnswerIndex === null && 'bg-gray-500')}
          onClick={handleSubmit}
          disabled={selectedAnswerIndex === null}
        >
          submit
        </button>
      </>
    );
  }

  const handleReset = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswerIndex(null);
    setScore(0);
  };

  function QuizResult() {
    return (
      <>
        <h1 className='font-bold text-4xl text-white'>Quiz Result</h1>
        <p className='text-white'>
          You scored {score} out of {QUESTIONS.length}
        </p>
        <button
          className='bg-blue-500 text-white px-4 py-2 rounded-md'
          onClick={handleReset}
        >
          reset
        </button>
      </>
    );
  }

  return (
    <div className='h-full w-full flex flex-col gap-4 items-center justify-center bg-slate-800'>
      {isQuizFinished ? <QuizResult /> : <Quiz />}
    </div>
  );
}
