import { useState } from 'react';
import { User, Briefcase, Code, FileText, Star, MapPin, Github, Linkedin, Edit3, Upload, CheckCircle, Clock, XCircle, Award, X, Save } from 'lucide-react';
import ScoreRing from '../components/ScoreRing';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const MOCK_APPLICATIONS = [
  { id: 1, jobTitle: 'Senior Frontend Engineer', company: 'Stripe', status: 'OFFER', appliedAt: '2024-03-10' },
  { id: 2, jobTitle: 'Full Stack Developer', company: 'Airbnb', status: 'IN_REVIEW', appliedAt: '2024-03-08' },
  { id: 3, jobTitle: 'React Developer', company: 'Notion', status: 'APPLIED', appliedAt: '2024-03-05' },
  { id: 4, jobTitle: 'Software Engineer II', company: 'Dropbox', status: 'REJECTED', appliedAt: '2024-02-28' },
];

const STATUS_CONFIG = {
  OFFER:     { label: 'Offer Received', color: 'bg-green-500/20 text-green-400 border border-green-500/30', icon: <Award className="w-3 h-3" /> },
  IN_REVIEW: { label: 'In Review',      color: 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30', icon: <Clock className="w-3 h-3" /> },
  APPLIED:   { label: 'Applied',         color: 'bg-blue-500/20 text-blue-400 border border-blue-500/30',   icon: <CheckCircle className="w-3 h-3" /> },
  REJECTED:  { label: 'Rejected',        color: 'bg-red-500/20 text-red-400 border border-red-500/30',     icon: <XCircle className="w-3 h-3" /> },
};

const TABS = ['Overview', 'Resume', 'Scores', 'Applications'];

export default function Profile() {
  const { user, updateUser } = useAuth();
  const [activeTab, setActiveTab] = useState('Overview');
  const [editing, setEditing] = useState(false);

  // Profile editable details
  const [profileData, setProfileData] = useState({
    name: user?.name || 'Alex Johnson',
    title: user?.title || 'Senior Frontend Engineer · 4 years experience',
    location: user?.location || 'Bangalore, India',
    bio: user?.bio || 'Passionate frontend engineer with 4+ years of experience building scalable web applications. Experienced with React, TypeScript, and modern UI frameworks. Love solving complex UX challenges and optimizing performance.',
    skills: user?.skills || ['React', 'JavaScript', 'TypeScript', 'Node.js', 'Python', 'PostgreSQL', 'REST APIs', 'Git', 'Tailwind CSS', 'Next.js'],
    linkedinUrl: user?.linkedinUrl || 'https://linkedin.com',
    githubUrl: user?.githubUrl || 'https://github.com',
    role: user?.role || 'CANDIDATE',
    avatar: user?.avatar || null,
    resumeName: user?.resumeName || 'alex_johnson_resume.pdf',
  });

  const [editForm, setEditForm] = useState({ ...profileData, skillsInput: profileData.skills.join(', ') });

  const handleOpenEdit = () => {
    setEditForm({
      ...profileData,
      skillsInput: profileData.skills.join(', ')
    });
    setEditing(true);
  };

  const handleSaveEdit = (e) => {
    e.preventDefault();
    const parsedSkills = editForm.skillsInput
      .split(',')
      .map(s => s.trim())
      .filter(Boolean);

    const updated = {
      ...profileData,
      name: editForm.name,
      title: editForm.title,
      location: editForm.location,
      bio: editForm.bio,
      linkedinUrl: editForm.linkedinUrl,
      githubUrl: editForm.githubUrl,
      skills: parsedSkills.length > 0 ? parsedSkills : profileData.skills
    };

    setProfileData(updated);
    if (updateUser) {
      updateUser(updated);
    }
    setEditing(false);
    toast.success('Profile updated successfully!');
  };

  const handleResumeUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfileData(prev => ({ ...prev, resumeName: file.name }));
      if (updateUser) updateUser({ resumeName: file.name });
      toast.success(`Uploaded: ${file.name}`);
    }
  };

  const handleAvatarUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        const dataUrl = ev.target.result;
        setProfileData(prev => ({ ...prev, avatar: dataUrl }));
        if (updateUser) updateUser({ avatar: dataUrl });
        toast.success('Avatar uploaded');
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-10 w-full">
      {/* Header */}
        <div className="bg-slate-800 rounded-2xl p-8 mb-6 shadow-xl flex flex-col sm:flex-row items-start sm:items-center gap-6 border border-slate-700/50">
          <img
            src={profileData.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${profileData.name}`}
            alt="Avatar"
            className="w-24 h-24 rounded-full bg-slate-700 border-4 border-indigo-500 shadow-lg"
          />
          <input type="file" accept="image/*" id="avatarUpload" className="hidden" onChange={handleAvatarUpload} />
          <label htmlFor="avatarUpload" className="mt-2 text-sm text-indigo-400 hover:underline cursor-pointer">Change Avatar</label>
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-1">
              <h1 className="text-2xl font-bold text-white">{profileData.name}</h1>
              <span className="bg-indigo-500/20 text-indigo-300 text-xs px-2.5 py-0.5 rounded-full border border-indigo-500/30 font-medium">
                {profileData.role}
              </span>
            </div>
            <p className="text-slate-300 mb-2">{profileData.title}</p>
            <div className="flex flex-wrap items-center gap-4 text-slate-400 text-sm">
              <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-slate-500" /> {profileData.location}</span>
              <a href={profileData.linkedinUrl} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 hover:text-indigo-400 transition-colors"><Linkedin className="w-3.5 h-3.5 text-blue-400" /> LinkedIn</a>
              <a href={profileData.githubUrl} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 hover:text-indigo-400 transition-colors"><Github className="w-3.5 h-3.5 text-slate-300" /> GitHub</a>
            </div>
          </div>
          <button
            onClick={handleOpenEdit}
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition-all shadow-md active:scale-95"
          >
            <Edit3 className="w-4 h-4" /> Edit Profile
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-slate-800 p-1.5 rounded-xl mb-6 w-fit border border-slate-700">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === tab ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-white'}`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tab content */}
        {activeTab === 'Overview' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 bg-slate-800 rounded-2xl p-6 shadow-xl border border-slate-700/50">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-white font-semibold text-lg">About Me</h3>
                <button onClick={handleOpenEdit} className="text-xs text-indigo-400 hover:underline flex items-center gap-1">
                  <Edit3 className="w-3 h-3" /> Quick Edit
                </button>
              </div>
              <p className="text-slate-300 text-sm leading-relaxed mb-6 whitespace-pre-line">
                {profileData.bio}
              </p>
              <h3 className="text-white font-semibold text-lg mb-3">Skills & Expertise</h3>
              <div className="flex flex-wrap gap-2">
                {profileData.skills.map((skill) => (
                  <span key={skill} className="bg-slate-700/80 text-indigo-200 text-xs px-3 py-1.5 rounded-lg border border-slate-600 font-medium">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            <div className="bg-slate-800 rounded-2xl p-6 shadow-xl border border-slate-700/50">
              <h3 className="text-white font-semibold mb-4 text-lg">Activity Stats</h3>
              {[['Problems Solved', '127', <Code className="w-5 h-5 text-indigo-400" />],
                ['Jobs Applied', '12', <Briefcase className="w-5 h-5 text-orange-400" />],
                ['Interviews Done', '4', <User className="w-5 h-5 text-green-400" />],
              ].map(([label, val, icon]) => (
                <div key={label} className="flex items-center justify-between py-3 border-b border-slate-700 last:border-0">
                  <div className="flex items-center gap-2.5 text-slate-400 text-sm">{icon}{label}</div>
                  <span className="text-white font-bold text-lg">{val}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'Resume' && (
          <div className="bg-slate-800 rounded-2xl p-8 shadow-xl border border-slate-700/50">
            <h3 className="text-white font-semibold mb-6 flex items-center gap-2 text-lg"><FileText className="w-5 h-5 text-indigo-400" /> Current Resume</h3>
            
            <label className="block border-2 border-dashed border-slate-600 rounded-xl p-8 text-center mb-6 hover:border-indigo-500 transition-colors cursor-pointer bg-slate-850">
              <input type="file" accept=".pdf,.doc,.docx" className="hidden" onChange={handleResumeUpload} />
              <Upload className="w-10 h-10 text-indigo-400 mx-auto mb-3" />
              <p className="text-white font-medium mb-1">{profileData.resumeName}</p>
              <p className="text-slate-400 text-sm">Click or drag a new file here to upload (PDF, DOCX)</p>
            </label>

            <div className="flex flex-wrap items-center gap-4">
              <span className="bg-green-500/20 text-green-400 border border-green-500/30 text-sm px-3.5 py-1.5 rounded-lg font-semibold flex items-center gap-2">
                <CheckCircle className="w-4 h-4" /> ATS Score: 72/100
              </span>
              <span className="text-slate-400 text-sm">Analyzed using AI ATS Model</span>
            </div>
          </div>
        )}

        {activeTab === 'Scores' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-800 rounded-2xl p-6 shadow-xl flex flex-col items-center border border-slate-700/50">
              <h3 className="text-white font-semibold mb-4 self-start text-lg">Overall Combined Score</h3>
              <ScoreRing score={74} size={150} />
              <p className="text-slate-400 text-sm mt-4 text-center">Calculated from your ATS resume analysis, coding assessments & AI interview practice</p>
            </div>
            <div className="bg-slate-800 rounded-2xl p-6 shadow-xl border border-slate-700/50">
              <h3 className="text-white font-semibold mb-6 text-lg">Score Breakdown</h3>
              {[['ATS Resume Score', 72, 'Resume keyword & formatting evaluation'], ['AI Interview Score', 82, 'Speech, confidence & STAR accuracy'], ['Coding Score', 68, 'Algorithm test case passing rate']].map(([label, score, sub]) => (
                <div key={label} className="mb-5 last:mb-0">
                  <div className="flex justify-between items-center mb-1">
                    <div>
                      <span className="text-white font-medium text-sm">{label}</span>
                      <p className="text-slate-400 text-xs">{sub}</p>
                    </div>
                    <span className="text-white font-bold">{score}<span className="text-slate-400 font-normal">/100</span></span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-2.5">
                    <div
                      className={`h-2.5 rounded-full transition-all duration-700 ${score >= 70 ? 'bg-green-500' : score >= 50 ? 'bg-yellow-500' : 'bg-red-500'}`}
                      style={{ width: `${score}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'Applications' && (
          <div className="bg-slate-800 rounded-2xl shadow-xl overflow-hidden border border-slate-700/50">
            <div className="p-6 border-b border-slate-700">
              <h3 className="text-white font-semibold text-lg">My Applications</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-700/50">
                  <tr>
                    {['Job Title', 'Company', 'Applied On', 'Status'].map((h) => (
                      <th key={h} className="text-left text-slate-400 text-sm font-medium px-6 py-3">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {MOCK_APPLICATIONS.map((app) => {
                    const cfg = STATUS_CONFIG[app.status];
                    return (
                      <tr key={app.id} className="border-t border-slate-700/50 hover:bg-slate-700/30 transition-colors">
                        <td className="px-6 py-4 text-white font-medium">{app.jobTitle}</td>
                        <td className="px-6 py-4 text-slate-400">{app.company}</td>
                        <td className="px-6 py-4 text-slate-400 text-sm">{app.appliedAt}</td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-lg ${cfg.color}`}>
                            {cfg.icon}{cfg.label}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

      {/* Edit Profile Modal */}
      {editing && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-slate-800 rounded-2xl shadow-2xl w-full max-w-xl border border-slate-700 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between p-6 border-b border-slate-700 bg-slate-850">
              <h2 className="text-white font-bold text-lg flex items-center gap-2">
                <Edit3 className="w-5 h-5 text-indigo-400" /> Edit Profile Details
              </h2>
              <button 
                onClick={() => setEditing(false)} 
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-700 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 text-xs font-semibold uppercase tracking-wider mb-1.5">Full Name</label>
                  <input 
                    type="text" 
                    value={editForm.name} 
                    onChange={(e) => setEditForm({ ...editForm, name: e.target.value })} 
                    className="w-full bg-slate-700 border border-slate-600 text-white rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-indigo-500" 
                    required 
                  />
                </div>
                <div>
                  <label className="block text-slate-300 text-xs font-semibold uppercase tracking-wider mb-1.5">Headline / Title</label>
                  <input 
                    type="text" 
                    value={editForm.title} 
                    onChange={(e) => setEditForm({ ...editForm, title: e.target.value })} 
                    className="w-full bg-slate-700 border border-slate-600 text-white rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-indigo-500" 
                    required 
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 text-xs font-semibold uppercase tracking-wider mb-1.5">Location</label>
                <input 
                  type="text" 
                  value={editForm.location} 
                  onChange={(e) => setEditForm({ ...editForm, location: e.target.value })} 
                  className="w-full bg-slate-700 border border-slate-600 text-white rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-indigo-500" 
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 text-xs font-semibold uppercase tracking-wider mb-1.5">LinkedIn Profile URL</label>
                  <input 
                    type="text" 
                    value={editForm.linkedinUrl} 
                    onChange={(e) => setEditForm({ ...editForm, linkedinUrl: e.target.value })} 
                    className="w-full bg-slate-700 border border-slate-600 text-white rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-indigo-500" 
                  />
                </div>
                <div>
                  <label className="block text-slate-300 text-xs font-semibold uppercase tracking-wider mb-1.5">GitHub Profile URL</label>
                  <input 
                    type="text" 
                    value={editForm.githubUrl} 
                    onChange={(e) => setEditForm({ ...editForm, githubUrl: e.target.value })} 
                    className="w-full bg-slate-700 border border-slate-600 text-white rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-indigo-500" 
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 text-xs font-semibold uppercase tracking-wider mb-1.5">Skills (comma separated)</label>
                <input 
                  type="text" 
                  value={editForm.skillsInput} 
                  onChange={(e) => setEditForm({ ...editForm, skillsInput: e.target.value })} 
                  placeholder="e.g. React, Java, Spring Boot, Docker" 
                  className="w-full bg-slate-700 border border-slate-600 text-white rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-indigo-500" 
                />
              </div>

              <div>
                <label className="block text-slate-300 text-xs font-semibold uppercase tracking-wider mb-1.5">About / Bio</label>
                <textarea 
                  rows={4} 
                  value={editForm.bio} 
                  onChange={(e) => setEditForm({ ...editForm, bio: e.target.value })} 
                  className="w-full bg-slate-700 border border-slate-600 text-white rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-indigo-500 resize-none" 
                />
              </div>

              <div className="flex gap-3 pt-3 border-t border-slate-700">
                <button 
                  type="button" 
                  onClick={() => setEditing(false)} 
                  className="flex-1 bg-slate-700 hover:bg-slate-600 text-slate-200 font-semibold py-2.5 rounded-xl transition-colors text-sm"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="flex-1 flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-2.5 rounded-xl transition-colors shadow-lg text-sm"
                >
                  <Save className="w-4 h-4" /> Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
