import client from './client';

export const getJobs = async (filters) => {
  // Mock API call
  return new Promise(resolve => setTimeout(() => resolve({
    data: [
      { id: 1, title: 'Senior React Developer', company: 'TechCorp', location: 'Remote', salary: '$120k - $150k', skills: ['React', 'TypeScript'], type: 'Full-time', postedAt: '2 days ago' },
      { id: 2, title: 'Backend Engineer', company: 'DataSystems', location: 'New York, NY', salary: '$130k - $160k', skills: ['Node.js', 'PostgreSQL'], type: 'Full-time', postedAt: '5 days ago' },
      { id: 3, title: 'Frontend Developer', company: 'WebSolutions', location: 'San Francisco, CA', salary: '$110k - $140k', skills: ['Vue', 'CSS'], type: 'Contract', postedAt: '1 week ago' },
    ]
  }), 500));
};

export const getJob = async (id) => {
  return new Promise(resolve => setTimeout(() => resolve({ data: { id, title: 'Senior React Developer', company: 'TechCorp' } }), 200));
};

export const applyToJob = async (id) => {
  return new Promise(resolve => setTimeout(() => resolve({ data: { success: true } }), 500));
};

export const postJob = async (data) => {
  return new Promise(resolve => setTimeout(() => resolve({ data: { success: true, job: data } }), 500));
};
