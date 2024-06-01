import {createContext, useState, useContext, useEffect} from 'react'
import {registerRequest, loginRequest} from '../api/auth.js'

export const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if(!context) {
        throw new Error("useAuth must be used within an authProvider")
    }
    return context;
}

export const AuthProvider = ({children}) => {
    //Los requestest
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const register = async (user) => {
        try{
            const res = await registerRequest(user)
            alert("Registro realizado correctamente")
        } catch(error){
            console.log(error)
            alert(error.response)
        }
    }

    const login = async (user) => {
        try{
            const res = await loginRequest(user);
            console.log(res);
            setIsAuthenticated(true);
            alert("Login efectuado correctamente")
        } catch(error) {
            console.log(error)
            alert(error.response.data.message)
        }
    }

    return (
        <AuthContext.Provider value={{
            register,
            login,
            isAuthenticated,
            user
        }}>
            {children}
        </AuthContext.Provider>
    )
}