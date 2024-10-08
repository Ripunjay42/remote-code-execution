'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { problems } from '../lib/problems';
import { auth } from '@/components/firebase/firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';
import { db } from '@/components/firebase/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import { ExternalLink, ListOrdered, BarChart, CheckCircle, XCircle } from 'lucide-react';

export default function ProblemTable() {
  const [solvedProblems, setSolvedProblems] = useState({});
  const [user, setUser] = useState(null);

  // Check if problems are solved and set in state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);

      if (currentUser) {
        // Try to load solved problems from local storage
        const localStorageKey = `solvedProblems_${currentUser.uid}`;
        const localSolvedProblems = localStorage.getItem(localStorageKey);
        const solvedStatus = localSolvedProblems ? JSON.parse(localSolvedProblems) : {};

        // If not in local storage, fetch from Firestore
        if (Object.keys(solvedStatus).length === 0) {
          for (let problem of problems) {
            const docRef = doc(db, 'users', currentUser.uid, 'solvedProblems', problem.id);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
              solvedStatus[problem.id] = docSnap.data().solved;
            }
          }
          // Save the fetched solved problems to local storage
          localStorage.setItem(localStorageKey, JSON.stringify(solvedStatus));
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
        return 'text-yellow-500'; // Yellow color for Medium
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
      <table className="w-full md:max-w-4xl mx-auto border-collapse bg-gradient-to-b from-gray-900 to-black">
        <thead>
          <tr>
            <th className="hidden md:table-cell px-1 md:px-4 py-2 md:py-3 border-2 items-center border-gray-300 text-xs md:text-sm leading-3 font-medium text-cyan-300 uppercase tracking-wider">
              <div className="flex items-center justify-center space-x-1">
                <span className="hidden md:inline">S/N</span>
                <ListOrdered className="w-3 h-3 md:w-4 md:h-4 text-white font-extrabold" />
              </div>
            </th>
            <th className="px-1 md:px-4 py-2 border-2 border-gray-300 items-center text-xs md:text-sm leading-3 font-medium text-cyan-300 uppercase tracking-wider">
              <div className="flex items-center justify-center space-x-1">
                <span>Problem</span>
                <ExternalLink className="w-3 h-3 md:w-4 md:h-4 text-white font-extrabold" />
              </div>
            </th>
            <th className="px-1 md:px-4 py-2 border-2 items-center border-gray-300 text-xs md:text-sm leading-3 font-medium text-cyan-300 uppercase tracking-wider">
              <div className="flex items-center justify-center space-x-1">
                <span className="inline">Difficulty</span>
                <BarChart className="w-3 h-3 md:w-4 md:h-4 text-white font-extrabold" />
              </div>
            </th>
            <th className="px-1 md:px-4 py-2 border-2 items-center border-gray-300 text-xs md:text-sm leading-3 font-medium text-cyan-300 uppercase tracking-wider">
              <div className="flex items-center justify-center space-x-1">
                <span className="inline">Status</span>
                <CheckCircle className="w-3 h-3 md:w-4 md:h-4 text-white font-extrabold" />
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          {problems.map((problem, index) => (
            <tr key={problem.id}>
              <td className="hidden md:table-cell text-xs md:text-sm px-1 md:px-4 py-2 whitespace-no-wrap border border-gray-500">
                {index + 1}
              </td>
              <td className="px-1 md:px-4 py-2 text-xs md:text-sm whitespace-no-wrap border border-gray-500">
                <Link href={`/problems/${problem.id}`} className="text-blue-400 hover:text-blue-500 flex items-center justify-between">
                  <span className="truncate max-w-[100px] md:max-w-full">{problem.title}</span>
                  <ExternalLink className="w-3 h-3 md:w-4 md:h-4 ml-1 md:ml-2 text-white flex-shrink-0" />
                </Link>
              </td>
              <td className={`px-1 md:px-4 py-2 text-xs md:text-sm whitespace-no-wrap border border-gray-500 ${getDifficultyColor(problem.difficulty)}`}>
                <span className="inline">{problem.difficulty}</span>
                {/* <span className="md:hidden">{problem.difficulty.charAt(0)}</span> */}
              </td>
              <td className="px-1 md:px-4 py-2 text-xs md:text-sm whitespace-no-wrap border border-gray-500 text-center">
                {solvedProblems[problem.id] ? (
                  <span className="text-green-600 font-extrabold flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 md:w-4 md:h-4 text-green-500 font-extrabold" />
                  </span>
                ) : (
                  <span className="text-red-600 font-extrabold flex items-center justify-center">
                    <XCircle className="w-4 h-4 md:w-4 md:h-4 text-red-600 font-extrabold" />
                  </span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
