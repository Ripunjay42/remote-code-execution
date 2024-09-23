'use client';

import { useParams } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
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

export default function ProblemPage() {
  const { id } = useParams();
  const problem = problems.find((p) => p.id === id);

  // Hold all API keys in an array and rotate them every hour
  const apiKeys = [
    process.env.NEXT_PUBLIC_JUDGE0_API_KEY_3,
    process.env.NEXT_PUBLIC_JUDGE0_API_KEY_2,
    process.env.NEXT_PUBLIC_JUDGE0_API_KEY_1,
    process.env.NEXT_PUBLIC_JUDGE0_API_KEY_4,
    process.env.NEXT_PUBLIC_JUDGE0_API_KEY_5,
  ];

  const [currentApiKey, setCurrentApiKey] = useState(apiKeys[0]);
  const apiKeyIndex = useRef(0);

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
  const [compilationError, setCompilationError] = useState(null);

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
        setTestResults([]);
        setCompilationError(null);
      }
    });

    return () => unsubscribe();
  }, [problem.id]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(`code_${id}`, code);
    }
  }, [code, id]);

  // Set up the key rotation every hour (3600000 ms)
  useEffect(() => {
    const rotateKey = () => {
      apiKeyIndex.current = (apiKeyIndex.current + 1) % apiKeys.length;
      setCurrentApiKey(apiKeys[apiKeyIndex.current]);
    };

    const intervalId = setInterval(rotateKey, 3600000); // Rotate every 10mins

    return () => clearInterval(intervalId); // Clean up on component unmount
  }, [apiKeys]);

  const handleSubmit = async () => {
    if (!user) {
      setShowAuthMessage(true);
      setTimeout(() => setShowAuthMessage(false), 3000);
      return;
    }

    setShowAuthMessage(false);
    setIsSubmitting(true);
    setTestResults([]);
    setCompilationError(null);

    let allPassed = true;
    let hasStoppedCompiling = false;

    for (let i = 0; i < problem.testCases.length; i++) {
      if (hasStoppedCompiling) break;

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
        }else if (problem.id === 'medianOfTwoSortedArrays') {
          const [nums1, nums2] = parseMedianOfTwoSortedArraysInput(input);
          fullCode = fullCode.replace('NUMS1_VALUES', nums1).replace('NUMS2_VALUES', nums2);
        } else if (problem.id === 'reverseInteger') {
          const x = parseReverseIntegerInput(input);
          fullCode = fullCode.replace('INPUT_VALUE', x);
        }

        // Submit code to Judge0 API
        const submissionResponse = await fetch(`${JUDGE0_API_URL}/submissions?base64_encoded=true`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-RapidAPI-Key': currentApiKey,
          },
          body: JSON.stringify({
            source_code: btoa(fullCode),
            language_id: 54, // C++ (GCC 9.2.0)
            stdin: '',
          }),
        });

        const submissionResult = await submissionResponse.json();
        const { token } = submissionResult;

        // Poll for results
        let outputResult;
        while (true) {
          await new Promise(resolve => setTimeout(resolve, 1000));

          const outputResponse = await fetch(`${JUDGE0_API_URL}/submissions/${token}?base64_encoded=true`, {
            headers: {
              'X-RapidAPI-Key': currentApiKey,
            },
          });

          outputResult = await outputResponse.json();

          if (outputResult.status.id !== 1 && outputResult.status.id !== 2) {
            break;
          }
        }

        const testResult = {
          input: testCase.input,
          expected: expectedOutput,
          output: outputResult.stdout,
          error: outputResult.stderr,
          status: outputResult.status,
          compile_output: outputResult.compile_output,
          passed: outputResult.status.id === 3 && 
            expectedOutput.split('|').some(expected => 
              atob(outputResult.stdout).trim() === expected.trim()
            ),
        };

        setTestResults(prevResults => [...prevResults, testResult]);

        if (outputResult.status.id === 6) {
          setCompilationError(outputResult.compile_output);
          hasStoppedCompiling = true;
        }

        if (!testResult.passed) {
          allPassed = false;
        }

      } catch (error) {
        console.error('Error submitting code for test case:', error);
        setTestResults(prevResults => [
          ...prevResults,
          {
            input: problem.testCases[i].input,
            error: 'Submission failed',
            passed: false,
          }
        ]);
        allPassed = false;
      }
    }

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

  
  const parseMedianOfTwoSortedArraysInput = (input) => {
    const nums1Match = input.match(/nums1 = {(.*?)}/);
    const nums2Match = input.match(/nums2 = {(.*?)}/);
    const nums1 = nums1Match ? nums1Match[1] : '';
    const nums2 = nums2Match ? nums2Match[1] : '';
    return [nums1, nums2];
  };

  const parseReverseIntegerInput = (input) => {
    const match = input.match(/x = (-?\d+)/);
    return match ? match[1] : "";
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
            <div className="flex items-center mt-4">
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className={`px-3 py-1 bg-blue-500 text-white text-sm font-bold rounded hover:bg-blue-600 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </button>
            {isSubmitting && (
                <div className="ml-2">
                  <div className="w-4 h-4 border-t-2 border-r-2 border-red-500 rounded-full animate-spin"></div>
                </div>
              )}
            </div>
            {showAuthMessage && (
              <p className="mt-2 text-red-500">Please sign in to submit your code.</p>
            )}
            <div className="mt-4">
              <TestCases 
                testCases={problem.testCases} 
                results={testResults} 
                compilationError={compilationError} 
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
