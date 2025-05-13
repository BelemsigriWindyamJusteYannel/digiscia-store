import { Link } from "react-router-dom";
import CommandItem from "../Components/commandItem/CommandItem";
Link

const BoiteReception = () => {
    return(
        <div className="flex flex-col items-center lg:items-start lg:flex-row p-10 gap-10">
            <div className="w-60">
                <ul className="flex flex-col items-center gap-2 md:items-start">
                    <Link to='/Compte'>
                        <li className="font-bold">Votre Compte</li>
                    </Link>
                    <Link to='/Commandes'>
                        <li className="font-bold">Vos Commandes</li>
                    </Link>
                    <Link to='/BoiteReception'>
                        <li className="font-bold text-red-500">Boite de réception</li>
                    </Link>
                </ul>
            </div>
            <div>
                <CommandItem/>
            </div>
        </div>
    )
}

export default BoiteReception;