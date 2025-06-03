import { X } from "lucide-react";
import { TrashIcon } from "lucide-react"
import { useContext, useEffect, useState } from "react";
import { cartContext } from "../../Reducers/cart/cartContext";
import { Link } from "react-router-dom";
import { getProfile } from "../../api/user";
import { getProducts } from "../../api/product";
import FadeInOnScroll from "../fadeInOnScroll/FadeInOnScroll";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
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
        if(value > 0){
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
        <div className="flex flex-col w-full justify-center items-center py-10">
            {
                cart.length > 0 ? (
                    <div className="w-full">
                        <FadeInOnScroll>
                            <div className="flex flex-col items-center justify-center gap-5">
                                <h2 className="font-extrabold text-2xl">Panier</h2>
                                <div className="w-full  text-center rounded-3xl mb-20 ">
                                    <div className="border-b border-orange-300 flex justify-between font-bold py-2">
                                        <p>Produits :</p>
                                    </div>
                                    {
                                        cart.map((item,index) =>(
                                            <div key={index} className="flex justify-around items-center py-10 mb-10 shadow-lg mt-2 rounded-2xl ">
                                                <div className="">
                                                    <div className="flex flex-col sm:flex-row flex-1/4 gap-2 "> 
                                                        <img className="w-20 rounded-xl" src={item.product.image} alt="" />
                                                        <div className="flex flex-col items-start">
                                                            <p>{item.product.name}</p>
                                                            <p>prix unitaire : {item.product.current_price} DHS</p>
                                                        </div>
                                                    </div>
                                                    <div className="flex flex-col sm:flex-row justify-around items-center gap-5">
                                                        <div className="flex justify-start items-center gap-2">
                                                            <label htmlFor="quantity">Quantité : </label>
                                                            <input 
                                                                className="w-15 py-1 px-2 text-center rounded-xl bg-gray-200 border border-gray-300" 
                                                                id="quantity"
                                                                type="number"
                                                                value={item.count}
                                                                onChange={(e)=> handleQuantity(e,item.id)}
                                                            />
                                                        </div>
                                                        <div>
                                                            <p>Sous-total : {(item.product.current_price * item.count).toFixed(2)} DHS</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                
                                                <Button 
                                                    onClick={() => dispatch({type:"product/remove", payload: item.id})}
                                                    variant="destructive"    
                                                >
                                                    <TrashIcon className="-ms-1 opacity-60" size={16} aria-hidden="true" />
                                                    Enlever
                                                </Button>
                                            </div>
                                        ))
                                    }
                                    <div className="flex flex-col gap-5 sm:flex-row justify-center items-center">
                                        <Button 
                                        className="bg-orange-400 hover:bg-orange-500 text-[#fff]"
                                        onClick={handleTotalPrice}
                                        >
                                            Mettre le panier à jour
                                        </Button>
                                        <Button 
                                        className="bg-orange-400 hover:bg-orange-500 text-[#fff]"
                                        onClick={handleClean}
                                        >
                                            Vider le panier
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </FadeInOnScroll>
                        <FadeInOnScroll>
                            <div className="flex flex-col gap-5 bg-gray-50 shadow-xl rounded-xl p-10 mb-20 sm:w-120 sm:ml-10  border border-[#00000050]">
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
                                    <Button 
                                        className=" bg-orange-400 hover:bg-orange-500 text-[#fff]"
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
                                    </Button>
                            </div>
                        </FadeInOnScroll>
                    </div>
                ):(
                    <FadeInOnScroll>
                        <div className="w-full text-center bg-amber-500 p-20 my-10 rounded-sm">
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