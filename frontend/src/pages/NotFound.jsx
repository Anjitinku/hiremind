import { Link } from 'react-router-dom';
import { Brain, Home } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center text-center px-4">
      <Brain className="w-20 h-20 text-indigo-500 mb-6 opacity-50" />
      <h1 className="text-8xl font-black text-white mb-4">404</h1>
      <h2 className="text-2xl font-bold text-slate-300 mb-3">Page Not Found</h2>
      <p className="text-slate-500 mb-8 max-w-sm">
        Looks like our AI couldn't locate this page. Let's get you back on track!
      </p>
      <Link to="/" className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold px-6 py-3 rounded-xl transition-colors shadow-lg">
        <Home className="w-4 h-4" /> Back to Home
      </Link>
    </div>
  );
}
