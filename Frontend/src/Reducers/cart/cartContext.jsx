import { createContext, useReducer } from 'react';
import { cartReducer } from './cartReducer';

export const cartContext = createContext()

export const CartProvider = ({children}) =>  {
    const [ cart, dispatch ] = useReducer(cartReducer,[])

    return(
        <cartContext.Provider value={{ cart, dispatch }}>
            {children}
        </cartContext.Provider>
    ) 
}