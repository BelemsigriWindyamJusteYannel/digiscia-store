import { Link } from "react-router-dom";
import { getProfile } from "../api/user";
import { useEffect, useState } from "react";
import { modifyClient } from "../api/user";
import FadeInOnScroll from "../Components/fadeInOnScroll/FadeInOnScroll";

const MonCompte = () => {
    const [profile, setProfile] = useState({});
    const [first_name, setFirstName] = useState('');
    const [last_name, setLastName] = useState('');
    const [mail, setMail] = useState('');
    const [phone_number, setPhone_number] = useState('');

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
        setPhone_number(profile.phone_number || '');
    }
    }, [profile]);
    // const [ name, setName ] = useState()
    //console.log("profile =>",profile)
    //console.log("phone_number =>",phone_number)
    return(
        <div className="flex flex-col items-center md:items-start md:flex-row p-10 gap-10 h-screen">
            <div className="w-60">
                <FadeInOnScroll>
                    <ul className="flex flex-col items-center gap-2 md:items-start">
                        <Link to='/Compte'>
                            <li className="font-bold text-red-500">Votre Compte</li>
                        </Link>
                        <Link to='/Commandes'>
                            <li className="font-bold">Vos Commandes</li>
                        </Link>
                    </ul>
                </FadeInOnScroll>
            </div>
            <div className="space-y-10 md:flex gap-2 w-full">
                <FadeInOnScroll>
                    <div className="flex-1 space-y-5">
                        <div className="border border-gray-200 p-3 rounded-sm w-100 bg-gray-100">
                            <h1>Informations Personnelles</h1>
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="nom">Nom</label>
                            <input 
                                className="border border-gray-200 p-2 rounded-xl" 
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
                                className="border border-gray-200 p-2 rounded-xl" 
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
                                className="border border-gray-200 p-2 rounded-xl" 
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
                                className="border border-gray-200 p-2 rounded-xl" 
                                id="telephone" 
                                type="text" 
                                placeholder="telephone"
                                onChange={(e)=>{
                                    return setPhone_number(()=>e.target.value)
                                }}
                                value={phone_number}
                            />
                        </div>
                        <button 
                            className="bg-orange-400 hover:bg-orange-700 rounded-xl py-3 px-2 font-bold"
                            onClick={()=>{
                                if(profile.first_name != first_name ||
                                    profile.last_name != last_name ||
                                    profile.phone_number != phone_number ||
                                    profile.user.email != mail
                                ){
                                    const client = {
                                        first_name,
                                        last_name,
                                        phone_number,
                                        email: mail
                                    }
                                    modifyClient(client)
                                    .then(data=>{
                                        console.log("Compte modifié avec succès =>", data)
                                        setFirstName(()=>data.first_name);
                                        setLastName(()=>data.last_name);
                                        setMail(()=>data.user.email);
                                        setPhone_number(()=>data.phone_number);
                                    })
                                    .catch(error=>{
                                        console.log("error =>", error);
                                    })
                                }
                            }}
                        >
                            Appliquer les modifications
                        </button>
                    </div>
                </FadeInOnScroll>
            </div>
        </div>
    )
}

export default MonCompte;