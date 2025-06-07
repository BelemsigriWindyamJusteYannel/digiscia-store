import { createContext, useReducer } from 'react';
import { userReducer } from './userReducer';

export const uContext = createContext()

export const UProvider = ({children}) =>  {
    const [ user, userDispatch ] = useReducer(userReducer,{})

    return(
        <uContext.Provider value={{ user, userDispatch }}>
            {children}
        </uContext.Provider>
    ) 
}