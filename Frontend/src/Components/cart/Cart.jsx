import { X } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { cartContext } from "../../Reducers/cart/cartContext";
import { Link } from "react-router-dom";
import { getProfile } from "../../api/user";
import { getProducts } from "../../api/product";
import FadeInOnScroll from "../fadeInOnScroll/FadeInOnScroll";
import { useNavigate } from "react-router-dom";
const Cart = () => {
    const { cart,dispatch } = useContext(cartContext);
    const [ totalPrice, setTotalPrice ] = useState(0)
    //const [ quantity, setQuantity ] = useState(1)
    //const [ conformed, setConformed ] = useState(false)
    const navigate = useNavigate();

    const [profile, setProfile] = useState({});

    useEffect(() => {
        getProfile().then(data => {
        setProfile(data); // ✅ met à jour l'état, donc provoque un re-render
        });
    }, []);
    const handleQuantity = async (e, id ) =>{
        const value = parseInt(e.target.value, 10);
        const products = getProducts.data
        const product = products.find(element=>element.id == id)
        //console.log(id)
        dispatch({
            type: "product/updateCount",
            payload: {
                id,
                product,
                count: value,
                preprice: product.current_price * value
            }
        })
    }

    const handleTotalPrice = (e) => {
        let total = 0;
        cart.map((item)=>{
            //console.log(item)
            total = parseInt(item.preprice + total)
        })
        setTotalPrice((prev)=>{
            return total;
        })
    }
    const handleClean = () => {
        dispatch({
            type: "product/clear"
        })
    }

    console.log("Cart => ", cart)

    return(
        <div className="flex w-full justify-center items-center py-10">
            {
                cart.length > 0 ? (
                    <div className="md:w-full">
                        <FadeInOnScroll>
                            <div className="flex flex-col items-center justify-center gap-5">
                                <h2 className="font-extrabold text-2xl">Panier</h2>
                                <div className="w-full   p-5 text-center rounded-3xl mb-20 sm:w-2/3">
                                    <div className="border-b border-orange-300   flex justify-between font-bold py-2">
                                        <p>Produit</p>
                                        <div className="flex w-2/3 justify-around ">
                                            <p>Prix</p>
                                            <p>Quantité</p>
                                            <p>Sous-total</p>
                                        </div>
                                    </div>
                                    {
                                        cart.map((item,index) =>(
                                            <div key={index} className="flex justify-between py-4 mb-10 shadow-lg mt-2  rounded-2xl">
                                                <div className="flex items-center px-2 gap-2">
                                                    <div className="bg-red-500 p-4 rounded-2xl font-extrabold text-red-800 hover:bg-red-600">
                                                        <X onClick={() => dispatch({type:"product/remove", payload: item.id})}/>
                                                    </div>
                                                    <div className="flex flex-col"> 
                                                        <img className="w-10" src={item.product.image} alt="" />
                                                        <p>{item.product.name}</p>
                                                    </div>
                                                </div>
                                                <div className="flex justify-around w-2/3 items-center">
                                                    <p>{item.product.current_price} DHS</p>
                                                    <input 
                                                        className="w-15 py-2 px-2 text-center rounded-2xl bg-gray-100" 
                                                        type="number" 
                                                        value={item.count}
                                                        onChange={(e)=> handleQuantity(e,item.id)}
                                                    />
                                                    <p>{(item.product.current_price * item.count).toFixed(2)} DHS</p>
                                                </div>
                                            </div>
                                        ))
                                    }
                                    <div className="flex flex-col gap-5 sm:flex-row md:justify-center">
                                        <button 
                                        className="bg-orange-400 hover:bg-orange-500 rounded-2xl py-3 px-2"
                                        onClick={handleTotalPrice}
                                        >
                                            Mettre le panier à jour
                                        </button>
                                        <button 
                                        className="bg-orange-400 hover:bg-orange-500 rounded-2xl py-3 px-2"
                                        onClick={handleClean}
                                        >
                                            Vider le panier
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </FadeInOnScroll>
                        <FadeInOnScroll>
                            <div className="flex flex-col gap-5 bg-gray-50 shadow-xl rounded-xl p-10 mb-20 sm:w-120 sm:ml-10">
                                <div className="border-b border-gray-400 text-center">
                                    <p className="font-extrabold">Total panier</p>
                                </div>
                                <div>
                                    <p>Expédition</p>
                                    <div className="p-5">
                                        <div className="pb-2 flex justify-between">
                                            <p>Livraison à domicile:</p>
                                            <p>25 DHS</p>
                                        </div>
                                        <div className="pb-2 flex justify-between">
                                            <p>Ville:</p>
                                            <p>{profile.city}</p>
                                        </div>
                                    </div>
                                    <div className="pb-2 flex justify-between">
                                        <p>Total</p>
                                        <p>{totalPrice} DHS</p>
                                    </div>
                                </div>
                                    <button 
                                        className=" bg-orange-400 hover:bg-orange-500 rounded-2xl py-3 px-5 "
                                        onClick={()=>{
                                            let total = 0;
                                            cart.map((item)=>{
                                                //console.log(item)
                                                total = parseInt(item.preprice + total)
                                            })
                                            if(totalPrice == total){
                                                navigate(`/Checkout/${totalPrice}`);
                                            }else{
                                                alert("Veuillez mettre à jour le panier");
                                            }
                                        }}
                                    >
                                        Valider la commande
                                    </button>
                            </div>
                        </FadeInOnScroll>
                    </div>
                ):(
                    <FadeInOnScroll>
                        <div className="w-full text-center bg-amber-500 p-20 sm:w-200 my-10 rounded-sm">
                            <h2 className="font-bold"> Panier vide</h2>
                            <div className="bg-amber-400">
                                <p className="font-bold">Veillez acheter un produit</p>
                            </div>
                        </div>
                    </FadeInOnScroll>
                )
            }
        </div>
    )
}

export default Cart;