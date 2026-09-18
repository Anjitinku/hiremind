import { useState, useEffect } from 'react';
import { getAdminStats, getAllUsers, deleteUser } from '../api/admin';
import { getProblems, createProblem, deleteProblem } from '../api/coding';
import { Users, Briefcase, Code, FileText, Plus, Trash2, Shield, CheckCircle2, AlertCircle } from 'lucide-react';
import toast from 'react-hot-toast';

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [problems, setProblems] = useState([]);
  const [users, setUsers] = useState([]);
  const [activeTab, setActiveTab] = useState('problems');
  const [loading, setLoading] = useState(true);

  // New problem form state
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    title: '',
    difficulty: 'EASY',
    description: '',
    examples: '',
    constraints: '',
    tags: '',
    starterCode: '// Write your solution here\nfunction solution() {\n\n}',
    acceptanceRate: 50.0
  });

  const loadData = async () => {
    setLoading(true);
    try {
      const [statsRes, probRes, usersRes] = await Promise.all([
        getAdminStats(),
        getProblems(),
        getAllUsers()
      ]);
      setStats(statsRes.data);
      setProblems(probRes.data || []);
      setUsers(usersRes.data || []);
    } catch (err) {
      console.error(err);
      toast.error('Failed to load admin data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleCreateProblem = async (e) => {
    e.preventDefault();
    if (!form.title || !form.description) {
      toast.error('Title and description are required');
      return;
    }
    try {
      await createProblem(form);
      toast.success('Coding Problem added successfully!');
      setShowForm(false);
      setForm({
        title: '',
        difficulty: 'EASY',
        description: '',
        examples: '',
        constraints: '',
        tags: '',
        starterCode: '// Write your solution here\nfunction solution() {\n\n}',
        acceptanceRate: 50.0
      });
      loadData();
    } catch (err) {
      toast.error('Failed to create problem');
    }
  };

  const handleDeleteProblem = async (id, title) => {
    if (!window.confirm(`Are you sure you want to delete "${title}"?`)) return;
    try {
      await deleteProblem(id);
      toast.success('Problem deleted!');
      setProblems(problems.filter(p => p.id !== id));
      if (stats) setStats({ ...stats, totalProblems: stats.totalProblems - 1 });
    } catch (err) {
      toast.error('Failed to delete problem');
    }
  };

  const handleDeleteUser = async (id, email) => {
    if (!window.confirm(`Delete user ${email}?`)) return;
    try {
      await deleteUser(id);
      toast.success('User deleted!');
      setUsers(users.filter(u => u.id !== id));
      if (stats) setStats({ ...stats, totalUsers: stats.totalUsers - 1 });
    } catch (err) {
      toast.error('Failed to delete user');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-indigo-500/20 rounded-xl text-indigo-400">
              <Shield className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">Admin Control Center</h1>
              <p className="text-slate-400 text-sm">Add coding challenges, manage questions, and oversee the entire HireMind platform.</p>
            </div>
          </div>
        </div>

        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl font-medium shadow-lg transition-all"
        >
          <Plus className="w-5 h-5" />
          {showForm ? 'Close Form' : 'Add New Coding Question'}
        </button>
      </div>

      {/* Stats Cards */}
      {stats && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-slate-800 border border-slate-700 p-5 rounded-2xl">
            <div className="flex items-center justify-between">
              <span className="text-slate-400 text-sm">Coding Problems</span>
              <Code className="w-5 h-5 text-indigo-400" />
            </div>
            <div className="text-3xl font-extrabold text-white mt-2">{stats.totalProblems}</div>
          </div>
          <div className="bg-slate-800 border border-slate-700 p-5 rounded-2xl">
            <div className="flex items-center justify-between">
              <span className="text-slate-400 text-sm">Registered Users</span>
              <Users className="w-5 h-5 text-cyan-400" />
            </div>
            <div className="text-3xl font-extrabold text-white mt-2">{stats.totalUsers}</div>
          </div>
          <div className="bg-slate-800 border border-slate-700 p-5 rounded-2xl">
            <div className="flex items-center justify-between">
              <span className="text-slate-400 text-sm">Active Jobs</span>
              <Briefcase className="w-5 h-5 text-emerald-400" />
            </div>
            <div className="text-3xl font-extrabold text-white mt-2">{stats.totalJobs}</div>
          </div>
          <div className="bg-slate-800 border border-slate-700 p-5 rounded-2xl">
            <div className="flex items-center justify-between">
              <span className="text-slate-400 text-sm">Job Applications</span>
              <FileText className="w-5 h-5 text-amber-400" />
            </div>
            <div className="text-3xl font-extrabold text-white mt-2">{stats.totalApplications}</div>
          </div>
        </div>
      )}

      {/* New Question Form Modal / Panel */}
      {showForm && (
        <div className="bg-slate-800 border border-indigo-500/40 rounded-2xl p-6 mb-8 shadow-2xl animate-fade-in">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <Plus className="w-5 h-5 text-indigo-400" /> Create a New Coding Problem
          </h2>
          <form onSubmit={handleCreateProblem} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-2">
                <label className="block text-xs font-semibold text-slate-300 mb-1">Problem Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Merge Two Sorted Lists"
                  value={form.title}
                  onChange={e => setForm({ ...form, title: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Difficulty *</label>
                <select
                  value={form.difficulty}
                  onChange={e => setForm({ ...form, difficulty: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-indigo-500"
                >
                  <option value="EASY">Easy</option>
                  <option value="MEDIUM">Medium</option>
                  <option value="HARD">Hard</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Tags (comma-separated)</label>
                <input
                  type="text"
                  placeholder="e.g. Array, Two Pointers, Dynamic Programming"
                  value={form.tags}
                  onChange={e => setForm({ ...form, tags: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Target Acceptance Rate (%)</label>
                <input
                  type="number"
                  step="0.1"
                  placeholder="e.g. 52.4"
                  value={form.acceptanceRate}
                  onChange={e => setForm({ ...form, acceptanceRate: parseFloat(e.target.value) || 50.0 })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Description *</label>
              <textarea
                required
                rows={3}
                placeholder="Detailed problem statement..."
                value={form.description}
                onChange={e => setForm({ ...form, description: e.target.value })}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Examples</label>
                <textarea
                  rows={3}
                  placeholder="Input: nums = [1,2,3], target = 4&#10;Output: [0,2]"
                  value={form.examples}
                  onChange={e => setForm({ ...form, examples: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2.5 text-white font-mono text-sm focus:outline-none focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Constraints</label>
                <textarea
                  rows={3}
                  placeholder="1 <= nums.length <= 10^5&#10;-10^9 <= target <= 10^9"
                  value={form.constraints}
                  onChange={e => setForm({ ...form, constraints: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2.5 text-white font-mono text-sm focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Starter Code Template</label>
              <textarea
                rows={3}
                value={form.starterCode}
                onChange={e => setForm({ ...form, starterCode: e.target.value })}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2.5 text-white font-mono text-sm focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="px-4 py-2 rounded-lg text-slate-400 hover:text-white bg-slate-700/50 hover:bg-slate-700 text-sm font-medium"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold shadow-md"
              >
                Save Coding Question
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Tabs */}
      <div className="flex gap-4 border-b border-slate-700 mb-6">
        <button
          onClick={() => setActiveTab('problems')}
          className={`pb-3 text-sm font-semibold flex items-center gap-2 border-b-2 transition-all ${
            activeTab === 'problems' ? 'border-indigo-500 text-indigo-400' : 'border-transparent text-slate-400 hover:text-white'
          }`}
        >
          <Code className="w-4 h-4" /> Coding Problems ({problems.length})
        </button>
        <button
          onClick={() => setActiveTab('users')}
          className={`pb-3 text-sm font-semibold flex items-center gap-2 border-b-2 transition-all ${
            activeTab === 'users' ? 'border-indigo-500 text-indigo-400' : 'border-transparent text-slate-400 hover:text-white'
          }`}
        >
          <Users className="w-4 h-4" /> Users ({users.length})
        </button>
      </div>

      {/* Tab 1: Coding Problems Table */}
      {activeTab === 'problems' && (
        <div className="bg-slate-800 border border-slate-700 rounded-2xl overflow-hidden shadow-lg">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-900/60 border-b border-slate-700 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  <th className="px-6 py-4">ID</th>
                  <th className="px-6 py-4">Title</th>
                  <th className="px-6 py-4">Difficulty</th>
                  <th className="px-6 py-4">Tags</th>
                  <th className="px-6 py-4">Acceptance</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700/50">
                {loading ? (
                  <tr><td colSpan="6" className="text-center py-8 text-slate-400">Loading problems...</td></tr>
                ) : problems.length === 0 ? (
                  <tr><td colSpan="6" className="text-center py-8 text-slate-400">No problems found. Click "Add New Coding Question" above!</td></tr>
                ) : (
                  problems.map(p => (
                    <tr key={p.id} className="hover:bg-slate-700/30 transition-colors">
                      <td className="px-6 py-4 font-mono text-slate-400 text-sm">#{p.id}</td>
                      <td className="px-6 py-4 font-medium text-white">{p.title}</td>
                      <td className="px-6 py-4">
                        <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-bold ${
                          p.difficulty === 'EASY' || p.difficulty === 'Easy' ? 'bg-green-500/20 text-green-400' :
                          p.difficulty === 'MEDIUM' || p.difficulty === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' :
                          'bg-red-500/20 text-red-400'
                        }`}>
                          {p.difficulty}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-xs text-slate-400">{p.tags || 'General'}</td>
                      <td className="px-6 py-4 text-sm text-slate-300">{p.acceptanceRate ? `${p.acceptanceRate}%` : '50%'}</td>
                      <td className="px-6 py-4 text-right">
                        <button
                          onClick={() => handleDeleteProblem(p.id, p.title)}
                          className="p-2 text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 rounded-lg transition-colors"
                          title="Delete Problem"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 2: Users Table */}
      {activeTab === 'users' && (
        <div className="bg-slate-800 border border-slate-700 rounded-2xl overflow-hidden shadow-lg">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-900/60 border-b border-slate-700 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  <th className="px-6 py-4">User</th>
                  <th className="px-6 py-4">Email</th>
                  <th className="px-6 py-4">Role</th>
                  <th className="px-6 py-4">Created</th>
                  <th className="px-6 py-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700/50">
                {users.map(u => (
                  <tr key={u.id} className="hover:bg-slate-700/30 transition-colors">
                    <td className="px-6 py-4 text-white font-medium">{u.name}</td>
                    <td className="px-6 py-4 text-slate-300 text-sm font-mono">{u.email}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-bold ${
                        u.role === 'ADMIN' ? 'bg-purple-500/20 text-purple-400' :
                        u.role === 'RECRUITER' ? 'bg-blue-500/20 text-blue-400' :
                        'bg-emerald-500/20 text-emerald-400'
                      }`}>
                        {u.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-slate-400 text-xs">
                      {u.createdAt ? new Date(u.createdAt).toLocaleDateString() : 'Active'}
                    </td>
                    <td className="px-6 py-4 text-right">
                      {u.role !== 'ADMIN' && (
                        <button
                          onClick={() => handleDeleteUser(u.id, u.email)}
                          className="p-2 text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 rounded-lg transition-colors"
                          title="Delete User"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;