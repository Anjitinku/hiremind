import { useState } from 'react';
import { TrendingUp, DollarSign, Lightbulb, Building2, RefreshCw, ChevronRight } from 'lucide-react';
import ScoreRing from '../components/ScoreRing';
import { Link } from 'react-router-dom';

const SCORES = { ats: 72, interview: 82, coding: 68 };
const COMBINED = Math.round(SCORES.ats * 0.3 + SCORES.interview * 0.4 + SCORES.coding * 0.3);

const MATCHED_COMPANIES = [
  { name: 'Stripe', logo: 'https://api.dicebear.com/7.x/initials/svg?seed=Stripe&backgroundColor=635bff', match: 91, role: 'Frontend Engineer', salaryMin: 160, salaryMax: 220 },
  { name: 'Airbnb', logo: 'https://api.dicebear.com/7.x/initials/svg?seed=Airbnb&backgroundColor=ff5a5f', match: 87, role: 'Full Stack Developer', salaryMin: 155, salaryMax: 215 },
  { name: 'Shopify', logo: 'https://api.dicebear.com/7.x/initials/svg?seed=Shopify&backgroundColor=96bf48', match: 84, role: 'React Developer', salaryMin: 140, salaryMax: 200 },
  { name: 'Notion', logo: 'https://api.dicebear.com/7.x/initials/svg?seed=Notion&backgroundColor=000000', match: 80, role: 'Software Engineer', salaryMin: 130, salaryMax: 190 },
];

const SKILLS_TO_LEARN = [
  { skill: 'Docker & Containerization', relevance: 95, color: 'bg-blue-500' },
  { skill: 'System Design', relevance: 88, color: 'bg-purple-500' },
  { skill: 'TypeScript Advanced', relevance: 82, color: 'bg-indigo-500' },
  { skill: 'CI/CD Pipelines', relevance: 79, color: 'bg-orange-500' },
  { skill: 'AWS Cloud Basics', relevance: 74, color: 'bg-yellow-500' },
  { skill: 'GraphQL', relevance: 68, color: 'bg-pink-500' },
];

const TRENDING_ROLES = [
  { role: 'AI/ML Engineer', growth: '+42%', icon: '🤖' },
  { role: 'Full Stack Developer', growth: '+28%', icon: '💻' },
  { role: 'DevOps Engineer', growth: '+35%', icon: '⚙️' },
];

