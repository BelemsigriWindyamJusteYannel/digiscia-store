import { useParams } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { cartContext } from "../Reducers/cart/cartContext";
import { getProfile } from "../api/user";
import { setCommande } from "../api/command";
import { sendOrderConfirmation } from "../api/email";
import { useNavigate } from "react-router-dom";
import FadeInOnScroll from "../Components/fadeInOnScroll/FadeInOnScroll";
const CheckOut = () => {
    const [profile, setProfile] = useState({});
    const { dispatch } = useContext(cartContext)
    const navigate = useNavigate();
    useEffect(() => {
    getProfile().then(data => {
        setProfile(data);
    });
    }, []);

    const [ cardChecked, setCardChecked ] = useState(false)

    const { cart } = useContext(cartContext)
    console.log("cart =>",cart)
    const { totalPrice } = useParams();
    console.log("cart total price =>",totalPrice)

    const products = []
    cart.map((item)=>{
        products.push({"product_id": item.id , "quantity": item.count})
    })
    console.log("products to be inserted =>",products)

    // cleaning the cart
    const handleClean = () => {
        dispatch({
            type: "product/clear"
        })
    }

    return(
        <FadeInOnScroll>
            <div className="bg-gray-200">
                <div className="w-full max-w-3xl mx-auto p-8">
                    <div className="bg-white p-8 rounded-lg shadow-md">
                        <h1 className="text-2xl font-bold text-gray-800 mb-4">Checkout</h1>
                        <div className="mb-6 ">
                            <h2 className="text-xl font-semibold text-gray-700 mb-2">Shipping Address</h2>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="first_name" className="block text-gray-700 mb-1">First Name</label>
                                    <input 
                                        type="text" 
                                        id="first_name" 
                                        className="w-full rounded-lg border py-2 px-3 "
                                        value={profile.first_name}    
                                    />
                                </div>
                                <div>
                                    <label htmlFor="last_name" className="block text-gray-700 mb-1">Last Name</label>
                                    <input 
                                        type="text" 
                                        id="last_name" 
                                        className="w-full rounded-lg border py-2 px-3"
                                        value={profile.last_name} 
                                    />
                                </div>
                            </div>
                            <div className="mt-4">
                                <label htmlFor="number" className="block text-gray-700 mb-1">Phone Number</label>
                                <input 
                                    type="text" 
                                    id="number" 
                                    className="w-full rounded-lg border py-2 px-3"
                                    value={profile.phone_number}  
                                />
                            </div>
                            <div className="mt-4">
                                <label htmlFor="city" className="block text-gray-700 mb-1">City</label>
                                <input 
                                    type="text" 
                                    id="city" 
                                    className="w-full rounded-lg border py-2 px-3"
                                    value={profile.city}     
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4 mt-4">
                                <div>
                                    <label htmlFor="zip" className="block text-gray-700 mb-1">ZIP Code</label>
                                    <input 
                                        type="text" 
                                        id="zip" 
                                        className="w-full rounded-lg border py-2 px-3"
                                        value={profile.postal_code}     
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="flex space-x-2">
                            <div>
                                <h1 className="text-xl font-semibold text-gray-700">Paiement à la livraison</h1>
                                <input 
                                    type="checkbox" 
                                    value={!cardChecked} 
                                    checked={!cardChecked}
                                    onChange={(e)=>{
                                        if(cardChecked){
                                            setCardChecked((prev)=>{
                                                return false
                                            })
                                        }
                                    }}
                                />
                            </div>
                            <div>
                                <h1 className="text-xl font-semibold text-gray-700">Paimenent par carte</h1>
                                <input 
                                    type="checkbox" 
                                    value={cardChecked}
                                    checked={cardChecked}
                                    onChange={(e)=>{
                                        setCardChecked((prev)=>{
                                            return true
                                        })
                                    }}
                                />
                            </div>
                        </div>
                    {
                            cardChecked ? 
                            (
                                <div>
                                    <h2 className="text-xl font-semibold text-gray-700 mb-2">Payment Information</h2>
                                    <div className="mt-4">
                                        <label htmlFor="card_number" className="block text-gray-700 mb-1">Card Number</label>
                                        <input type="text" id="card_number" className="w-full rounded-lg border py-2 px-3"/>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4 mt-4">
                                        <div>
                                            <label htmlFor="exp_date" className="block text-gray-700 mb-1">Expiration Date</label>
                                            <input type="text" id="exp_date" className="w-full rounded-lg border py-2 px-3"/>
                                        </div>
                                        <div>
                                            <label htmlFor="cvv" className="block text-gray-700 mb-1">CVV</label>
                                            <input type="text" id="cvv" className="w-full rounded-lg border py-2 px-3"/>
                                        </div>
                                    </div>
                                </div>

                            ) : (
                                <></>
                            )
                    }
                        <div className="mt-8 flex justify-end">
                            <button 
                                className="bg-teal-500 text-white px-4 py-2 rounded-lg hover:bg-teal-700"
                                onClick={ async ()=>{
                                    const response = await setCommande(products);
                                    console.log("response =>",response);
                                    handleClean();
                                    sendOrderConfirmation(profile)
                                    .then(response => {
                                        console.log(response.data.status);
                                        alert("Commande enregistrée avec succès, un mail de confirmation vous sera envoyé");
                                    })
                                    .catch(error => {
                                        console.error('Erreur:', error);
                                    })
                                    .finally(()=>{
                                        navigate("/")
                                    });
                                }}    
                            >Place Order</button>
                        </div>
                    </div>
                </div>
            </div>
        </FadeInOnScroll>
    )
}

export default CheckOut;