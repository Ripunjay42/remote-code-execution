import Link from 'next/link';
import { problems } from '../lib/problems';

export default function ProblemTable() {
  return (
    <table className="min-w-full">
      <thead>
        <tr>
          <th className="px-6 py-3 border-b-2 border-gray-300  text-sm leading-4 font-medium text-gray-500 uppercase tracking-wider">
            Problem
          </th>
          <th className="px-6 py-3 border-b-2 border-gray-300  text-sm leading-4 font-medium text-gray-500 uppercase tracking-wider">
            Difficulty
          </th>
        </tr>
      </thead>
      <tbody>
        {problems.map((problem) => (
          <tr key={problem.id}>
            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
              <Link href={`/problems/${problem.id}`} className="text-blue-600 hover:text-blue-800">
                {problem.title}
              </Link>
            </td>
            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
              {problem.difficulty}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}