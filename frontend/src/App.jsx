import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ChatBot from './components/ChatBot';
import ProtectedRoute from './components/ProtectedRoute';

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import CodingProblems from './pages/CodingProblems';
import ProblemDetail from './pages/ProblemDetail';
import Jobs from './pages/Jobs';
import ATSChecker from './pages/ATSChecker';
import AIInterview from './pages/AIInterview';
import Profile from './pages/Profile';
import CareerMatch from './pages/CareerMatch';
import RecruiterDashboard from './pages/RecruiterDashboard';
import NotFound from './pages/NotFound';

function App() {
  return (
    <AuthProvider>
      <div className="flex flex-col min-h-screen bg-slate-900 text-slate-300">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/problems" element={<ProtectedRoute><CodingProblems /></ProtectedRoute>} />
            <Route path="/problems/:id" element={<ProtectedRoute><ProblemDetail /></ProtectedRoute>} />
            <Route path="/jobs" element={<ProtectedRoute><Jobs /></ProtectedRoute>} />
            <Route path="/ats" element={<ProtectedRoute><ATSChecker /></ProtectedRoute>} />
            <Route path="/interview" element={<ProtectedRoute><AIInterview /></ProtectedRoute>} />
            <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
            <Route path="/career-match" element={<ProtectedRoute><CareerMatch /></ProtectedRoute>} />
            <Route path="/recruiter" element={<ProtectedRoute><RecruiterDashboard /></ProtectedRoute>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
        <ChatBot />
        <Toaster position="bottom-right" toastOptions={{ className: 'bg-slate-800 text-white' }} />
      </div>
    </AuthProvider>
  );
}

export default App;
