export const uploadResume = async (file) => {
  return new Promise(resolve => setTimeout(() => resolve({ data: { success: true } }), 1500));
};

export const getATSResults = async (userId) => {
  return new Promise(resolve => setTimeout(() => resolve({
    data: {
      overall: 72,
      categories: { keywords: 65, format: 80, skills: 70, experience: 75 },
      missingKeywords: ['Docker', 'Kubernetes', 'CI/CD', 'System Design'],
      feedback: { contact: true, summary: false, experience: true, skills: true, education: true }
    }
  }), 800));
};
