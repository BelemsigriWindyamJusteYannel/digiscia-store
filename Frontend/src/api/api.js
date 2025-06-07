
import axios from 'axios'
import { isLogged,getToken } from './accountServices'
const api = axios.create({
  baseURL:'http://localhost:8000/',
  headers:{
    "Content-Type":"application/json",
  }
})

api.interceptors.request.use(
  (config) => {
    const access = localStorage.getItem('access');
    if (access) {
      config.headers.Authorization = `Bearer ${access}`;
    }
    return config;
  }
)

export default api;





/*
import axios from 'axios';

// Crée une instance Axios avec une URL de base
const api = axios.create({
  baseURL: 'http://localhost:8000/', // Votre URL de base pour l'API Django
  headers: {
    'Content-Type': 'application/json',
  },
});

// Variable pour stocker la requête de rafraîchissement du token
// Cela permet d'éviter des appels multiples de rafraîchissement si plusieurs requêtes échouent simultanément
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

// Intercepteur de requêtes : ajoute le token d'accès à chaque requête
api.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Intercepteur de réponses : gère le rafraîchissement du token en cas d'expiration
api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // Si l'erreur est 401 (Unauthorized) et n'est pas une tentative de rafraîchissement déjà
    // et que ce n'est pas l'endpoint de login/signup (pour éviter les boucles)
    if (error.response.status === 401 && !originalRequest._retry && !originalRequest.url.includes('/token/') && !originalRequest.url.includes('/signup/')) {
      originalRequest._retry = true; // Marque la requête comme déjà tentée de rafraîchir

      if (isRefreshing) {
        // Si un rafraîchissement est déjà en cours, ajoute la requête originale à la file d'attente
        return new Promise(function(resolve, reject) {
          failedQueue.push({ resolve, reject });
        })
          .then(token => {
            originalRequest.headers['Authorization'] = 'Bearer ' + token;
            return api(originalRequest); // Retente la requête originale avec le nouveau token
          })
          .catch(err => {
            return Promise.reject(err);
          });
      }

      isRefreshing = true; // Indique qu'un rafraîchissement est en cours

      const refreshToken = localStorage.getItem('refreshToken');
      if (!refreshToken) {
        // Si pas de refresh token, l'utilisateur doit se reconnecter
        // Déclenche une déconnexion globale (à implémenter dans AuthContext)
        // Note: L'AuthContext devra être importé ou la fonction logout passée ici
        // Pour l'instant, nous allons juste rejeter et laisser le composant gérer la redirection
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('username');
        processQueue(error, null); // Vide la file d'attente avec l'erreur
        return Promise.reject(error);
      }

      try {
        const response = await axios.post('http://localhost:8000/api/token/refresh/', { refresh: refreshToken });
        const { access, refresh } = response.data;

        localStorage.setItem('accessToken', access);
        localStorage.setItem('refreshToken', refresh);

        api.defaults.headers.common['Authorization'] = `Bearer ${access}`;
        processQueue(null, access); // Résout toutes les requêtes en attente avec le nouveau token

        return api(originalRequest); // Retente la requête originale avec le nouveau token
      } catch (refreshError) {
        // Si le rafraîchissement échoue (refresh token invalide/expiré), déconnecte l'utilisateur
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('username');
        processQueue(refreshError, null); // Vide la file d'attente avec l'erreur de rafraîchissement
        // Vous devrez peut-être déclencher une déconnexion globale via un événement ou un contexte ici
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }
    return Promise.reject(error);
  }
);

export default api;
*/