export default function CareerMatch() {
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 2000);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 w-full">
      {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-1">Career Match</h1>
            <p className="text-slate-400">AI-powered insights based on your ATS, Coding & Interview scores.</p>
          </div>
          <button
            onClick={handleRefresh}
            className={`flex items-center gap-2 bg-slate-700 hover:bg-slate-600 text-white text-sm font-medium px-4 py-2 rounded-xl transition-colors ${refreshing ? 'opacity-60 cursor-not-allowed' : ''}`}
            disabled={refreshing}
          >
            <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
            {refreshing ? 'Refreshing...' : 'Refresh Analysis'}
          </button>
        </div>

        {/* Combined Score + Breakdown */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-slate-800 rounded-2xl p-8 flex flex-col items-center shadow-xl">
            <h3 className="text-white font-semibold mb-4 self-start">Combined Score</h3>
            <ScoreRing score={COMBINED} size={140} />
            <p className="text-slate-400 text-xs mt-4 text-center">ATS 30% · Interview 40% · Coding 30%</p>
          </div>
          <div className="md:col-span-2 bg-slate-800 rounded-2xl p-8 shadow-xl">
            <h3 className="text-white font-semibold mb-6">Score Breakdown</h3>
            {[['ATS Score', SCORES.ats, 'Resume quality & keywords', 'bg-blue-500'],
              ['Interview Score', SCORES.interview, 'AI interview performance', 'bg-green-500'],
              ['Coding Score', SCORES.coding, 'Problem-solving ability', 'bg-purple-500'],
            ].map(([label, score, sub, color]) => (
              <div key={label} className="mb-5 last:mb-0">
                <div className="flex justify-between items-center mb-1.5">
                  <div>
                    <span className="text-white font-medium text-sm">{label}</span>
                    <p className="text-slate-500 text-xs">{sub}</p>
                  </div>
                  <span className="text-white font-bold">{score}<span className="text-slate-500 font-normal">/100</span></span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-3">
                  <div className={`h-3 rounded-full transition-all duration-700 ${color}`} style={{ width: `${score}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Salary Estimate */}
        <div className="bg-gradient-to-r from-indigo-600/20 to-purple-600/20 border border-indigo-500/30 rounded-2xl p-6 mb-8 flex items-center gap-4">
          <div className="bg-indigo-500/20 p-3 rounded-xl">
            <DollarSign className="w-8 h-8 text-indigo-400" />
          </div>
          <div>
            <p className="text-slate-400 text-sm">Estimated Salary Range for Your Profile</p>
            <p className="text-3xl font-bold text-white">₹18L – ₹28L <span className="text-slate-400 text-base font-normal">per year</span></p>
            <p className="text-slate-500 text-xs mt-1">Based on your combined score of {COMBINED}/100 and current market data</p>
          </div>
        </div>

        {/* Matched Companies */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <Building2 className="w-5 h-5 text-indigo-400" /> Top Company Matches
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {MATCHED_COMPANIES.map((c) => (
              <div key={c.name} className="bg-slate-800 rounded-2xl p-5 shadow-xl hover:border-indigo-500 border border-transparent transition-all group">
                <div className="flex items-center gap-3 mb-3">
                  <img src={c.logo} alt={c.name} className="w-10 h-10 rounded-lg" />
                  <div>
                    <p className="text-white font-semibold text-sm">{c.name}</p>
                    <p className="text-slate-500 text-xs">{c.role}</p>
                  </div>
                </div>
                <div className="mb-3">
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-400">Match</span>
                    <span className="text-green-400 font-bold">{c.match}%</span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-1.5">
                    <div className="bg-green-500 h-1.5 rounded-full" style={{ width: `${c.match}%` }} />
                  </div>
                </div>
                <p className="text-slate-400 text-xs mb-4">₹{c.salaryMin}K – ₹{c.salaryMax}K / year</p>
                <Link to="/jobs" className="w-full flex items-center justify-center gap-1 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold py-2 rounded-lg transition-colors">
                  Apply Now <ChevronRight className="w-3 h-3" />
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Skills to Learn */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-800 rounded-2xl p-6 shadow-xl">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-yellow-400" /> Skills to Learn Next
            </h2>
            <div className="space-y-4">
              {SKILLS_TO_LEARN.map((s) => (
                <div key={s.skill}>
                  <div className="flex justify-between items-center mb-1.5">
                    <span className="text-slate-300 text-sm">{s.skill}</span>
                    <span className="text-slate-400 text-xs">{s.relevance}% relevant</span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-2">
                    <div className={`h-2 rounded-full transition-all duration-700 ${s.color}`} style={{ width: `${s.relevance}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-slate-800 rounded-2xl p-6 shadow-xl">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-green-400" /> Trending Roles in 2024
            </h2>
            <div className="space-y-4">
              {TRENDING_ROLES.map((r) => (
                <div key={r.role} className="flex items-center justify-between p-4 bg-slate-700/50 rounded-xl border border-slate-700">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{r.icon}</span>
                    <span className="text-white font-medium">{r.role}</span>
                  </div>
                  <span className="text-green-400 font-bold text-sm bg-green-500/10 px-2 py-1 rounded-lg">{r.growth}</span>
                </div>
              ))}
            </div>
            <div className="mt-6 p-4 bg-indigo-500/10 border border-indigo-500/30 rounded-xl">
              <p className="text-indigo-300 text-sm font-medium mb-1">💡 Pro Tip</p>
              <p className="text-slate-400 text-xs">Complete the AI Interview and Coding challenge to improve your combined score and unlock more company matches!</p>
            </div>
          </div>
        </div>
    </div>
  );
}
