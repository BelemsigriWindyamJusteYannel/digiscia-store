/*
import { createContext, useState, useEffect, useContext } from 'react';
import * as userApi from '../api/user'; // Importe toutes les fonctions de user.js

// Crée le contexte d'authentification
export const UserContext = createContext(null);

// Composant fournisseur d'authentification
export const UserProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(null);
  const [refreshToken, setRefreshToken] = useState(null);
  const [username, setUsername] = useState(null);
  const [loading, setLoading] = useState(true); // Pour gérer le chargement initial des tokens

  // Vérifie les tokens dans le localStorage au chargement initial
  useEffect(() => {
    const storedAccessToken = localStorage.getItem('accessToken');
    const storedRefreshToken = localStorage.getItem('refreshToken');
    const storedUsername = localStorage.getItem('username');

    if (storedAccessToken && storedRefreshToken && storedUsername) {
      setAccessToken(storedAccessToken);
      setRefreshToken(storedRefreshToken);
      setUsername(storedUsername);
    }
    setLoading(false); // Le chargement initial est terminé
  }, []);


  const login = (access, refresh, user) => {
    localStorage.setItem('accessToken', access);
    localStorage.setItem('refreshToken', refresh);
    localStorage.setItem('username', user);
    setAccessToken(access);
    setRefreshToken(refresh);
    setUsername(user);
  };


  const logout = async () => {
    const currentRefreshToken = localStorage.getItem('refreshToken');
    if (currentRefreshToken) {
      try {
        // Appelle la fonction de déconnexion de l'API utilisateur
        await userApi.logout(currentRefreshToken);
      } catch (error) {
        console.error("Erreur lors de la déconnexion côté serveur:", error);
        // Continue la déconnexion locale même si l'appel serveur échoue
      }
    }
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('username');
    setAccessToken(null);
    setRefreshToken(null);
    setUsername(null);
  };

  // Le contexte fournit l'état d'authentification et les fonctions
  const authContextValue = {
    accessToken,
    refreshToken,
    username,
    isAuthenticated: !!accessToken, // Dérive si l'utilisateur est authentifié
    login, // Fonction pour se connecter (met à jour l'état du contexte)
    logout, // Fonction pour se déconnecter
    loading, // Expose l'état de chargement initial
  };

  return (
    <UserContext.Provider value={authContextValue}>
      {children}
    </UserContext.Provider>
  );
};

// Hook personnalisé pour utiliser le contexte d'authentification plus facilement
export const useAuth = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useAuth doit être utilisé à l\'intérieur d\'un AuthProvider');
  }
  return context;
};
*/