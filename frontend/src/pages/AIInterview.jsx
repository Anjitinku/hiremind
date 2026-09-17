import { useState, useRef, useEffect } from 'react';
import { Mic, MicOff, ChevronRight, RotateCcw, Award, CheckCircle } from 'lucide-react';
import ScoreRing from '../components/ScoreRing';
import toast from 'react-hot-toast';

const INTERVIEW_TYPES = ['TECHNICAL', 'HR', 'BEHAVIORAL'];

const QUESTIONS = {
  TECHNICAL: [
    'Explain the difference between REST and GraphQL APIs.',
    'How does JavaScript event loop work?',
    'What is the difference between SQL and NoSQL databases?',
    'Describe how you would design a URL shortening service.',
    'What are SOLID principles? Give an example of each.',
  ],
  HR: [
    'Tell me about yourself and your background.',
    'Why do you want to work at this company?',
    'Where do you see yourself in 5 years?',
    'What is your greatest professional achievement?',
    'How do you handle tight deadlines and pressure?',
  ],
  BEHAVIORAL: [
    'Tell me about a time you resolved a conflict with a teammate.',
    'Describe a situation where you had to learn something quickly.',
    'Give an example of when you showed leadership.',
    'Tell me about a project that failed. What did you learn?',
    'Describe a time you went above and beyond for a customer or colleague.',
  ],
};

const MOCK_FEEDBACK = {
  TECHNICAL: 'Your technical explanation was structured and clear. Consider elaborating on system design trade-offs and providing concrete examples from past projects to strengthen your answers.',
  HR: 'You communicated your background effectively. Using the STAR method (Situation, Task, Action, Result) will make your answers more compelling and memorable.',
  BEHAVIORAL: 'Good use of specific examples. Highlight your leadership and cross-team collaboration skills more explicitly to leave a stronger impression.',
};

