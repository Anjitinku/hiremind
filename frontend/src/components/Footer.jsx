import { Brain } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-slate-900 border-t border-slate-800 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center">
        <div className="flex items-center space-x-2 mb-4 md:mb-0">
          <Brain className="h-6 w-6 text-indigo-500" />
          <span className="text-lg font-bold text-white">HireMind AI</span>
        </div>
        <div className="flex space-x-6 text-sm text-slate-400">
          <Link to="/" className="hover:text-indigo-400 transition-colors">About</Link>
          <Link to="/" className="hover:text-indigo-400 transition-colors">Privacy</Link>
          <Link to="/" className="hover:text-indigo-400 transition-colors">Terms</Link>
        </div>
        <div className="mt-4 md:mt-0 text-sm text-slate-500">
          &copy; 2024 HireMind AI. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
