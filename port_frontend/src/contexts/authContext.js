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
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isRegister, setIsRegister] = useState(false);
    const [id, setId] = useState("");

    const register = async (user) => {
        try{
            const res = await registerRequest(user)
            setIsRegister(true);
            alert("Registro realizado correctamente")
        } catch(error){
            console.log(error)
            alert(error.response.data.message)
        }
    }

    const login = async (user) => {
        try{
            const res = await loginRequest(user);
            console.log(res);
            setIsAuthenticated(true);
            setId(res.data.id);
            alert(res.data.message);
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
            isRegister, 
            id
        }}>
            {children}
        </AuthContext.Provider>
    )
}