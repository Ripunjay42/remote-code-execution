'use client';

import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import ProblemDescription from '@/components/ProblemDescription';
import CodeEditor from '@/components/CodeEditor';
import TestCases from '@/components/TestCases';
import { problems } from '../../../lib/problems';
import Topbar from '@/components/Topbar';
import { auth } from '@/components/firebase/firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { db } from '@/components/firebase/firebaseConfig';
import Confetti from 'react-confetti';

const JUDGE0_API_URL = 'https://judge0-ce.p.rapidapi.com';
const JUDGE0_API_KEY = '32da8d1aecmshd7ff93dae736ddap1f4606jsne686ec2d3b3a'; // Replace with your actual API key

export default function ProblemPage() {
  const { id } = useParams();
  const problem = problems.find((p) => p.id === id);
  
  const [code, setCode] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(`code_${id}`) || (problem?.starterCode || '');
    }
    return '';
  });

  const [testResults, setTestResults] = useState([]);
  const [user, setUser] = useState(null);
  const [showAuthMessage, setShowAuthMessage] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSolved, setIsSolved] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0); // Key for refreshing TestCases

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      
      if (currentUser) {
        const docRef = doc(db, 'users', currentUser.uid, 'solvedProblems', problem.id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setIsSolved(docSnap.data().solved);
        } else {
          setIsSolved(false);
        }
      } else {
        setIsSolved(false);
        setTestResults([]); // Clear results on sign-out
        setRefreshKey(prev => prev + 1); // Change the key to refresh TestCases
      }
    });

    return () => unsubscribe();
  }, [problem.id]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(`code_${id}`, code);
    }
  }, [code, id]);

  const handleSubmit = async () => {
    if (!user) {
      setShowAuthMessage(true);
      setTimeout(() => setShowAuthMessage(false), 3000);
      return;
    }

    setShowAuthMessage(false);
    setIsSubmitting(true);
    const results = [];

    for (let i = 0; i < problem.testCases.length; i++) {
      try {
        const testCase = problem.testCases[i];
        const { input, expectedOutput } = testCase;

        let fullCode = `${code}\n${problem.mainFunction}`;

        // Prepare input based on problem type
        if (problem.id === 'twoSum') {
          const [nums, target] = parseTwoSumInput(input);
          fullCode = fullCode.replace('INPUT_VALUES', nums).replace('TARGET_VALUE', target);
        } else if (problem.id === 'validParentheses') {
          const inputString = parseStringInput(input);
          fullCode = fullCode.replace('INPUT_STRING', inputString);
        } else if (problem.id === 'addBinary') {
          const [a, b] = parseAddBinaryInput(input);
          fullCode = fullCode.replace('A_VALUE', a).replace('B_VALUE', b);
        }

        // Submit code to Judge0 API
        const submissionResponse = await fetch(`${JUDGE0_API_URL}/submissions`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-RapidAPI-Key': JUDGE0_API_KEY,
          },
          body: JSON.stringify({
            source_code: fullCode,
            language_id: 54, // C++ (GCC 9.2.0)
            stdin: '',
          }),
        });

        const submissionResult = await submissionResponse.json();
        const { token } = submissionResult;

        // Poll for results
        let outputResult;
        while (true) {
          await new Promise(resolve => setTimeout(resolve, 1000)); // Wait for 1 second

          const outputResponse = await fetch(`${JUDGE0_API_URL}/submissions/${token}`, {
            headers: {
              'X-RapidAPI-Key': JUDGE0_API_KEY,
            },
          });

          outputResult = await outputResponse.json();

          if (outputResult.status.id !== 1 && outputResult.status.id !== 2) {
            break; // Compilation and execution finished
          }
        }

        results.push({
          input: testCase.input,
          expected: expectedOutput,
          output: outputResult.stdout,
          error: outputResult.stderr,
          status: outputResult.status,
          compile_output: outputResult.compile_output,
          passed: outputResult.status.id === 3 && 
            expectedOutput.split('|').some(expected => 
              outputResult.stdout.trim() === expected.trim()
            ),
        });

      } catch (error) {
        console.error('Error submitting code for test case:', error);
        results.push({
          input: problem.testCases[i].input,
          error: 'Submission failed',
          passed: false,
        });
      }
    }

    const allPassed = results.every(result => result.passed);
    if (allPassed) {
      await setDoc(doc(db, 'users', user.uid, 'solvedProblems', problem.id), {
        solved: true,
      });
      setIsSolved(true);
      setShowConfetti(true);

      setTimeout(() => {
        setShowConfetti(false);
      }, 6000);
    }

    setTestResults(results);
    setIsSubmitting(false);
  };

  // Helper functions to parse test case inputs
  const parseTwoSumInput = (input) => {
    const numsMatch = input.match(/nums = {(.*?)}/);
    const targetMatch = input.match(/target = (\d+)/);
    const nums = numsMatch ? numsMatch[1] : '';
    const target = targetMatch ? targetMatch[1] : '';
    return [nums, target];
  };

  const parseStringInput = (input) => {
    const stringMatch = input.match(/s = "(.*?)"/);
    return stringMatch ? stringMatch[1] : "";
  };

  const parseAddBinaryInput = (input) => {
    const aMatch = input.match(/a = "(.*?)"/);
    const bMatch = input.match(/b = "(.*?)"/);
    const a = aMatch ? aMatch[1] : "";
    const b = bMatch ? bMatch[1] : "";
    return [a, b];
  };

  if (!problem) return <div>Problem not found</div>;

  return (
    <div className="bg-gradient-to-b from-gray-900 to-black min-h-screen relative px-4">
      <div className="max-w-7xl mx-auto">
        <Topbar />
        {showConfetti && <Confetti />}
        <div className="flex flex-col md:flex-row gap-4 mt-10">
          <div className="w-full md:w-1/2 p-4 border-spacing-2 border-2">
            <ProblemDescription problem={problem} isSolved={isSolved} />
          </div>
          <div className="w-full md:w-1/2 border-spacing-2 border-2 p-3">
            <div className="text-center text-lg font-bold text-white mb-0">C++</div>
            <CodeEditor code={code} onChange={setCode} />
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className={`mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 ${
                isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </button>
            {showAuthMessage && (
              <p className="mt-2 text-red-500">Please sign in to submit your code.</p>
            )}
            <div className="mt-4">
              <TestCases key={refreshKey} testCases={problem.testCases} results={testResults} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
