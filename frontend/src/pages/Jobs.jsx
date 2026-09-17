import { useState, useEffect } from 'react';
import { getJobs } from '../api/jobs';
import JobCard from '../components/JobCard';
import { Search, Filter } from 'lucide-react';

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      const res = await getJobs();
      setJobs(res.data);
      setLoading(false);
    };
    fetchJobs();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex gap-8">
      {/* Sidebar Filters */}
      <div className="hidden md:block w-64 shrink-0">
        <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 sticky top-24">
          <div className="flex items-center gap-2 mb-6 text-lg font-bold text-white">
            <Filter className="w-5 h-5" /> Filters
          </div>
          
          <div className="space-y-6">
            <div>
              <h4 className="text-sm font-semibold text-slate-300 mb-3">Job Type</h4>
              <div className="space-y-2">
                {['Full-time', 'Part-time', 'Contract', 'Internship'].map(type => (
                  <label key={type} className="flex items-center gap-2 text-sm text-slate-400 cursor-pointer hover:text-white">
                    <input type="checkbox" className="rounded bg-slate-900 border-slate-600 text-indigo-600 focus:ring-indigo-500" />
                    {type}
                  </label>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="text-sm font-semibold text-slate-300 mb-3">Location</h4>
              <div className="space-y-2">
                {['Remote', 'New York, NY', 'San Francisco, CA', 'London, UK'].map(loc => (
                  <label key={loc} className="flex items-center gap-2 text-sm text-slate-400 cursor-pointer hover:text-white">
                    <input type="checkbox" className="rounded bg-slate-900 border-slate-600 text-indigo-600 focus:ring-indigo-500" />
                    {loc}
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Find Your Next Role</h1>
          <p className="text-slate-400">Discover opportunities that match your verified skills.</p>
        </div>

        <div className="relative mb-8">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-500 w-6 h-6" />
          <input 
            type="text" 
            placeholder="Search by title, company, or skills..." 
            className="w-full pl-12 pr-4 py-4 bg-slate-800 border border-slate-700 rounded-xl text-white text-lg focus:outline-none focus:border-indigo-500 shadow-sm"
          />
        </div>

        {loading ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-pulse">
            {[1,2,3,4].map(i => <div key={i} className="h-64 bg-slate-800 rounded-xl border border-slate-700"></div>)}
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {jobs.map(job => <JobCard key={job.id} job={job} />)}
          </div>
        )}
      </div>
    </div>
  );
};

export default Jobs;
