import { useState } from 'react';
import { Plus, Pencil, Trash2, Users, Briefcase, CalendarCheck, UserCheck, X, ChevronDown } from 'lucide-react';
import toast from 'react-hot-toast';

const MOCK_JOBS = [
  { id: 1, title: 'Senior React Developer', applicants: 34, status: 'Active', posted: '2024-03-01' },
  { id: 2, title: 'Backend Engineer (Node.js)', applicants: 21, status: 'Active', posted: '2024-02-28' },
  { id: 3, title: 'DevOps Engineer', applicants: 12, status: 'Closed', posted: '2024-02-15' },
  { id: 4, title: 'Data Scientist', applicants: 47, status: 'Active', posted: '2024-03-05' },
];

const MOCK_APPLICANTS = [
  { id: 1, name: 'Alex Johnson', role: 'Senior React Developer', ats: 72, interview: 82, coding: 68, combined: 74, status: 'SHORTLISTED', avatar: 'Alex' },
  { id: 2, name: 'Priya Sharma', role: 'Senior React Developer', ats: 85, interview: 90, coding: 78, combined: 85, status: 'IN_REVIEW', avatar: 'Priya' },
  { id: 3, name: 'James Lee', role: 'Backend Engineer', ats: 61, interview: 70, coding: 88, combined: 73, status: 'APPLIED', avatar: 'James' },
  { id: 4, name: 'Sara Müller', role: 'Data Scientist', ats: 90, interview: 88, coding: 92, combined: 90, status: 'OFFER', avatar: 'Sara' },
  { id: 5, name: 'Ravi Patel', role: 'Backend Engineer', ats: 55, interview: 62, coding: 58, combined: 58, status: 'REJECTED', avatar: 'Ravi' },
];

const STATS = [
  { label: 'Active Jobs', value: '4', icon: <Briefcase className="w-6 h-6 text-indigo-400" />, bg: 'bg-indigo-500/10' },
  { label: 'Total Applicants', value: '114', icon: <Users className="w-6 h-6 text-blue-400" />, bg: 'bg-blue-500/10' },
  { label: 'Interviews Scheduled', value: '18', icon: <CalendarCheck className="w-6 h-6 text-yellow-400" />, bg: 'bg-yellow-500/10' },
  { label: 'Hires This Month', value: '3', icon: <UserCheck className="w-6 h-6 text-green-400" />, bg: 'bg-green-500/10' },
];

const STATUS_COLOR = {
  SHORTLISTED: 'bg-indigo-500/20 text-indigo-300',
  IN_REVIEW:   'bg-yellow-500/20 text-yellow-300',
  APPLIED:     'bg-blue-500/20 text-blue-300',
  OFFER:       'bg-green-500/20 text-green-300',
  REJECTED:    'bg-red-500/20 text-red-300',
};

const SCORE_COLOR = (s) => s >= 80 ? 'text-green-400' : s >= 60 ? 'text-yellow-400' : 'text-red-400';

const EMPTY_JOB = { title: '', company: 'My Company', description: '', location: '', jobType: 'FULL_TIME', salaryMin: '', salaryMax: '', skillsRequired: '' };

