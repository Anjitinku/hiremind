import client from './client';

export const getMyProfile = async () => {
  return client.get('/users/me');
};

export const updateMyProfile = async (profileData) => {
  return client.put('/users/me', profileData);
};