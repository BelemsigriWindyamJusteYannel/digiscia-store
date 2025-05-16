import { createContext, useReducer } from "react";
import commandeReducer from './commandeReducer';


export const CommandeContext = createContext();

export const CommandeProvider = ({children}) => {
    const [ commandes, dispatchCommandes ] = useReducer(commandeReducer,[])

    return (
        <CommandeContext.Provider value={{ commandes, dispatchCommandes }}>
            {children}
        </CommandeContext.Provider>
    )
}