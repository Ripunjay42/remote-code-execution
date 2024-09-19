'use client';

import { useParams } from 'next/navigation';
import { useState } from 'react';
import ProblemDescription from '@/components/ProblemDescription';
import CodeEditor from '@/components/CodeEditor';
import TestCases from '@/components/TestCases';
import { problems } from '../../../lib/problems';
import Topbar from '@/components/Topbar';

export default function ProblemPage() {
  const { id } = useParams();
  const problem = problems.find(p => p.id === id);
  const [code, setCode] = useState(problem.starterCode);
  const [testResults, setTestResults] = useState(null);

  const handleSubmit = async () => {
    try {
      // Construct the full code by replacing placeholders in the main function
      const inputs = problem.testCases.map(tc => tc.input).join(', ');
      const expectedOutputs = problem.testCases.map(tc => tc.expectedOutput);
      
      // Replace placeholders in mainFunction
      const fullCode = problem.mainFunction
        .replace('INPUT_VALUES', inputs)
        .replace('TARGET_VALUE', '9') // Replace with dynamic target if needed
        .replace('INPUT_STRING', '"()"'); // Example for string inputs

      // Prepare the submission payload
      const submissionPayload = {
        code: `${problem.starterCode}\n${fullCode}`,
        problemId: id,
      };

      const response = await fetch('/api/judge', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submissionPayload),
      });
      
      const results = await response.json();
      setTestResults(results);
    } catch (error) {
      console.error('Error submitting code:', error);
    }
  };

  if (!problem) return <div>Problem not found</div>;

  return (
      <div className='bg-gradient-to-b from-gray-900 to-black min-h-screen relative px-4'>
        <div className='max-w-7xl mx-auto'>
          <Topbar />
          <div className="flex flex-col md:flex-row gap-4 mt-10">
            <div className="w-full md:w-1/2 p-4 border-spacing-2 border-2">
              <ProblemDescription problem={problem} />
            </div>
            <div className="w-full md:w-1/2 border-spacing-2 border-2 p-4">
              {/* Centered C++ Label */}
              <div className="text-center text-lg font-bold text-white mb-2">C++</div>
              <CodeEditor code={code} onChange={setCode} />
              <button
                onClick={handleSubmit}
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Submit
              </button>
              <div className="mt-4">
                <TestCases testCases={problem.testCases} results={testResults} />
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}
