import {createContext, useState, useContext, useEffect} from 'react'

export const ReunionContext = createContext();

export const useReunion = () => {
    const context = useContext(ReunionContext);
    if(!context) {
        throw new Error("useAuth must be used within an authProvider")
    }
    return context;
}

export const ReunionProvider = ({children}) => {


    return (
        <ReunionContext.Provider value={{

        }}>
            {children}
        </ReunionContext.Provider>
    )
}