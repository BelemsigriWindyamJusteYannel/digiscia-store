import api from './api';

export const getProfile = async () => {
  const response = await api.get('profile/');
  return response.data;
};


export const modifyClient = async (client) => {
  const response = await api.put(`client/update/`,client);
  return response.data;
}