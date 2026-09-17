import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Editor from '@monaco-editor/react';
import { getProblem, submitSolution } from '../api/coding';
import { Play, Send, CheckCircle, XCircle } from 'lucide-react';

const ProblemDetail = () => {
  const { id } = useParams();
  const [problem, setProblem] = useState(null);
  const [code, setCode] = useState('// Write your solution here\n');
  const [language, setLanguage] = useState('javascript');
  const [result, setResult] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchProb = async () => {
      const res = await getProblem(id);
      setProblem(res.data);
    };
    fetchProb();
  }, [id]);

  const handleSubmit = async () => {
    setSubmitting(true);
    const res = await submitSolution({ id, code, language });
    setResult(res.data);
    setSubmitting(false);
  };

  if (!problem) return <div className="p-8 text-center text-white">Loading...</div>;

  return (
    <div className="flex h-[calc(100vh-64px)] bg-slate-900">
      {/* Left Panel: Description */}
      <div className="w-1/2 p-6 overflow-y-auto border-r border-slate-700 custom-scrollbar">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-white mb-2">{problem.id}. {problem.title}</h1>
          <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${problem.difficulty === 'Easy' ? 'bg-green-500/20 text-green-400' : problem.difficulty === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' : 'bg-red-500/20 text-red-400'}`}>
            {problem.difficulty}
          </span>
        </div>
        
        <div className="prose prose-invert max-w-none text-slate-300">
          <p className="whitespace-pre-wrap mb-8">{problem.description}</p>
          
          <h3 className="text-lg font-semibold text-white mb-4">Examples</h3>
          {problem.examples.map((ex, i) => (
            <div key={i} className="bg-slate-800 p-4 rounded-lg mb-4 border border-slate-700 font-mono text-sm">
              <div><strong>Input:</strong> {ex.input}</div>
              <div><strong>Output:</strong> {ex.output}</div>
              {ex.explanation && <div className="mt-2 text-slate-400"><strong>Explanation:</strong> {ex.explanation}</div>}
            </div>
          ))}

          <h3 className="text-lg font-semibold text-white mt-8 mb-4">Constraints</h3>
          <ul className="list-disc pl-5 space-y-1 font-mono text-sm bg-slate-800 p-4 rounded-lg border border-slate-700">
            {problem.constraints.map((c, i) => <li key={i}>{c}</li>)}
          </ul>
        </div>
      </div>

      {/* Right Panel: Editor & Results */}
      <div className="w-1/2 flex flex-col">
        <div className="bg-slate-800 border-b border-slate-700 p-3 flex justify-between items-center">
          <select 
            value={language} 
            onChange={e => setLanguage(e.target.value)}
            className="bg-slate-900 text-white border border-slate-700 rounded px-3 py-1.5 text-sm focus:outline-none focus:border-indigo-500"
          >
            <option value="javascript">JavaScript</option>
            <option value="python">Python</option>
            <option value="java">Java</option>
            <option value="cpp">C++</option>
          </select>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 bg-slate-700 hover:bg-slate-600 text-white px-4 py-1.5 rounded text-sm transition-colors">
              <Play className="w-4 h-4" /> Run
            </button>
            <button onClick={handleSubmit} disabled={submitting} className="flex items-center gap-2 bg-green-600 hover:bg-green-700 disabled:bg-green-800 text-white px-4 py-1.5 rounded text-sm font-medium transition-colors">
              <Send className="w-4 h-4" /> {submitting ? 'Submitting...' : 'Submit'}
            </button>
          </div>
        </div>

        <div className="flex-1">
          <Editor
            height="100%"
            theme="vs-dark"
            language={language}
            value={code}
            onChange={val => setCode(val)}
            options={{ minimap: { enabled: false }, fontSize: 14, fontFamily: 'monospace' }}
          />
        </div>

        {/* Results Panel */}
        {result && (
          <div className="h-1/3 bg-slate-800 border-t border-slate-700 p-4 overflow-y-auto">
            <h3 className={`text-xl font-bold mb-4 flex items-center gap-2 ${result.status === 'Accepted' ? 'text-green-500' : 'text-red-500'}`}>
              {result.status === 'Accepted' ? <CheckCircle className="w-6 h-6"/> : <XCircle className="w-6 h-6"/>} 
              {result.status}
            </h3>
            {result.status === 'Accepted' ? (
              <div className="flex gap-8 text-sm text-slate-300">
                <div><span className="font-semibold text-slate-400 block mb-1">Runtime</span> {result.runtime}</div>
                <div><span className="font-semibold text-slate-400 block mb-1">Memory</span> {result.memory}</div>
              </div>
            ) : (
              <div className="space-y-4 font-mono text-sm">
                <div className="bg-slate-900 p-3 rounded border border-slate-700 text-green-400"><span className="text-slate-500">Expected:</span> {result.expected}</div>
                <div className="bg-slate-900 p-3 rounded border border-slate-700 text-red-400"><span className="text-slate-500">Actual:</span> {result.actual}</div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProblemDetail;
