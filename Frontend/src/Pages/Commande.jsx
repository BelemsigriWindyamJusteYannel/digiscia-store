import { Link } from "react-router-dom";
import CommandItem from "../Components/commandItem/CommandItem";
import image from './Laptop.jpeg';
import axios from "axios";
import { useState, useEffect } from "react";
import { getProfile } from "../api/user";

const Commande = () => {
    const [profile, setProfile] = useState({});
    useEffect(() => {
        getProfile().then(data => {
            setProfile(data);
        });
    }, []);

    console.log(profile)
    const commands = axios.get("http://localhost:8000/orders/")
    .then(data=>{
        console.log(data)
    })

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
                </ul>
            </div>
            <div className="sm:flex w-full">
                <div className="flex-1 ">
                    <div className="w-full border border-gray-300 p-5 rounded-sm bg-gray-100 border-b-red-300">
                        <h2>Commandes en cours</h2>
                    </div>
                    <div className="border border-gray-300 border-t-red-300">
                       <CommandItem/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Commande;