export default function RecruiterDashboard() {
  const [activeTab, setActiveTab] = useState('Job Postings');
  const [jobs, setJobs] = useState(MOCK_JOBS);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState(EMPTY_JOB);
  const [sortBy, setSortBy] = useState('combined');

  const handlePost = (e) => {
    e.preventDefault();
    if (!form.title.trim()) { toast.error('Job title is required'); return; }
    const newJob = { id: Date.now(), title: form.title, applicants: 0, status: 'Active', posted: new Date().toISOString().split('T')[0] };
    setJobs([newJob, ...jobs]);
    setForm(EMPTY_JOB);
    setShowModal(false);
    toast.success('Job posted successfully!');
  };

  const handleDelete = (id) => {
    setJobs(jobs.filter((j) => j.id !== id));
    toast.success('Job removed.');
  };

  const sortedApplicants = [...MOCK_APPLICANTS].sort((a, b) => b[sortBy] - a[sortBy]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 w-full">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-1">Recruiter Dashboard</h1>
            <p className="text-slate-400">Manage your job postings and find top candidates.</p>
          </div>
          <button onClick={() => setShowModal(true)} className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold px-5 py-2.5 rounded-xl transition-colors shadow-lg">
            <Plus className="w-4 h-4" /> Post New Job
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {STATS.map((s) => (
            <div key={s.label} className="bg-slate-800 rounded-2xl p-5 shadow-xl flex items-center gap-4">
              <div className={`${s.bg} p-3 rounded-xl`}>{s.icon}</div>
              <div>
                <p className="text-2xl font-bold text-white">{s.value}</p>
                <p className="text-slate-400 text-xs">{s.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-slate-800 p-1 rounded-xl mb-6 w-fit">
          {['Job Postings', 'Applicants', 'Analytics'].map((tab) => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              className={`px-5 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === tab ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-white'}`}>
              {tab}
            </button>
          ))}
        </div>

        {activeTab === 'Job Postings' && (
          <div className="bg-slate-800 rounded-2xl shadow-xl overflow-hidden">
            <table className="w-full">
              <thead className="bg-slate-700/50">
                <tr>
                  {['Job Title', 'Posted', 'Applicants', 'Status', 'Actions'].map((h) => (
                    <th key={h} className="text-left text-slate-400 text-sm font-medium px-6 py-3">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {jobs.map((job) => (
                  <tr key={job.id} className="border-t border-slate-700/50 hover:bg-slate-700/30 transition-colors">
                    <td className="px-6 py-4 text-white font-medium">{job.title}</td>
                    <td className="px-6 py-4 text-slate-400 text-sm">{job.posted}</td>
                    <td className="px-6 py-4 text-slate-300">{job.applicants}</td>
                    <td className="px-6 py-4">
                      <span className={`text-xs font-medium px-2.5 py-1 rounded-lg ${job.status === 'Active' ? 'bg-green-500/20 text-green-400' : 'bg-slate-600 text-slate-400'}`}>
                        {job.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button onClick={() => toast('Edit coming soon!')} className="p-1.5 bg-slate-700 hover:bg-slate-600 text-slate-300 rounded-lg transition-colors">
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button onClick={() => handleDelete(job.id)} className="p-1.5 bg-red-500/20 hover:bg-red-500/40 text-red-400 rounded-lg transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'Applicants' && (
          <div className="bg-slate-800 rounded-2xl shadow-xl overflow-hidden">
            <div className="p-4 border-b border-slate-700 flex items-center gap-3">
              <span className="text-slate-400 text-sm">Sort by:</span>
              <div className="relative">
                <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}
                  className="bg-slate-700 text-white text-sm px-3 py-1.5 rounded-lg border border-slate-600 appearance-none pr-8 focus:outline-none focus:border-indigo-500">
                  <option value="combined">Combined Score</option>
                  <option value="ats">ATS Score</option>
                  <option value="interview">Interview Score</option>
                  <option value="coding">Coding Score</option>
                </select>
                <ChevronDown className="w-4 h-4 text-slate-400 absolute right-2 top-2 pointer-events-none" />
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-700/50">
                  <tr>
                    {['Candidate', 'Applied Role', 'ATS', 'Interview', 'Coding', 'Combined', 'Status'].map((h) => (
                      <th key={h} className="text-left text-slate-400 text-sm font-medium px-5 py-3">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {sortedApplicants.map((a) => (
                    <tr key={a.id} className="border-t border-slate-700/50 hover:bg-slate-700/30 transition-colors">
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${a.avatar}`} alt="" className="w-8 h-8 rounded-full bg-slate-700" />
                          <span className="text-white font-medium text-sm">{a.name}</span>
                        </div>
                      </td>
                      <td className="px-5 py-4 text-slate-400 text-sm">{a.role}</td>
                      <td className={`px-5 py-4 font-bold text-sm ${SCORE_COLOR(a.ats)}`}>{a.ats}</td>
                      <td className={`px-5 py-4 font-bold text-sm ${SCORE_COLOR(a.interview)}`}>{a.interview}</td>
                      <td className={`px-5 py-4 font-bold text-sm ${SCORE_COLOR(a.coding)}`}>{a.coding}</td>
                      <td className={`px-5 py-4 font-bold text-sm ${SCORE_COLOR(a.combined)}`}>{a.combined}</td>
                      <td className="px-5 py-4">
                        <span className={`text-xs font-medium px-2.5 py-1 rounded-lg ${STATUS_COLOR[a.status]}`}>
                          {a.status.replace('_', ' ')}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'Analytics' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[['Applications This Week', '34', '+12% vs last week'], ['Average ATS Score', '71', 'Of all applicants'], ['Offer Acceptance Rate', '78%', 'Industry avg: 65%']].map(([title, val, sub]) => (
              <div key={title} className="bg-slate-800 rounded-2xl p-6 shadow-xl text-center">
                <p className="text-slate-400 text-sm mb-2">{title}</p>
                <p className="text-4xl font-bold text-white mb-1">{val}</p>
                <p className="text-green-400 text-xs">{sub}</p>
              </div>
            ))}
          </div>
        )}
      {/* Post Job Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-slate-800 rounded-2xl shadow-2xl w-full max-w-lg border border-slate-700">
            <div className="flex items-center justify-between p-6 border-b border-slate-700">
              <h2 className="text-white font-bold text-lg">Post a New Job</h2>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-white transition-colors"><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handlePost} className="p-6 space-y-4">
              {[['Job Title *', 'title', 'e.g. Senior React Developer'], ['Company', 'company', 'Your company name'], ['Location', 'location', 'e.g. Bangalore / Remote'], ['Skills Required', 'skillsRequired', 'e.g. React, Node.js, TypeScript']].map(([label, key, ph]) => (
                <div key={key}>
                  <label className="block text-slate-300 text-sm mb-1">{label}</label>
                  <input value={form[key]} onChange={(e) => setForm({ ...form, [key]: e.target.value })} placeholder={ph}
                    className="w-full bg-slate-700 border border-slate-600 text-white rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-indigo-500" />
                </div>
              ))}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 text-sm mb-1">Min Salary (₹K)</label>
                  <input type="number" value={form.salaryMin} onChange={(e) => setForm({ ...form, salaryMin: e.target.value })} placeholder="e.g. 800"
                    className="w-full bg-slate-700 border border-slate-600 text-white rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-indigo-500" />
                </div>
                <div>
                  <label className="block text-slate-300 text-sm mb-1">Max Salary (₹K)</label>
                  <input type="number" value={form.salaryMax} onChange={(e) => setForm({ ...form, salaryMax: e.target.value })} placeholder="e.g. 1400"
                    className="w-full bg-slate-700 border border-slate-600 text-white rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-indigo-500" />
                </div>
              </div>
              <div>
                <label className="block text-slate-300 text-sm mb-1">Job Type</label>
                <select value={form.jobType} onChange={(e) => setForm({ ...form, jobType: e.target.value })}
                  className="w-full bg-slate-700 border border-slate-600 text-white rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-indigo-500">
                  {['FULL_TIME', 'PART_TIME', 'CONTRACT', 'REMOTE'].map((t) => (
                    <option key={t} value={t}>{t.replace('_', ' ')}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-slate-300 text-sm mb-1">Job Description</label>
                <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={3} placeholder="Describe the role, responsibilities and requirements..."
                  className="w-full bg-slate-700 border border-slate-600 text-white rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-indigo-500 resize-none" />
              </div>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setShowModal(false)} className="flex-1 bg-slate-700 hover:bg-slate-600 text-white font-semibold py-3 rounded-xl transition-colors">Cancel</button>
                <button type="submit" className="flex-1 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3 rounded-xl transition-colors">Post Job</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
