export const sendMessage = async (message) => {
  const responses = [
    "That's a great question! For technical interviews, focus on understanding the underlying concepts rather than just memorizing solutions.",
    "Make sure your resume highlights specific, measurable achievements. Start bullet points with action verbs.",
    "In a behavioral interview, use the STAR method (Situation, Task, Action, Result) to structure your answers.",
    "System design questions are about trade-offs. Always explain why you chose a specific database or architecture.",
    "Don't forget to ask thoughtful questions at the end of your interview. It shows you're genuinely interested in the role."
  ];
  return new Promise(resolve => setTimeout(() => resolve({
    data: { text: responses[Math.floor(Math.random() * responses.length)] }
  }), 800));
};
