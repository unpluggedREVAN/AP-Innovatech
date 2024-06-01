import {createContext, useState, useContext, useEffect} from 'react'

export const UserContext = createContext();

export const useUser = () => {
    const context = useContext(UserContext);
    if(!context) {
        throw new Error("useAuth must be used within an authProvider")
    }
    return context;
}

export const UserProvider = ({children}) => {


    return (
        <UserContext.Provider value={{

        }}>
            {children}
        </UserContext.Provider>
    )
}