import axios from 'axios';


export const products = await axios.get("http://localhost:8000/products").then(data=>{
    return data.data;
})

export const categories = await axios.get("http://localhost:8000/categories").then( data=>{
    return data.data;
})

console.log("Categories => ", categories)
console.log("Products => ", products)





/*

axios.post('http://localhost:8000/send-email/', {
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