import { X } from "lucide-react";
import image from "./Laptop.jpeg"
import { useContext, useReducer, useState } from "react";
import { cartContext } from "../../Reducer/cartContext";
const Card = () => {
    const { cart,dispatch } = useContext(cartContext);
    const [ totalPrice, setTotalPrice ] = useState(0)
    //const [ quantity, setQuantity ] = useState(1)
    const handleQuantity = (e, id ) =>{
        const value = parseInt(e.target.value, 10);
        dispatch({
            type: "product/updateCount",
            payload: {
                id,
                count: value,
            }
        })
    }

    const handleTotalPrice = (e) => {
        let total = 0;
        cart.map((item)=>{
            console.log(item)
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

    return(
        <div className="flex w-full justify-center items-center">
            {
                cart.length > 0 ? (
                    <div className="md:w-full">
                        <div className="flex flex-col items-center justify-center gap-5">
                            <h2 className="font-extrabold text-2xl">Panier</h2>
                            <div className="w-full bg-orange-300  p-5 text-center rounded-3xl mb-20 sm:w-2/3">
                                <div className="border-b border-gray-400 flex justify-between">
                                    <p>Produit</p>
                                    <div className="flex w-2/3 justify-around">
                                        <p>Prix</p>
                                        <p>Quantité</p>
                                        <p>Sous-total</p>
                                    </div>
                                </div>
                                {
                                    cart.map((item,index) =>(
                                        <div key={index} className="flex justify-between py-4 mb-10 border-b border-gray-400 rounded-2xl">
                                            <div className="flex items-center ">
                                                <X onClick={() => dispatch({type:"product/remove", payload: item.id})}/>
                                                <div className="flex flex-col">
                                                    <img className="w-10" src={image} alt="" />
                                                    <p>{item.cartItem.name}</p>
                                                </div>
                                            </div>
                                            <div className="flex justify-around w-2/3 items-center">
                                                <p>{item.cartItem.price} DHS</p>
                                                <input 
                                                    className="w-15 py-2 px-2 text-center rounded-2xl bg-gray-100" 
                                                    type="number" 
                                                    value={item.count}
                                                    onChange={(e)=> handleQuantity(e,item.id)}
                                                />
                                                <p>{item.cartItem.price * item.count} DHS</p>
                                            </div>
                                        </div>
                                    ))
                                }
                                <div className="flex flex-col gap-5 sm:flex-row md:justify-center">
                                    <button 
                                    className="bg-amber-400 rounded-2xl p-2"
                                    onClick={handleTotalPrice}
                                    >
                                        Mettre le panier à jour
                                    </button>
                                    <button 
                                    className="bg-amber-400 rounded-2xl p-2"
                                    onClick={handleClean}
                                    >
                                        Vider le panier
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col gap-5 bg-amber-500 rounded-3xl p-10 mb-20 sm:w-120 sm:ml-10">
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
                                        <p>Nom Ville</p>
                                    </div>
                                </div>
                                <div className="pb-2 flex justify-between">
                                    <p>Total</p>
                                    <p>{totalPrice} DHS</p>
                                </div>
                            </div>
                            <button className=" bg-amber-600 rounded-2xl py-2 px-5 ">
                                Valider la commande
                            </button>
                        </div>
                    </div>
                ):(
                    <div className="w-full text-center bg-amber-500 p-20 sm:w-200 my-10 rounded-sm">
                        <h2 className="font-bold"> Panier vide</h2>
                        <div className="bg-amber-400">
                            <p className="font-bold">Veillez acheter un produit</p>
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default Card;