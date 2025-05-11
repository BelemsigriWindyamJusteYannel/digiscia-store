import { X } from "lucide-react";
import image from "./Laptop.jpeg"
const Card = () => {
    return(
        <div>
            <div className="flex flex-col items-center justify-center gap-5">
                <h2 className="font-extrabold text-2xl">Panier</h2>
                <div className="w-full bg-[#b0e0e6a9]  p-5 text-center rounded-3xl mb-20 sm:w-2/3">
                    <div className="border-b border-gray-400 flex justify-between">
                        <p>Produit</p>
                        <div className="flex w-2/3 justify-around">
                            <p>Prix</p>
                            <p>Quantité</p>
                            <p>Sous-total</p>
                        </div>
                    </div>
                    <div className="flex justify-between py-4 mb-10 border-b border-gray-400 rounded-2xl">
                        <div className="flex items-center ">
                            <X />
                            <div className="flex flex-col">
                                <img className="w-10" src={image} alt="" />
                                <p>HP Laptop 15...</p>
                            </div>
                        </div>
                        <div className="flex justify-around w-2/3 items-center">
                            <p>5000 DHS</p>
                            <input className="w-15 py-2 px-2 text-center rounded-2xl bg-gray-100" type="number" value={2}/>
                            <p>10000 DHS</p>
                        </div>
                    </div>
                    <button className="bg-blue-500 rounded-2xl p-2">
                        Mettre le panier à jour
                    </button>
                </div>
            </div>
            <div className="flex flex-col gap-5 bg-[#ffffffab] rounded-3xl p-10 mb-20 sm:w-120 sm:ml-10">
                <div className="border-b border-gray-400 text-center">
                    <p>Total panier</p>
                </div>
                <div>
                    <p>Expédition</p>
                    <div className="p-5">
                        <div className="pb-2 flex justify-between">
                            <p>Livraison à domicile:</p>
                            <p>Prix</p>
                        </div>
                        <div className="pb-2 flex justify-between">
                            <p>Ville:</p>
                            <p>Nom Ville</p>
                        </div>
                    </div>
                    <div className="pb-2 flex justify-between">
                        <p>Total</p>
                        <p>Prix</p>
                    </div>
                </div>
                <button className=" bg-blue-500 rounded-2xl py-2 px-5 ">
                    Valider la commande
                </button>
            </div>
        </div>
    )
}

export default Card;