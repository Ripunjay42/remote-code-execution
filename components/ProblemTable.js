'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { problems } from '../lib/problems';
import { auth } from '@/components/firebase/firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';
import { db } from '@/components/firebase/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';

export default function ProblemTable() {
  const [solvedProblems, setSolvedProblems] = useState({});
  const [user, setUser] = useState(null);

  // Check if problems are solved and set in state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);

      if (currentUser) {
        const solvedStatus = {};
        for (let problem of problems) {
          const docRef = doc(db, 'users', currentUser.uid, 'solvedProblems', problem.id);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            solvedStatus[problem.id] = docSnap.data().solved;
          }
        }
        setSolvedProblems(solvedStatus);
      } else {
        // Reset solvedProblems when user signs out
        setSolvedProblems({});
      }
    });

    return () => unsubscribe();
  }, []);

  // Helper function to get difficulty color
  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Easy':
        return 'text-green-500'; // Green color for Easy
      case 'Medium':
        return 'text-blue-500'; // Blue color for Medium
      case 'Hard':
        return 'text-red-500'; // Red color for Hard
      default:
        return 'text-gray-500'; // Default color for unknown difficulty
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full max-w-5xl mx-auto border-collapse">
        <thead>
          <tr>
            <th className="hidden md:table-cell px-6 py-3 border-2 border-gray-300 text-sm leading-3 font-medium text-cyan-300 uppercase tracking-wider">
              S/N
            </th>
            <th className="px-6 py-3 border-2 border-gray-300 text-sm leading-3 font-medium text-cyan-300 uppercase tracking-wider">
              Problem
            </th>
            <th className="px-6 py-3 border-2 border-gray-300 text-sm leading-3 font-medium text-cyan-300 uppercase tracking-wider">
              Difficulty
            </th>
            <th className="px-6 py-3 border-2 border-gray-300 text-sm leading-3 font-medium text-cyan-300 uppercase tracking-wider">
              Status
            </th>
          </tr>
        </thead>
        <tbody>
          {problems.map((problem, index) => (
            <tr key={problem.id}>
              <td className="hidden md:table-cell px-6 py-4 whitespace-no-wrap border border-gray-500">
                {index + 1} {/* Serial number */}
              </td>
              <td className="px-6 py-4 whitespace-no-wrap border border-gray-500">
                <Link href={`/problems/${problem.id}`} className="text-blue-400 hover:text-blue-500">
                  {problem.title}
                </Link>
              </td>
              <td className={`px-6 py-4 whitespace-no-wrap border border-gray-500 ${getDifficultyColor(problem.difficulty)}`}>
                {problem.difficulty}
              </td>
              <td className="px-6 py-4 whitespace-no-wrap border border-gray-500 text-center"> {/* Centered text */}
                {solvedProblems[problem.id] ? (
                  <span className="text-green-600 font-extrabold flex items-center justify-center"> {/* Centered flex container */}
                    Solved
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="ml-2 w-5 h-5 text-green-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </span>
                ) : (
                  <span className="text-red-500">Not Solved</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}