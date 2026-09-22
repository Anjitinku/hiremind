import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { CheckCircle, Brain, Target, ArrowRight, Shield, Code, Briefcase } from 'lucide-react';

const Home = () => {
  const { user, isAuthenticated } = useAuth();

  return (
    <div>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-slate-900 pt-20 pb-32">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-900/40 via-slate-900 to-slate-900"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight mb-6">
            Land Your Dream Job with <br/><span className="bg-gradient-to-r from-indigo-400 to-orange-400 bg-clip-text text-transparent">AI-Powered Precision</span>
          </h1>
          <p className="mt-4 text-xl text-slate-300 max-w-3xl mx-auto mb-10">
            Master coding interviews, optimize your resume with ATS insights, and get matched with top tech companies—all in one unified platform.
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            {isAuthenticated ? (
              <>
                {user?.role === 'ADMIN' ? (
                  <Link to="/admin" className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all shadow-[0_0_20px_rgba(147,51,234,0.4)] flex items-center gap-2">
                    <Shield className="w-5 h-5" /> Open Admin Panel
                  </Link>
                ) : user?.role === 'RECRUITER' ? (
                  <Link to="/recruiter" className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all shadow-[0_0_20px_rgba(79,70,229,0.4)] flex items-center gap-2">
                    <Briefcase className="w-5 h-5" /> Recruiter Dashboard
                  </Link>
                ) : (
                  <Link to="/problems" className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all shadow-[0_0_20px_rgba(79,70,229,0.4)] flex items-center gap-2">
                    <Code className="w-5 h-5" /> Practice Coding
                  </Link>
                )}
                <Link to="/jobs" className="bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all">
                  Explore Jobs
                </Link>
              </>
            ) : (
              <>
                <Link to="/register" className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all shadow-[0_0_20px_rgba(79,70,229,0.4)]">
                  Get Started for Free
                </Link>
                <Link to="/jobs" className="bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all">
                  Explore Jobs
                </Link>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Stats Row */}
      <section className="border-y border-slate-800 bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-white mb-2">10K+</div>
              <div className="text-slate-400 uppercase tracking-wider text-sm font-semibold">Companies Hiring</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-white mb-2">50K+</div>
              <div className="text-slate-400 uppercase tracking-wider text-sm font-semibold">Candidates Placed</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-white mb-2">94%</div>
              <div className="text-slate-400 uppercase tracking-wider text-sm font-semibold">Interview Success Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">Everything You Need to Succeed</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">Our AI tools give you the unfair advantage in today's competitive job market.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-slate-800 p-8 rounded-2xl border border-slate-700 hover:border-indigo-500 transition-colors group">
              <div className="bg-indigo-500/10 w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <CheckCircle className="w-8 h-8 text-indigo-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">ATS Resume Checker</h3>
              <p className="text-slate-400">Score your resume against real job descriptions. Uncover missing keywords and format issues before recruiters see them.</p>
            </div>
            <div className="bg-slate-800 p-8 rounded-2xl border border-slate-700 hover:border-orange-500 transition-colors group">
              <div className="bg-orange-500/10 w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Brain className="w-8 h-8 text-orange-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">AI Mock Interviews</h3>
              <p className="text-slate-400">Practice behavioral and technical interviews with our voice-enabled AI. Get instant, actionable feedback on your answers.</p>
            </div>
            <div className="bg-slate-800 p-8 rounded-2xl border border-slate-700 hover:border-green-500 transition-colors group">
              <div className="bg-green-500/10 w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Target className="w-8 h-8 text-green-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Smart Career Match</h3>
              <p className="text-slate-400">Let our algorithm match your skills and coding performance with companies that are actually looking for your profile.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-indigo-600 relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl font-bold text-white mb-6">Ready to Accelerate Your Career?</h2>
          <p className="text-indigo-100 text-lg mb-8">Join thousands of developers who have landed their dream roles using HireMind AI.</p>
          
          {isAuthenticated ? (
            user?.role === 'ADMIN' ? (
              <Link to="/admin" className="inline-flex items-center gap-2 bg-white text-purple-700 px-8 py-4 rounded-xl font-bold text-lg hover:bg-slate-100 transition-colors shadow-lg">
                Go to Admin Panel <ArrowRight className="w-5 h-5" />
              </Link>
            ) : user?.role === 'RECRUITER' ? (
              <Link to="/recruiter" className="inline-flex items-center gap-2 bg-white text-indigo-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-slate-100 transition-colors shadow-lg">
                Go to Recruiter Dashboard <ArrowRight className="w-5 h-5" />
              </Link>
            ) : (
              <Link to="/problems" className="inline-flex items-center gap-2 bg-white text-indigo-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-slate-100 transition-colors shadow-lg">
                Start Coding Practice <ArrowRight className="w-5 h-5" />
              </Link>
            )
          ) : (
            <Link to="/register" className="inline-flex items-center gap-2 bg-white text-indigo-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-slate-100 transition-colors shadow-lg">
              Create Free Account <ArrowRight className="w-5 h-5" />
            </Link>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;
