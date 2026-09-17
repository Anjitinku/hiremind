export const getCareerMatch = async (userId) => {
  return new Promise(resolve => setTimeout(() => resolve({
    data: {
      score: 74,
      breakdown: { ats: 72, coding: 68, interview: 82 },
      companies: [
        { name: 'Google', match: 85, role: 'Software Engineer', salary: '$150k - $200k' },
        { name: 'Stripe', match: 78, role: 'Backend Developer', salary: '$140k - $190k' },
        { name: 'Airbnb', match: 92, role: 'Frontend Engineer', salary: '$130k - $170k' },
        { name: 'Notion', match: 88, role: 'Full Stack Developer', salary: '$120k - $160k' },
      ],
      skillsToLearn: [
        { name: 'Docker', relevance: 95 },
        { name: 'System Design', relevance: 88 },
        { name: 'GraphQL', relevance: 75 },
        { name: 'AWS', relevance: 82 },
      ],
      salaryEstimate: '$95K - $130K',
      trends: [
        { role: 'AI Engineer', growth: '+45%' },
        { role: 'Data Scientist', growth: '+20%' },
        { role: 'Cloud Architect', growth: '+30%' }
      ]
    }
  }), 600));
};
