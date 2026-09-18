import { useState, useEffect } from 'react';
import { getProblems } from '../api/coding';
import { useAuth } from '../context/AuthContext';
import ProblemRow from '../components/ProblemRow';
import { Search, Flame } from 'lucide-react';

const CodingProblems = () => {
  const { user } = useAuth();
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchProblems = async () => {
      const res = await getProblems();
      setProblems(res.data);
      setLoading(false);
    };
    fetchProblems();
  }, []);

  const filteredProblems = problems.filter(p => {
    const matchesFilter = filter === 'All' || p.difficulty === filter;
    const matchesSearch = p.title.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Coding Problems</h1>
          <p className="text-slate-400">Master algorithms and prepare for technical interviews.</p>
        </div>
        <div className="flex gap-3 items-center">
          {user?.role === 'ADMIN' && (
            <a
              href="/admin"
              className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-3 rounded-xl font-semibold shadow-md transition-all text-sm"
            >
              + Add New Problem
            </a>
          )}
          <div className="flex gap-4 items-center bg-slate-800 p-4 rounded-xl border border-slate-700">
            <div className="text-center px-4 border-r border-slate-700">
              <div className="text-2xl font-bold text-white">{problems.length}</div>
              <div className="text-xs text-slate-400">Total</div>
            </div>
            <div className="text-center px-4 flex flex-col items-center">
              <div className="flex items-center gap-1 text-2xl font-bold text-orange-400"><Flame className="w-5 h-5"/> 7</div>
              <div className="text-xs text-slate-400">Day Streak</div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-slate-800 border border-slate-700 rounded-xl overflow-hidden shadow-lg">
        <div className="p-4 border-b border-slate-700 flex flex-col sm:flex-row justify-between gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500 w-5 h-5" />
            <input 
              type="text" 
              placeholder="Search problems..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 pr-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-indigo-500 w-full sm:w-64"
            />
          </div>
          <div className="flex bg-slate-900 rounded-lg p-1 border border-slate-700">
            {['All', 'Easy', 'Medium', 'Hard'].map(f => (
              <button 
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${filter === f ? 'bg-slate-700 text-white' : 'text-slate-400 hover:text-white'}`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-900/50 border-b border-slate-700">
                <th className="px-6 py-4 text-sm font-medium text-slate-400">Status</th>
                <th className="px-6 py-4 text-sm font-medium text-slate-400">Title</th>
                <th className="px-6 py-4 text-sm font-medium text-slate-400">Tags</th>
                <th className="px-6 py-4 text-sm font-medium text-slate-400">Acceptance</th>
                <th className="px-6 py-4 text-sm font-medium text-slate-400">Difficulty</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan="5" className="text-center py-8 text-slate-400">Loading problems...</td></tr>
              ) : (
                filteredProblems.map(p => <ProblemRow key={p.id} problem={p} />)
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CodingProblems;
