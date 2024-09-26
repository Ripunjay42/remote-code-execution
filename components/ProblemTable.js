'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { problems } from '../lib/problems';
import { auth } from '@/components/firebase/firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';
import { db } from '@/components/firebase/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import { ExternalLink, ListOrdered, BarChart, CheckCircle } from 'lucide-react';

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
        return 'text-yellow-500'; // Blue color for Medium
      case 'Hard':
        return 'text-red-500'; // Red color for Hard
      default:
        return 'text-gray-500'; // Default color for unknown difficulty
    }
  };

  return (
    <div className="overflow-x-auto max-h-[450px] md:max-h-[500px] overflow-y-auto border border-violet-300 rounded p-2 custom-scrollbar">
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
      <table className="min-w-full max-w-4xl mx-auto border-collapse bg-gradient-to-b from-gray-900 to-black">
        <thead>
          <tr>
            <th className="hidden lg:table-cell px-4 py-3 border-2 items-center border-gray-300 text-sm leading-3 font-medium text-cyan-300 uppercase tracking-wider">
              <div className="flex items-center justify-center space-x-1">
                <span>S/N</span>
                <ListOrdered className="w-4 h-4 text-white font-extrabold" /> {/* Icon for S/N */}
              </div>
            </th>
            <th className="px-4 py-2 border-2 border-gray-300 items-center text-sm leading-3 font-medium text-cyan-300 uppercase tracking-wider">
              <div className="flex items-center justify-center space-x-1">
                <span>Problem</span>
                <ExternalLink className="w-4 h-4 text-white font-extrabold" /> {/* Icon for Problem */}
              </div>
            </th>
            <th className="px-4 py-2 border-2 items-center border-gray-300 text-sm leading-3 font-medium text-cyan-300 uppercase tracking-wider">
              <div className="flex items-center justify-center space-x-1">
                <span>Difficulty</span>
                <BarChart className="w-4 h-4 text-white font-extrabold" /> {/* Icon for Difficulty */}
              </div>
            </th>
            <th className="px-4 py-2 border-2 items-center border-gray-300 text-sm leading-3 font-medium text-cyan-300 uppercase tracking-wider">
              <div className="flex items-center justify-center space-x-1">
                <span>Status</span>
                <CheckCircle className="w-4 h-4 text-white font-extrabold" /> {/* Icon for Status */}
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          {problems.map((problem, index) => (
            <tr key={problem.id}>
              <td className="hidden lg:table-cell text-sm px-4 py-2 whitespace-no-wrap border border-gray-500">
                {index + 1} {/* Serial number */}
              </td>
              <td className="px-4 py-2 text-sm whitespace-no-wrap border border-gray-500">
                <Link href={`/problems/${problem.id}`} className="text-blue-400 hover:text-blue-500 flex items-center justify-between">
                  {problem.title}
                  <ExternalLink className="w-4 h-4 ml-2 text-white" />
                </Link>
              </td>
              <td className={`px-4 py-2 text-sm whitespace-no-wrap border border-gray-500 ${getDifficultyColor(problem.difficulty)}`}>
                {problem.difficulty}
              </td>
              <td className="px-4 py-2 text-sm whitespace-no-wrap border border-gray-500 text-center">
                {solvedProblems[problem.id] ? (
                  <span className="text-green-600 font-extrabold flex items-center justify-center">
                    {/* Solved */}
                    <CheckCircle className="w-4 h-4 text-green-500 font-extrabold" /> 
                    {/* <svg
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
                    </svg> */}
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
