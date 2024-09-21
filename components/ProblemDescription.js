import React from 'react';

export default function ProblemDescription({ problem, isSolved }) {
  return (
    <div className="overflow-hidden max-w-full relative">
      {isSolved && (
        <span className="absolute top-1 right-4 bg-green-800 text-white text-xs font-extrabold px-2 py-1 rounded flex items-center">
          Solved
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="ml-2 w-4 h-4 text-cyan-300 font-extrabold"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7" // Checkmark path
            />
          </svg>
        </span>
      )}
      <h1 className="text-2xl md:text-3xl text-white font-bold mb-4">{problem.title}</h1>
      <div
        className="text-sm md:text-base text-white overflow-auto"
        dangerouslySetInnerHTML={{ __html: problem.problemStatement }}
      />
    </div>
  );
}
