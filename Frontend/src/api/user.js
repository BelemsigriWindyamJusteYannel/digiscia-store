import api from './api'; // Importe l'instance Axios configurée

// Fonction pour l'inscription d'un nouvel utilisateur
export const signup = async (userData) => {
  const response = await api.post('signup/', userData);
  return response.data;
};

// Fonction pour la connexion de l'utilisateur
export const login1 = async (username, password) => {
  const response = await api.post('token/', { username, password });
  return response.data;
};

// Fonction pour récupérer le profil de l'utilisateur connecté
export const getProfile = async () => {
  const response = await api.get('profile/');
  return response.data;
};

// Fonction pour la déconnexion (blacklistage du refresh token)
export const logout = async (refreshToken) => {
  const response = await api.post('logout/', { refresh: refreshToken });
  return response.data;
};

export default {
  signup,
  login1,
  getProfile,
  logout
}