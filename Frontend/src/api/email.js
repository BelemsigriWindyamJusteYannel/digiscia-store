import api from "./api";

export const sendOrderConfirmation = async (profile) => {
    const response = await api.post("send-email/",{
        to: profile.user.email,
        subject: 'Validation de commande',
        message: 'Votre Commande a été valider avec succès',
    })
    return response;
}


/*
axios.post('http://localhost:8000/api/send-email/', {
  to: 'windyamjusteyannel.belemsigri@usmba.ac.ma',
  subject: 'Prise en contact concernant le Projet de Stage',
  message: 'Nous devons nous rencontrer demain à 15h30 pour entamer l implémentation de notre projet.',
})
.then(response => {
  console.log(response.data.status);
})
.catch(error => {
  console.error('Erreur:', error);
});

*/