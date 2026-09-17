export const getProblems = async () => {
  return new Promise(resolve => setTimeout(() => resolve({
    data: [
      { id: 1, title: 'Two Sum', difficulty: 'Easy', tags: ['Array', 'Hash Table'], acceptance: '49.5%', solved: true },
      { id: 2, title: 'Add Two Numbers', difficulty: 'Medium', tags: ['Linked List', 'Math'], acceptance: '40.2%', solved: false },
      { id: 3, title: 'Longest Substring Without Repeating Characters', difficulty: 'Medium', tags: ['Hash Table', 'String'], acceptance: '33.8%', solved: false },
      { id: 4, title: 'Median of Two Sorted Arrays', difficulty: 'Hard', tags: ['Array', 'Binary Search'], acceptance: '36.1%', solved: false },
      { id: 5, title: 'Valid Parentheses', difficulty: 'Easy', tags: ['String', 'Stack'], acceptance: '40.4%', solved: true },
    ]
  }), 500));
};

export const getProblem = async (id) => {
  return new Promise(resolve => setTimeout(() => resolve({
    data: {
      id,
      title: 'Two Sum',
      difficulty: 'Easy',
      description: 'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.\n\nYou may assume that each input would have exactly one solution, and you may not use the same element twice.\n\nYou can return the answer in any order.',
      examples: [
        { input: 'nums = [2,7,11,15], target = 9', output: '[0,1]', explanation: 'Because nums[0] + nums[1] == 9, we return [0, 1].' }
      ],
      constraints: ['2 <= nums.length <= 10^4', '-10^9 <= nums[i] <= 10^9', '-10^9 <= target <= 10^9', 'Only one valid answer exists.']
    }
  }), 300));
};

export const submitSolution = async (data) => {
  return new Promise(resolve => setTimeout(() => {
    const isAccepted = Math.random() > 0.2;
    resolve({
      data: {
        status: isAccepted ? 'Accepted' : 'Wrong Answer',
        runtime: isAccepted ? '54 ms' : null,
        memory: isAccepted ? '42.1 MB' : null,
        expected: isAccepted ? '[0,1]' : '[0,1]',
        actual: isAccepted ? '[0,1]' : '[1,2]'
      }
    });
  }, 1000));
};
