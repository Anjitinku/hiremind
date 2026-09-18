import client from './client';

export const getAdminStats = async () => {
  return client.get('/admin/stats');
};

export const getAllUsers = async () => {
  return client.get('/admin/users');
};

export const deleteUser = async (id) => {
  return client.delete(`/admin/users/${id}`);
};