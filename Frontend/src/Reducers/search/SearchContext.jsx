import { createContext, useContext, useReducer } from "react";
import { searchReducer } from './searchReducer';

export const SearchContext = createContext();

export const SearchContextProvider = ( { children } ) => {
    const [searchResult, searchDispatch] = useReducer(searchReducer,[]);

    return (
        <SearchContext.Provider value={{ searchResult,searchDispatch }}>
            {children}
        </SearchContext.Provider>
    )
}