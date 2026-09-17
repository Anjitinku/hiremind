import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Brain } from 'lucide-react';

const Register = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'CANDIDATE' });
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    register(formData);
    navigate('/');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-slate-800 p-10 rounded-2xl border border-slate-700 shadow-xl">
        <div className="flex flex-col items-center">
          <Brain className="w-12 h-12 text-indigo-500 mb-4" />
          <h2 className="text-center text-3xl font-extrabold text-white">Create an account</h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <input
              type="text"
              required
              className="appearance-none rounded-lg block w-full px-3 py-3 border border-slate-600 bg-slate-700 placeholder-slate-400 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm"
              placeholder="Full Name"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
            <input
              type="email"
              required
              className="appearance-none rounded-lg block w-full px-3 py-3 border border-slate-600 bg-slate-700 placeholder-slate-400 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm"
              placeholder="Email address"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
            <input
              type="password"
              required
              className="appearance-none rounded-lg block w-full px-3 py-3 border border-slate-600 bg-slate-700 placeholder-slate-400 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm"
              placeholder="Password"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
            />
            <div className="flex justify-center gap-4 py-2">
              <label className="flex items-center text-white text-sm cursor-pointer">
                <input type="radio" name="role" value="CANDIDATE" checked={formData.role === 'CANDIDATE'} onChange={(e) => setFormData({...formData, role: e.target.value})} className="mr-2" /> Candidate
              </label>
              <label className="flex items-center text-white text-sm cursor-pointer">
                <input type="radio" name="role" value="RECRUITER" checked={formData.role === 'RECRUITER'} onChange={(e) => setFormData({...formData, role: e.target.value})} className="mr-2" /> Recruiter
              </label>
            </div>
          </div>

          <button type="submit" className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 transition-colors">
            Register
          </button>
          
          <div className="text-center">
            <Link to="/login" className="font-medium text-indigo-400 hover:text-indigo-300 text-sm">
              Already have an account? Log in
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