export default function AIInterview() {
  const [selectedType, setSelectedType] = useState('TECHNICAL');
  const [currentQ, setCurrentQ] = useState(0);
  const [started, setStarted] = useState(false);
  const [recording, setRecording] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [scores, setScores] = useState(null);
  const [sessionDone, setSessionDone] = useState(false);
  const [allScores, setAllScores] = useState([]);

  const recognitionRef = useRef(null);
  const questions = QUESTIONS[selectedType];

  useEffect(() => {
    return () => recognitionRef.current?.stop();
  }, []);

  const startRecording = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      toast.error('Speech recognition not supported. Please use Chrome.');
      return;
    }
    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-US';
    recognition.onresult = (e) => {
      let text = '';
      for (let i = 0; i < e.results.length; i++) text += e.results[i][0].transcript;
      setTranscript(text);
    };
    recognition.onerror = () => toast.error('Microphone error. Please allow mic access.');
    recognition.start();
    recognitionRef.current = recognition;
    setRecording(true);
  };

  const stopRecording = () => {
    recognitionRef.current?.stop();
    setRecording(false);
  };

  const mockScore = () => {
    const rand = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
    return {
      overall: rand(70, 92),
      clarity: rand(68, 92),
      relevance: rand(65, 90),
      depth: rand(65, 88),
      confidence: rand(70, 94),
    };
  };

  const handleSubmit = () => {
    if (!transcript.trim()) { toast.error('Please record an answer first.'); return; }
    setLoading(true);
    setTimeout(() => {
      const s = mockScore();
      setScores(s);
      setAllScores((prev) => [...prev, s.overall]);
      setSubmitted(true);
      setLoading(false);
    }, 2000);
  };

  const handleNext = () => {
    if (currentQ + 1 >= questions.length) {
      setSessionDone(true);
    } else {
      setCurrentQ((q) => q + 1);
      setTranscript('');
      setSubmitted(false);
      setScores(null);
    }
  };

  const handleRestart = () => {
    setCurrentQ(0); setStarted(false); setRecording(false);
    setTranscript(''); setSubmitted(false); setScores(null);
    setSessionDone(false); setAllScores([]);
  };

  const avgScore = allScores.length ? Math.round(allScores.reduce((a, b) => a + b, 0) / allScores.length) : 0;

  if (sessionDone) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <div className="bg-slate-800 rounded-2xl p-10 shadow-xl">
          <Award className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-white mb-2">Interview Complete!</h2>
          <p className="text-slate-400 mb-8">Here's your session summary</p>
          <div className="flex justify-center mb-8">
            <ScoreRing score={avgScore} size={140} />
          </div>
          <div className="grid grid-cols-2 gap-4 mb-8 text-left">
            {[['Strengths', ['Clear communication', 'Structured answers', 'Technical depth']], ['Improve On', ['Use STAR method more', 'Add more examples', 'Pace your delivery']]].map(([title, items]) => (
              <div key={title} className="bg-slate-700 rounded-xl p-4">
                <h4 className="text-white font-semibold mb-3">{title}</h4>
                {items.map((item) => (
                  <div key={item} className="flex items-center gap-2 text-slate-300 text-sm mb-1">
                    <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                    {item}
                  </div>
                ))}
              </div>
            ))}
          </div>
          <p className="text-slate-400 text-sm mb-6">{MOCK_FEEDBACK[selectedType]}</p>
          <button onClick={handleRestart} className="flex items-center gap-2 mx-auto bg-indigo-600 hover:bg-indigo-500 text-white font-semibold px-8 py-3 rounded-xl transition-colors">
            <RotateCcw className="w-4 h-4" /> Start New Interview
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-10 w-full">
      <h1 className="text-3xl font-bold text-white mb-2">AI Interview</h1>
        <p className="text-slate-400 mb-8">Practice with our AI interviewer and get instant scoring.</p>

        {!started ? (
          <div className="bg-slate-800 rounded-2xl p-8 shadow-xl">
            <h2 className="text-xl font-semibold text-white mb-4">Select Interview Type</h2>
            <div className="grid grid-cols-3 gap-4 mb-8">
              {INTERVIEW_TYPES.map((type) => (
                <button key={type} onClick={() => setSelectedType(type)}
                  className={`py-4 px-6 rounded-xl font-semibold text-sm transition-all border-2 ${selectedType === type ? 'bg-indigo-600 border-indigo-500 text-white' : 'bg-slate-700 border-slate-600 text-slate-300 hover:border-indigo-500'}`}>
                  {type.charAt(0) + type.slice(1).toLowerCase()}
                </button>
              ))}
            </div>
            <div className="bg-slate-700/50 rounded-xl p-4 mb-8">
              <p className="text-slate-300 text-sm"><span className="text-indigo-400 font-semibold">5 questions</span> · Answer via microphone · Instant AI scoring after each answer</p>
            </div>
            <button onClick={() => setStarted(true)} className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-4 rounded-xl transition-colors">
              Start Interview →
            </button>
          </div>
        ) : (
          <>
            {/* Progress */}
            <div className="mb-6">
              <div className="flex justify-between text-sm text-slate-400 mb-2">
                <span>Question {currentQ + 1} of {questions.length}</span>
                <span>{selectedType.charAt(0) + selectedType.slice(1).toLowerCase()} Interview</span>
              </div>
              <div className="w-full bg-slate-700 rounded-full h-2">
                <div className="bg-indigo-500 h-2 rounded-full transition-all duration-500" style={{ width: `${((currentQ + 1) / questions.length) * 100}%` }} />
              </div>
            </div>

            {/* Question card */}
            <div className="bg-slate-800 rounded-2xl p-8 mb-6 shadow-xl">
              <p className="text-slate-400 text-sm mb-3 uppercase tracking-wider">Question {currentQ + 1}</p>
              <h2 className="text-xl font-semibold text-white mb-8">{questions[currentQ]}</h2>

              {/* Mic button */}
              {!submitted && (
                <div className="flex flex-col items-center gap-6">
                  <button onClick={recording ? stopRecording : startRecording}
                    className={`w-24 h-24 rounded-full flex items-center justify-center transition-all shadow-lg ${recording ? 'bg-red-500 hover:bg-red-400 animate-pulse' : 'bg-indigo-600 hover:bg-indigo-500'}`}>
                    {recording ? <MicOff className="w-10 h-10 text-white" /> : <Mic className="w-10 h-10 text-white" />}
                  </button>
                  <p className="text-slate-400 text-sm">{recording ? '🔴 Recording... click to stop' : 'Click mic to start recording'}</p>

                  {transcript && (
                    <div className="w-full bg-slate-700/50 rounded-xl p-4 text-slate-300 text-sm border border-slate-600 min-h-[80px]">
                      <p className="text-slate-500 text-xs mb-1 uppercase tracking-wider">Transcript</p>
                      {transcript}
                    </div>
                  )}

                  <button onClick={handleSubmit} disabled={!transcript || loading}
                    className="flex items-center gap-2 bg-orange-500 hover:bg-orange-400 disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold px-8 py-3 rounded-xl transition-colors">
                    {loading ? 'Analyzing...' : 'Submit Answer'}
                    {!loading && <ChevronRight className="w-4 h-4" />}
                  </button>
                </div>
              )}

              {/* Score card */}
              {submitted && scores && (
                <div className="flex flex-col items-center gap-6">
                  <ScoreRing score={scores.overall} size={120} />
                  <div className="w-full space-y-3">
                    {[['Clarity', scores.clarity], ['Relevance', scores.relevance], ['Depth', scores.depth], ['Confidence', scores.confidence]].map(([label, val]) => (
                      <div key={label}>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-slate-400">{label}</span>
                          <span className="text-white font-semibold">{val}/100</span>
                        </div>
                        <div className="w-full bg-slate-700 rounded-full h-2">
                          <div className={`h-2 rounded-full transition-all duration-700 ${val >= 70 ? 'bg-green-500' : val >= 50 ? 'bg-yellow-500' : 'bg-red-500'}`} style={{ width: `${val}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                  <p className="text-slate-400 text-sm text-center">{MOCK_FEEDBACK[selectedType]}</p>
                  <button onClick={handleNext} className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-8 py-3 rounded-xl transition-colors">
                    {currentQ + 1 >= questions.length ? 'View Session Summary' : 'Next Question'}
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          </>
        )}
    </div>
  );
}
