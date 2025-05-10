import { X } from "lucide-react";
import image from "./Laptop.jpeg"
const Card = () => {
    return(
        <div>
            <div className="flex-col w-full px-50">
                <h2 className="font-extrabold text-2xl text-center">Panier</h2>
                <div className="bg-[#b0e0e6a9] w-250  p-5 text-center rounded-3xl mb-20">
                    <div className="border-b border-gray-400 flex justify-between py-4 mb-4">
                        <p>Produit</p>
                        <div className="flex justify-around w-1/2">
                            <p>Prix</p>
                            <p>Quantité</p>
                            <p>Sous-total</p>
                        </div>
                    </div>
                    <div className="flex justify-between pb-5 mb-5 ">
                        <div className="flex items-center gap-5 ">
                            <X />
                            <img className="w-15" src={image} alt="" />
                            <p>HP Laptop 15...</p>
                        </div>
                        <div className="flex justify-around w-1/2 items-center">
                            <p>5000 DHS</p>
                            <input className="w-20 py-2 px-2 text-center rounded-2xl bg-gray-100" type="number" value={2}/>
                            <p>10000 DHS</p>
                        </div>
                    </div>
                    <button className="bg-blue-500 rounded-2xl p-2">
                        Mettre le panier à jour
                    </button>
                </div>
            </div>
            <div className="bg-[#ffffff3b] w-100 rounded-3xl p-15 mb-20 ml-20">
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
                <button className="bg-blue-500 rounded-2xl py-2 px-5">
                    Valider la commande
                </button>
            </div>
        </div>
    )
}

export default Card;