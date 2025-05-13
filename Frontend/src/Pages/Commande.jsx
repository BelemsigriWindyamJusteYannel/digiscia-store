import { Link } from "react-router-dom";
import CommandItem from "../Components/commandItem/CommandItem";
import image from './Laptop.jpeg';
const Commande = () => {
    return(
        <div className="flex flex-col items-center md:items-start md:flex-row p-10 gap-10">
            <div className="w-60">
                <ul className="flex flex-col items-center gap-2 md:items-start">
                    <Link to='/Compte'>
                        <li className="font-bold">Votre Compte</li>
                    </Link>
                    <Link to='/Commandes'>
                        <li className="font-bold text-red-500">Vos Commandes</li>
                    </Link>
                    <Link to='/BoiteReception'>
                        <li className="font-bold">Boite de réception</li>
                    </Link>
                </ul>
            </div>
            <div className="sm:flex w-full">
                <div className="flex-1 ">
                    <div className="w-full border border-gray-300 p-5 rounded-sm bg-gray-100 border-b-red-300">
                        <h2>Commandes en cours</h2>
                    </div>
                    <div className="border border-gray-300 border-t-red-300">
                        <div className='border border-gray-200 p-5 rounded-sm space-y-5 border-t-red-300'>
                            <h2 className='font-bold'>Date : 10 juin</h2>
                            <h1 className='font-bold'>prix DHS</h1>
                            <div className='sm:flex gap-5 border border-gray-200 p-2 rounded-xl'>
                                <img src={image} alt="" />
                                <div className="h-50">
                                    <h2 className='font-bold'>Nom produit</h2>
                                    <p className='text-justify'>
                                        Lorem ipsum dolor sit ame perferendis nemo. Ex placeat maiores obcaecati eum!
                                    </p>
                                </div>
                            </div>
                            <h2 className='font-bold'>Date prévue de livraison: 10 juin</h2>
                        </div>
                    </div>
                </div>
                <div className="flex-1 ">
                    <div className="w-full border border-gray-300 p-5 rounded-sm bg-gray-100">
                        <h2>Commandes en exécutées</h2>
                    </div>
                    <div className=" border border-gray-300">

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Commande;