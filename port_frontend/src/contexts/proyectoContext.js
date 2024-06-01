import {createContext, useState, useContext, useEffect} from 'react'

export const ProjectContext = createContext();

export const useProject = () => {
    const context = useContext(ProjectContext);
    if(!context) {
        throw new Error("useAuth must be used within an authProvider")
    }
    return context;
}

export const ProjectProvider = ({children}) => {


    return (
        <ProjectContext.Provider value={{

        }}>
            {children}
        </ProjectContext.Provider>
    )
}