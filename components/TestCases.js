export default function TestCases({ testCases, results }) {
    return (
      <div className="mt-4">
        <h2 className="text-xl text-white font-bold mb-2">Test Cases</h2>
        {testCases.map((testCase, index) => (
          <div key={index} className="mb-2 text-white text-sm">
            <p>Input: {testCase.input}</p>
            <p>Expected Output: {testCase.expectedOutput}</p>
            {results && (
              <p>
                Result: {results[index] ? 'Passed' : 'Failed'}
              </p>
            )}
          </div>
        ))}
      </div>
    );
  }