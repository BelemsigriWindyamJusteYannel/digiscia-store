import React, { useState, useEffect } from 'react';
import './index.css'; // Assurez-vous que ce fichier existe et contient vos directives Tailwind
import AuthForm from './components/AuthForm'; // Importez le composant AuthForm
import UserProfile from './components/UserProfile';
import ProductList from './components/ProductList';
import ProductDetail from './components/ProductDetail';
import UserOrders from './components/UserOrders';

function App() {
  // États pour stocker les informations d'authentification de l'utilisateur
  const [accessToken, setAccessToken] = useState(null);
  const [refreshToken, setRefreshToken] = useState(null);
  const [username, setUsername] = useState(null);
  // État pour gérer la page actuellement affichée par l'application
  const [currentPage, setCurrentPage] = useState('login'); // 'login', 'profile', 'products', 'productDetail', 'orders'
  // État pour stocker l'ID du produit sélectionné pour afficher ses détails
  const [selectedProductId, setSelectedProductId] = useState(null);

  // Effet qui s'exécute une seule fois au chargement du composant App
  // Il vérifie si des tokens d'authentification sont déjà stockés localement
  useEffect(() => {
    const storedAccessToken = localStorage.getItem('accessToken');
    const storedRefreshToken = localStorage.getItem('refreshToken');
    const storedUsername = localStorage.getItem('username');

    // Si des tokens et un nom d'utilisateur sont trouvés, l'utilisateur est considéré comme connecté
    if (storedAccessToken && storedRefreshToken && storedUsername) {
      setAccessToken(storedAccessToken);
      setRefreshToken(storedRefreshToken);
      setUsername(storedUsername);
      setCurrentPage('products'); // Redirige l'utilisateur vers la liste des produits
    } else {
      setCurrentPage('login'); // Sinon, affiche la page de connexion
    }
  }, []); // Le tableau vide [] signifie que cet effet ne s'exécute qu'une seule fois au montage

  /**
   * Fonction de rappel (callback) appelée lorsque la connexion ou l'inscription réussit.
   * C'est l'implémentation de 'onLoginSuccess' et 'onSignupSuccess'.
   * @param {string} access - Le token d'accès JWT.
   * @param {string} refresh - Le token de rafraîchissement JWT.
   * @param {string} user - Le nom d'utilisateur.
   */
  const handleAuthSuccess = (access, refresh, user) => {
    // 1. Stocke les tokens et le nom d'utilisateur dans le stockage local du navigateur (localStorage).
    // Cela permet de maintenir la session de l'utilisateur même si la page est fermée puis rouverte.
    localStorage.setItem('accessToken', access);
    localStorage.setItem('refreshToken', refresh);
    localStorage.setItem('username', user);

    // 2. Met à jour les états du composant App.js.
    // Ces mises à jour déclenchent un re-rendu du composant, ce qui permet à l'interface utilisateur
    // de refléter le nouvel état d'authentification (par exemple, afficher le nom d'utilisateur dans la nav bar).
    setAccessToken(access);
    setRefreshToken(refresh);
    setUsername(user);

    // 3. Change la page actuelle de l'application pour rediriger l'utilisateur.
    // Après une authentification réussie, l'utilisateur est généralement dirigé vers une zone de contenu protégée.
    setCurrentPage('products'); // Redirige vers la liste des produits

    console.log(`Authentification réussie pour l'utilisateur: ${user}`);
    console.log('Access Token (pour info, ne pas logguer en production):', access);
    // Il est recommandé de ne pas logger le refresh token en production pour des raisons de sécurité
  };

  /**
   * Fonction pour gérer la déconnexion de l'utilisateur.
   * Elle supprime les tokens du localStorage et réinitialise les états d'authentification.
   */
  const handleLogout = () => {
    // Supprime les tokens du localStorage
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('username');

    // Réinitialise les états d'authentification dans le composant App
    setAccessToken(null);
    setRefreshToken(null);
    setUsername(null);

    // Redirige l'utilisateur vers la page de connexion
    setCurrentPage('login');
  };

  /**
   * Fonction pour ajouter un produit à une commande.
   * @param {number} productId - L'ID du produit à ajouter.
   * @param {number} quantity - La quantité du produit.
   */
  const handleAddProductToOrder = async (productId, quantity) => {
    const currentAccessToken = localStorage.getItem('accessToken');
    if (!currentAccessToken) {
      alert('Vous devez être connecté pour ajouter des produits à une commande.');
      setCurrentPage('login');
      return;
    }

    // Pour simplifier, nous allons créer une nouvelle commande pour chaque ajout de produit.
    // Dans une application e-commerce réelle, vous auriez une logique de "panier" plus complexe.
    try {
      const response = await fetch('http://localhost:8000/api/orders/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${currentAccessToken}`, // Envoi du token d'accès pour l'authentification
        },
        body: JSON.stringify({
          products: [{ product_id: productId, quantity: quantity }]
        }),
      });

      if (response.ok) {
        const newOrder = await response.json();
        alert(`Produit ajouté à la commande #${newOrder.id} avec succès !`);
        setCurrentPage('orders'); // Redirige vers la page des commandes après l'ajout
      } else {
        const errorData = await response.json();
        alert(`Erreur lors de l'ajout du produit à la commande: ${errorData.detail || JSON.stringify(errorData)}`);
      }
    } catch (err) {
      alert('Erreur réseau lors de l\'ajout du produit à la commande.');
      console.error('Erreur:', err);
    }
  };

  // Fonction qui détermine quel composant de page afficher en fonction de l'état 'currentPage'
  const renderPage = () => {
    switch (currentPage) {
      case 'login':
        return (
          // Le composant AuthForm reçoit 'handleAuthSuccess' comme callbacks pour le succès
          <AuthForm
            onLoginSuccess={handleAuthSuccess}
            onSignupSuccess={handleAuthSuccess}
          />
        );
      case 'profile':
        return (
          <UserProfile
            username={username}
            onLogout={handleLogout}
            onNavigateToOrders={() => setCurrentPage('orders')}
          />
        );
      case 'products':
        return (
          <ProductList
            onSelectProduct={(id) => {
              setSelectedProductId(id);
              setCurrentPage('productDetail');
            }}
          />
        );
      case 'productDetail':
        return (
          <ProductDetail
            productId={selectedProductId}
            onBackToList={() => setCurrentPage('products')}
            onAddProductToOrder={handleAddProductToOrder}
          />
        );
      case 'orders':
        return (
          <UserOrders
            username={username}
            onBackToProfile={() => setCurrentPage('profile')}
          />
        );
      default:
        // Par défaut, si currentPage n'est pas reconnu, revenir à la connexion
        return (
          <AuthForm
            onLoginSuccess={handleAuthSuccess}
            onSignupSuccess={handleAuthSuccess}
          />
        );
    }
  };

  return (
    <div className="App">
      {/* Barre de navigation de l'application */}
      <nav className="bg-indigo-600 p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-white text-2xl font-bold">Mon E-commerce</h1>
          <div>
            {/* Affichage conditionnel des liens de navigation selon l'état d'authentification */}
            {accessToken ? (
              <div className="flex space-x-4">
                <button onClick={() => setCurrentPage('products')} className="text-white hover:text-indigo-200">Produits</button>
                <button onClick={() => setCurrentPage('profile')} className="text-white hover:text-indigo-200">Profil ({username})</button>
                <button onClick={() => setCurrentPage('orders')} className="text-white hover:text-indigo-200">Mes Commandes</button>
                <button onClick={handleLogout} className="text-white hover:text-indigo-200">Déconnexion</button>
              </div>
            ) : (
              <div className="flex space-x-4">
                <button onClick={() => setCurrentPage('login')} className="text-white hover:text-indigo-200">Connexion</button>
                {/* Le bouton d'inscription est géré à l'intérieur de AuthForm */}
              </div>
            )}
          </div>
        </div>
      </nav>
      {/* Rendu de la page actuelle */}
      {renderPage()}
    </div>
  );
}

export default App;
