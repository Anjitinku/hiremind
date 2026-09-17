import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { UploadCloud, FileText, CheckCircle, XCircle } from 'lucide-react';
import { uploadResume, getATSResults } from '../api/ats';
import ScoreRing from '../components/ScoreRing';
import toast from 'react-hot-toast';

const ATSChecker = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);

  const onDrop = useCallback(async (acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      setFile(acceptedFiles[0]);
      setLoading(true);
      try {
        await uploadResume(acceptedFiles[0]);
        toast.success("Resume uploaded successfully!");
        const res = await getATSResults(1);
        setResults(res.data);
      } catch (err) {
        toast.error("Failed to analyze resume");
      } finally {
        setLoading(false);
      }
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ 
    onDrop, 
    accept: { 'application/pdf': ['.pdf'], 'application/msword': ['.doc', '.docx'] },
    maxFiles: 1 
  });

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-white mb-4">ATS Resume Checker</h1>
        <p className="text-xl text-slate-400 max-w-2xl mx-auto">Upload your resume to see how it scores against Applicant Tracking Systems and discover areas for improvement.</p>
      </div>

      {!results && !loading && (
        <div 
          {...getRootProps()} 
          className={`border-2 border-dashed rounded-2xl p-16 text-center cursor-pointer transition-colors
            ${isDragActive ? 'border-indigo-500 bg-indigo-500/10' : 'border-slate-600 bg-slate-800 hover:border-indigo-400 hover:bg-slate-750'}`}
        >
          <input {...getInputProps()} />
          <UploadCloud className="w-16 h-16 text-indigo-500 mx-auto mb-4" />
          <p className="text-xl text-white font-medium mb-2">Drag & drop your resume here</p>
          <p className="text-slate-400 mb-6">Supports PDF, DOC, DOCX up to 5MB</p>
          <button className="bg-indigo-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-indigo-700 transition-colors">
            Browse Files
          </button>
        </div>
      )}

      {loading && (
        <div className="bg-slate-800 rounded-2xl p-16 text-center border border-slate-700">
          <div className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
          <h3 className="text-xl font-medium text-white mb-2">Analyzing Your Resume...</h3>
          <p className="text-slate-400">Our AI is extracting skills, checking formatting, and scoring match rate.</p>
        </div>
      )}

      {results && (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
          <div className="bg-slate-800 rounded-2xl p-8 border border-slate-700 flex flex-col md:flex-row gap-8 items-center">
            <div className="shrink-0">
              <ScoreRing score={results.overall} size={160} strokeWidth={12} />
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-white mb-2">Resume Score: {results.overall}/100</h2>
              <p className="text-slate-400 mb-6">Your resume is a good start, but missing key technical terms that ATS scanners look for in engineering roles.</p>
              
              <div className="grid grid-cols-2 gap-6">
                {Object.entries(results.categories).map(([key, val]) => (
                  <div key={key}>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-slate-300 capitalize">{key}</span>
                      <span className="text-white font-medium">{val}/100</span>
                    </div>
                    <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                      <div className={`h-full rounded-full ${val >= 80 ? 'bg-green-500' : val >= 60 ? 'bg-yellow-500' : 'bg-red-500'}`} style={{ width: `${val}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-slate-800 rounded-2xl p-8 border border-slate-700">
              <h3 className="text-xl font-bold text-white mb-6">Missing Keywords</h3>
              <div className="flex flex-wrap gap-2 mb-8">
                {results.missingKeywords.map(kw => (
                  <span key={kw} className="bg-red-500/10 text-red-400 border border-red-500/20 px-3 py-1.5 rounded-lg text-sm font-medium">
                    {kw}
                  </span>
                ))}
              </div>
              <p className="text-sm text-slate-400">Adding these keywords naturally to your experience section can boost your ATS match rate by up to 15%.</p>
            </div>

            <div className="bg-slate-800 rounded-2xl p-8 border border-slate-700">
              <h3 className="text-xl font-bold text-white mb-6">Section Feedback</h3>
              <ul className="space-y-4">
                {Object.entries(results.feedback).map(([key, passed]) => (
                  <li key={key} className="flex items-center gap-3">
                    {passed ? <CheckCircle className="w-5 h-5 text-green-500" /> : <XCircle className="w-5 h-5 text-red-500" />}
                    <span className="text-slate-300 capitalize text-lg">{key}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="flex justify-center mt-8 gap-4">
             <button onClick={() => {setResults(null); setFile(null);}} className="bg-slate-700 hover:bg-slate-600 text-white px-6 py-3 rounded-xl font-medium transition-colors">
               Upload New Resume
             </button>
             <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-medium transition-colors">
               Download Full Report
             </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ATSChecker;
