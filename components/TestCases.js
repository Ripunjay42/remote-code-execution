import React from 'react';

const decodeBase64 = (str) => {
  try {
    return atob(str);
  } catch (e) {
    console.error('Error decoding base64:', e);
    return 'Error decoding output';
  }
};

export default function TestCases({ testCases, results, compilationError, complexity, hasErrors }) {
  const haasErrors = compilationError || results.some(result => result.status?.id !== 3);

  const getStatusColor = (index) => {
    if (!results[index]) return 'bg-gray-800'; // Not run yet
    return results[index].passed ? 'bg-green-500' : 'bg-red-500';
  };

  return (
    <div className="mt-4">
      {complexity && (
        <div className="mb-4 p-4 border border-green-500 rounded-lg bg-gradient-to-br from-gray-800 to-gray-900 text-white text-sm shadow-lg">
          <h3 className="text-lg font-bold text-green-400 mb-3">Complexity Analysis</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-700 rounded p-3 border-l-4 border-blue-400">
              <p className="text-gray-300 text-xs font-semibold mb-1">Time Complexity</p>
              <p className="text-white text-xl font-mono font-bold">{complexity.Time_Complexity}</p>
            </div>
            <div className="bg-gray-700 rounded p-3 border-l-4 border-purple-400">
              <p className="text-gray-300 text-xs font-semibold mb-1">Space Complexity</p>
              <p className="text-white text-xl font-mono font-bold">{complexity.Space_Complexity}</p>
            </div>
          </div>
        </div>
      )}

      <div className="flex justify-start gap-4 items-center mb-2">
        <h2 className="text-xl text-white font-bold">Test Cases</h2>
        <div className="flex items-center space-x-2 gap-4">
          {testCases.map((_, index) => (
            <div key={index} className="flex items-center">
              <span className="mr-1 text-white text-sm">{index + 1}</span>
              <div
                className={`w-2 h-2 rounded-full ${getStatusColor(index)}`}
              ></div>
            </div>
          ))}
        </div>
      </div>

      {hasErrors && haasErrors && (
        <div className="mb-4 p-4 border border-red-500 rounded bg-gray-900 text-white text-sm">
          <h3 className="text-lg font-bold text-red-300 mb-2">Errors:</h3>
          {compilationError ? (
            <div className="mb-2">
              <p className="font-bold text-red-300">Compilation Error:</p>
              <pre className="whitespace-pre-wrap text-red-400 ml-2">{decodeBase64(compilationError)}</pre>
            </div>
          ) : (
            results.find(result => result.status?.id !== 3) && (
              <div className="mb-2">
                <p className="font-bold text-red-300">Runtime Error:</p>
                <pre className="whitespace-pre-wrap text-red-400 ml-2">
                  {decodeBase64(results.find(result => result.status?.id !== 3).error)}
                </pre>
              </div>
            )
          )}
        </div>
      )}

      <div className="max-h-56 overflow-y-auto border border-gray-700 rounded p-2 custom-scrollbar">
        <style jsx>{`
          .custom-scrollbar::-webkit-scrollbar {
            width: 5px;
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
        {testCases.map((testCase, index) => (
          <div key={index} className="mb-4 p-4 border border-gray-600 rounded text-white text-sm">
            <p><strong>Test Case {index + 1}</strong></p>
            <p><strong>Input : </strong> {testCase.input}</p>
            <p><strong>Expected Output : </strong> {testCase.expectedOutput}</p>
            {results[index] && (
              <>
                <p>
                  <strong>Your Output : </strong> 
                  {results[index].output ? decodeBase64(results[index].output) : 'No output'}
                </p>
                <p>
                  <strong>Result : </strong>
                  <span className={results[index].passed ? "text-green-500 font-bold" : "text-red-500 font-bold"}>
                    {results[index].passed ? "Passed" : "Failed"}
                  </span>
                </p>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}