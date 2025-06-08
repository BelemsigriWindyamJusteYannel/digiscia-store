import { Link } from "react-router-dom";
import CommandItem from "../Components/commandItem/CommandItem";
import image from './Laptop.jpeg';
import axios from "axios";
import { useState, useEffect } from "react";
import { getProfile } from "../api/user";
import { getCommands, getCommandById } from "../api/command";
import FadeInOnScroll from "../Components/fadeInOnScroll/FadeInOnScroll";
import "../App.css"
const Commande = () => {
    const [profile, setProfile] = useState({});
    //const [ order_products, setOrder_products ] = useState([]);
    const [ orders, setOrders ] = useState([])
    useEffect(() => {
        getProfile().then(data => {
            setProfile(data);
        });

        getCommands().then(data => {
            setOrders(data);
        }); 

    }, []);

    console.log("profile =>",profile)
    console.log("orders =>",orders);

    return(
        <div className="flex flex-col items-center md:items-start md:flex-row p-10 gap-10 h-screen mb-10">
            <div className="w-60 ">
                <FadeInOnScroll>
                    <ul className="flex flex-col items-center gap-2 md:items-start border border-gray-300 p-5 rounded-xl">
                        <Link to='/Compte'>
                            <li className="font-bold ">Votre Compte</li>
                        </Link>
                        <Link to='/Commandes'>
                            <li className="font-bold text-red-500">Vos Commandes</li>
                        </Link>
                    </ul>
                </FadeInOnScroll>
            </div>
            <div className="sm:flex w-full h-full">
                <FadeInOnScroll>
                    <div className="w-full border border-gray-300 p-5 rounded-sm bg-gray-100 border-b-red-300">
                        <h2>Commandes en cours</h2>
                    </div>
                    <div className="h-full flex flex-col overflow-scroll custom-scroll-hide justify-between ">
                        
                        {
                            orders.length ? (
                                orders.map((item,index)=>(
                                    <div key={index} className=" border-t-red-300">
                                        <CommandItem order={item} profile={profile} />
                                    </div>
                                ))
                            ) : (
                                <div className="w-full text-center p-25 text-red-400">
                                    <h1>Vous n'avez aucune commande</h1>
                                </div>
                            )
                        }
                    </div>
                </FadeInOnScroll>
            </div>
        </div>
    )
}

export default Commande;