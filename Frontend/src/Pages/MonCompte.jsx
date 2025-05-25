import { Link } from "react-router-dom";
import { getProfile } from "../api/user";
import { useEffect, useState } from "react";

const MonCompte = () => {
    const [profile, setProfile] = useState({});
    const [first_name, setFirstName] = useState('');
    const [last_name, setLastName] = useState('');
    const [mail, setMail] = useState('');

    useEffect(() => {
    getProfile().then(data => {
        setProfile(data);
    });
    }, []);

    // ⚠️ Mise à jour des champs une fois que le profil est récupéré
    useEffect(() => {
    if (profile && profile.user) {
        setFirstName(profile.first_name || '');
        setLastName(profile.last_name || '');
        setMail(profile.user.email || '');
    }
    }, [profile]);
    // const [ name, setName ] = useState()
    return(
        <div className="flex flex-col items-center md:items-start md:flex-row p-10 gap-10">
            <div className="w-60">
                <ul className="flex flex-col items-center gap-2 md:items-start">
                    <Link to='/Compte'>
                        <li className="font-bold text-red-500">Votre Compte</li>
                    </Link>
                    <Link to='/Commandes'>
                        <li className="font-bold">Vos Commandes</li>
                    </Link>
                </ul>
            </div>
            <div className="space-y-10 md:flex gap-2 justify-around w-full">
                <div className="flex-1 space-y-2">
                    <div className="border border-gray-200 p-3 rounded-sm w-full bg-gray-100">
                        <h1>Informations Personnelles</h1>
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="nom">Nom</label>
                        <input 
                            className="border border-gray-200 w-1/2 p-2 rounded-xl" 
                            id="nom" 
                            type="text" 
                            placeholder="nom"
                            onChange={(e)=>{
                                return setLastName(()=>e.target.value)
                            }}
                            value={last_name}
                        />
                        <label htmlFor="prenom">Prenom</label>
                        <input 
                            className="border border-gray-200 w-1/2 p-2 rounded-xl" 
                            id="prenom" 
                            type="text" 
                            placeholder="prenom"
                            onChange={(e)=>{
                                return setFirstName(()=>e.target.value)
                            }}
                            value={first_name}                        
                        />
                        <label htmlFor="mail">Mail</label>
                        <input 
                            className="border border-gray-200 w-1/2 p-2 rounded-xl" 
                            id="mail" 
                            type="text" 
                            placeholder="mail"
                            onChange={(e)=>{
                                return setMail(()=>e.target.value)
                            }}
                            value={mail}
                        />
                        <label htmlFor="telephone">Téléphone</label>
                        <input 
                            className="border border-gray-200 w-1/2 p-2 rounded-xl" 
                            id="telephone" 
                            type="text" 
                            placeholder="telephone"
                            

                        />
                    </div>
                    <button className="bg-amber-100 border border-amber-400 hover:bg-amber-300 rounded-xl py-2 px-1">Appliquer les modifications</button>
                </div>
                <div className="flex-1 space-y-2">
                    <div className="border border-gray-200 p-3 rounded-sm w-full bg-gray-100">
                        <h1>Adresse</h1>
                    </div>
                    <div className="h-60 border border-gray-200">

                    </div>
                    <button className="bg-amber-100 border border-amber-400 hover:bg-amber-300 rounded-xl py-2 px-1">Appliquer les modifications</button>
                </div>
            </div>
        </div>
    )
}

export default MonCompte;