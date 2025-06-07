import { useContext, useState } from "react";
//import { useAuth } from '../context/UserContext'; // Importez useAuth
import { getProfile } from "../api/user";
import { useNavigate } from "react-router-dom";
import FadeInOnScroll from "../Components/fadeInOnScroll/FadeInOnScroll";
import { uContext } from '../Reducers/user/uContext'
import { saveToken,login,signup } from "../api/accountServices";

export default function Login() { // Renommé AuthForm en Login
  const navigate = useNavigate();
  //const { login } = useAuth(); // Accédez à la fonction login du contexte
  const { user,userDispatch } = useContext(uContext);

  const [isLoginView, setIsLoginView] = useState(true); // true = formulaire login, false = inscription

  // États pour inscription
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [signEmail, setSignEmail] = useState("");
  const [signPassword, setSignPassword] = useState("");
  const [conSignPassword, setConSignPassword] = useState("");
  const [signupCity, setSignupCity] = useState("");
  const [signupPostalCode, setSignupPostalCode] = useState("");
  const [signupError, setSignupError] = useState(null);
  const [signupMessage, setSignupMessage] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState("");

  // États pour login
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginError, setLoginError] = useState(null);
  const [loginMessage, setLoginMessage] = useState(null);

  // Fonction pour inscription
  const handleSignup = async (e) => {
    e.preventDefault();
    setSignupError(null);
    setSignupMessage(null);

    if (signPassword !== conSignPassword) {
      setSignupError("Les mots de passe ne correspondent pas.");
      return;
    }

    const signupData = {
      username: signEmail,
      email: signEmail,
      password: signPassword,
      first_name: firstName,
      last_name: lastName,
      city: signupCity,
      postal_code: signupPostalCode,
      phone_number: phoneNumber
    };

    try {
      const data = await signup(signupData); 
      console.log(data)
      setSignupMessage("Compte créé avec succès ! Veuillez vous connecter.");

      // Réinitialiser le formulaire
      setFirstName("");
      setLastName("");
      setSignEmail("");
      setSignPassword("");
      setConSignPassword("");
      setSignupCity("");
      setSignupPostalCode("");
      setIsLoginView(true); // Basculer vers le formulaire de connexion
      
      await getProfile()
      .then(data=>{
        userDispatch({
            type :"user/add", 
            payload: {
                user: data,
            } 
        })
      })
      
    } catch (error) {
      if (error.response) {
        setSignupError(error.response.data.detail || JSON.stringify(error.response.data));
      } else if (error.request) {
        setSignupError("Aucune réponse du serveur. Le serveur est peut-être hors ligne.");
      } else {
        setSignupError("Erreur lors de l'envoi de la requête: " + error.message);
      }
      console.error("Erreur lors de l'inscription:", error);
    }
  };

  // Fonction pour la connexion
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError(null);
    setLoginMessage(null);

    try {
      setLoginMessage("Connexion réussie !");
      await login(loginUsername, loginPassword)
      .then(data=>{
        //console.log("data =>",data)
        //console.log("access =>",data.data.access)
        //console.log("refresh =>",data.data.refresh)
        saveToken(data.data.access,data.data.refresh);
      });

      // Réinitialiser le formulaire
      setLoginUsername("");
      setLoginPassword("");
      
      await getProfile()
      .then(data=>{
        userDispatch({
            type :"user/add", 
            payload: {
                user: data,
            } 
        })
      })
      
      navigate("/");
      //window.location.href = window.location.href;
    } catch (error) {
      if (error.response) {
        setLoginError(error.response.data.detail || JSON.stringify(error.response.data));
      } else if (error.request) {
        setLoginError("Aucune réponse du serveur. Le serveur est peut-être hors ligne.");
      } else {
        setLoginError("Erreur lors de la connexion: " + error.message);
      }
      console.error("Erreur lors de la connexion:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-10">
      {isLoginView ? (
        // Formulaire de connexion
        <FadeInOnScroll>
          <form onSubmit={handleLogin} className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Connexion</h2>
            <div className="space-y-4">
              <div>
                <label htmlFor="loginUsername" className="block text-sm font-medium text-gray-700">Nom d'utilisateur / Email</label>
                <input
                  type="text"
                  id="loginUsername"
                  placeholder="Nom d'utilisateur ou Email"
                  value={loginUsername}
                  onChange={(e) => setLoginUsername(e.target.value)}
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label htmlFor="loginPassword" className="block text-sm font-medium text-gray-700">Mot de passe</label>
                <input
                  type="password"
                  id="loginPassword"
                  placeholder="Mot de passe"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Se connecter
              </button>
            </div>
            {loginMessage && <p className="mt-4 text-center text-green-600">{loginMessage}</p>}
            {loginError && <p className="mt-4 text-center text-red-600">Erreur: {loginError}</p>}

            <p className="mt-6 text-center text-sm text-gray-600">
              Vous n'avez pas de compte ?{" "}
              <button
                type="button"
                className="font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none"
                onClick={() => {
                  setIsLoginView(false);
                  setLoginError(null);
                  setLoginMessage(null);
                }}
              >
                Inscrivez-vous
              </button>
            </p>
          </form>  
        </FadeInOnScroll>
      ) : (
        // Formulaire d'inscription
        <FadeInOnScroll>
          <form
            onSubmit={handleSignup}
            className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md"
          >
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Inscription</h2>
            <div className="space-y-4">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">Prénom</label>
                <input
                  type="text"
                  id="firstName"
                  placeholder="Prénom"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Nom</label>
                <input
                  type="text"
                  id="lastName"
                  placeholder="Nom"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label htmlFor="signEmail" className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  id="signEmail"
                  placeholder="Email"
                  value={signEmail}
                  onChange={(e) => setSignEmail(e.target.value)}
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label htmlFor="signPassword" className="block text-sm font-medium text-gray-700">Mot de passe</label>
                <input
                  type="password"
                  id="signPassword"
                  placeholder="Mot de passe"
                  value={signPassword}
                  onChange={(e) => setSignPassword(e.target.value)}
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label htmlFor="conSignPassword" className="block text-sm font-medium text-gray-700">Confirmer le mot de passe</label>
                <input
                  type="password"
                  id="conSignPassword"
                  placeholder="Confirmer le mot de passe"
                  value={conSignPassword}
                  onChange={(e) => setConSignPassword(e.target.value)}
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label htmlFor="signupCity" className="block text-sm font-medium text-gray-700">Ville</label>
                <input
                  type="text"
                  id="signupCity"
                  placeholder="Ville"
                  value={signupCity}
                  onChange={(e) => setSignupCity(e.target.value)}
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label htmlFor="signupPostalCode" className="block text-sm font-medium text-gray-700">Postal Code</label>
                <input
                  type="text"
                  id="signupPostalCode"
                  placeholder="Code Postal"
                  value={signupPostalCode}
                  onChange={(e) => setSignupPostalCode(e.target.value)}
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label htmlFor="phone_number" className="block text-sm font-medium text-gray-700">Phone Number</label>
                <input
                  type="text"
                  id="phone_number"
                  placeholder="Phone number"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>

              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                S'inscrire
              </button>
            </div>

            {signupMessage && <p className="mt-4 text-center text-green-600">{signupMessage}</p>}
            {signupError && <p className="mt-4 text-center text-red-600">Erreur: {signupError}</p>}

            <p className="mt-4 text-center text-sm text-gray-600">
              Vous avez déjà un compte ?{" "}
              <button
                type="button"
                className="font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none"
                onClick={() => {
                  setIsLoginView(true);
                  setSignupError(null);
                  setSignupMessage(null);
                }}
              >
                Connectez-vous
              </button>
            </p>
          </form>
        </FadeInOnScroll>
      )}
    </div>
  );
}
