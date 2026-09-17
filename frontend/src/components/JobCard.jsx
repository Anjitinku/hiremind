import { Briefcase, MapPin, DollarSign, Clock } from 'lucide-react';
import toast from 'react-hot-toast';

const JobCard = ({ job }) => {
  const handleApply = () => {
    toast.success(`Successfully applied to ${job.company}!`);
  };

  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 hover:border-indigo-500 transition-colors shadow-sm group">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-4">
          <img 
            src={`https://api.dicebear.com/7.x/initials/svg?seed=${job.company}&backgroundColor=6366f1`} 
            alt={job.company} 
            className="w-12 h-12 rounded-lg"
          />
          <div>
            <h3 className="text-lg font-bold text-white group-hover:text-indigo-400 transition-colors">{job.title}</h3>
            <p className="text-slate-400 text-sm">{job.company}</p>
          </div>
        </div>
        <span className="bg-indigo-900 text-indigo-300 text-xs px-2 py-1 rounded-full font-medium">
          {job.type}
        </span>
      </div>
      
      <div className="grid grid-cols-2 gap-3 mb-4 text-sm text-slate-300">
        <div className="flex items-center gap-1.5"><MapPin className="w-4 h-4 text-slate-500" /> {job.location}</div>
        <div className="flex items-center gap-1.5"><DollarSign className="w-4 h-4 text-slate-500" /> {job.salary}</div>
        <div className="flex items-center gap-1.5"><Clock className="w-4 h-4 text-slate-500" /> {job.postedAt}</div>
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        {job.skills.map((skill, i) => (
          <span key={i} className="bg-slate-700 text-slate-300 text-xs px-2 py-1 rounded-md">
            {skill}
          </span>
        ))}
      </div>

      <button onClick={handleApply} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg font-medium transition-colors">
        Apply Now
      </button>
    </div>
  );
};

export default JobCard;
