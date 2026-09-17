export const submitTranscript = async (data) => {
  return new Promise(resolve => setTimeout(() => resolve({
    data: {
      score: 82,
      subcategories: { clarity: 85, relevance: 80, depth: 78, confidence: 84 },
      feedback: "Great answer! You covered the key points well, but could elaborate more on specific metrics."
    }
  }), 1500));
};

export const getInterviewHistory = async (userId) => {
  return new Promise(resolve => setTimeout(() => resolve({
    data: [
      { id: 1, type: 'Technical', date: '2024-03-01', score: 85 },
      { id: 2, type: 'Behavioral', date: '2024-02-15', score: 90 }
    ]
  }), 500));
};
