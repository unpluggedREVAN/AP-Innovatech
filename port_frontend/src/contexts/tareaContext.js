import {createContext, useState, useContext, useEffect} from 'react'

export const TaskContext = createContext();

export const useTask = () => {
    const context = useContext(TaskContext);
    if(!context) {
        throw new Error("useAuth must be used within an authProvider")
    }
    return context;
}

export const TaskProvider = ({children}) => {


    return (
        <TaskContext.Provider value={{

        }}>
            {children}
        </TaskContext.Provider>
    )
}