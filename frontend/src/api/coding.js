import client from './client';

export const getProblems = async () => {
  return client.get('/problems');
};

export const getProblem = async (id) => {
  return client.get(`/problems/${id}`);
};

export const createProblem = async (problemData) => {
  return client.post('/problems', problemData);
};

export const updateProblem = async (id, problemData) => {
  return client.put(`/problems/${id}`, problemData);
};

export const deleteProblem = async (id) => {
  return client.delete(`/problems/${id}`);
};

export const submitSolution = async ({ id, code, language }) => {
  return client.post(`/problems/${id}/submit`, { code, language });
};

