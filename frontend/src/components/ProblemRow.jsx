import { CheckCircle2, Circle } from 'lucide-react';
import { Link } from 'react-router-dom';

const ProblemRow = ({ problem }) => {
  const getDifficultyColor = (diff) => {
    switch(diff) {
      case 'Easy': return 'text-green-400';
      case 'Medium': return 'text-yellow-400';
      case 'Hard': return 'text-red-400';
      default: return 'text-slate-400';
    }
  };

  return (
    <tr className="border-b border-slate-700/50 hover:bg-slate-800/50 transition-colors">
      <td className="px-6 py-4 whitespace-nowrap">
        {problem.solved ? <CheckCircle2 className="w-5 h-5 text-green-500" /> : <Circle className="w-5 h-5 text-slate-600" />}
      </td>
      <td className="px-6 py-4">
        <Link to={`/problems/${problem.id}`} className="text-white hover:text-indigo-400 font-medium transition-colors">
          {problem.id}. {problem.title}
        </Link>
      </td>
      <td className="px-6 py-4">
        <div className="flex gap-2 flex-wrap">
          {(Array.isArray(problem.tags) 
            ? problem.tags 
            : typeof problem.tags === 'string' 
              ? problem.tags.split(',') 
              : []
          ).map((tag, idx) => (
            <span key={idx} className="bg-slate-700 text-slate-300 text-xs px-2 py-1 rounded-md">{tag.trim()}</span>
          ))}
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">
        {problem.acceptanceRate ? `${problem.acceptanceRate}%` : (problem.acceptance || '50%')}
      </td>
      <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${getDifficultyColor(problem.difficulty)}`}>
        {problem.difficulty}
      </td>
    </tr>
  );
};

export default ProblemRow;
