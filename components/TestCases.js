import React from 'react';

const decodeBase64 = (str) => {
  try {
    return atob(str);
  } catch (e) {
    console.error('Error decoding base64:', e);
    return 'Error decoding output';
  }
};

export default function TestCases({ testCases, results, compilationError }) {
  const hasErrors = compilationError || results.some(result => result.status?.id !== 3);

  return (
    <div className="mt-4">
      <h2 className="text-xl text-white font-bold mb-2">Test Cases</h2>

      {hasErrors && (
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

      <div className="max-h-56 overflow-y-auto border border-gray-700 rounded p-2">
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
