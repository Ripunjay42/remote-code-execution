import React from 'react';
import { CheckCircle } from 'lucide-react';

export default function ProblemDescription({ problem, isSolved }) {
  return (
    <div className="overflow-hidden max-w-full relative">
      {isSolved && (
        <span className="absolute top-2 right-4 bg-black text-green-500 text-xs font-extrabold px-2 py-1 rounded flex items-center">
          Solved
          <CheckCircle className="ml-1 w-4 h-4 text-green-500 font-extrabold" />
        </span>
      )}
    <h1 className="text-2xl md:text-2xl text-cyan-500 underline font-bold mb-4  max-w-[calc(100%-8rem)] overflow-hidden break-words top-2">
      {problem.title}
    </h1>
      <div
        className="text-sm md:text-sm text-white overflow-auto custom-scrollbar"
        dangerouslySetInnerHTML={{ __html: problem.problemStatement }}
      />
      <style jsx>{`
         .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
          height: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #1a1a1a;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #888;
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #555;
        }
      `}</style>
    </div>
  );
}
