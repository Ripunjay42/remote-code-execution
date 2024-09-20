import React from 'react';

export default function TestCases({ testCases, results }) {
  const hasCompilationError = results.some(result => result.status && result.status.id === 6);
  const compilationError = hasCompilationError ? results.find(result => result.status.id === 6).compile_output : null;

  return (
    <div className="mt-4">
      <h2 className="text-xl text-white font-bold mb-2">Test Cases</h2>
      
      {hasCompilationError ? (
        <div className="mb-4 p-2 border border-red-500 rounded text-white text-sm bg-red-900">
          <p className="font-bold text-red-300">Compilation Error:</p>
          <pre className="whitespace-pre-wrap">{compilationError}</pre>
        </div>
      ) : (
        testCases.map((testCase, index) => (
          <div key={index} className="mb-4 p-2 border border-gray-700 rounded text-white text-sm">
            <p><strong>Input:</strong> {testCase.input}</p>
            <p><strong>Expected Output:</strong> {testCase.expectedOutput}</p>
            {results[index] && (
              <>
                <p>
                  <strong>Your Output:</strong> 
                  {results[index].output || results[index].error || 'No output'}
                </p>
                {results[index].status && results[index].status.id !== 3 ? (
                  <p>
                    <strong>Status: </strong>
                    <span className="text-yellow-500 font-bold">
                      {results[index].status.description}
                    </span>
                  </p>
                ) : (
                  <p>
                    <strong>Result: </strong>
                    <span className={results[index].passed ? "text-green-500 font-bold" : "text-red-500 font-bold"}>
                      {results[index].passed ? "Passed" : "Failed"}
                    </span>
                  </p>
                )}
              </>
            )}
          </div>
        ))
      )}
    </div>
  );
}