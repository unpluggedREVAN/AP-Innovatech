import {createContext, useState, useContext, useEffect} from 'react'
import {editUserRequest, getUserRequest, infoAllUsersRequest, deleteUserRequest} from '../api/users.js'

export const UserContext = createContext();

export const useUser = () => {
    const context = useContext(UserContext);
    if(!context) {
        throw new Error("useAuth must be used within an authProvider")
    }
    return context;
}

export const UserProvider = ({children}) => {
    const [colabs, setColabs] = useState([]);

    const infoAllUsers = async () =>{
        try{
            const res = await infoAllUsersRequest();
            setColabs(res.data.data)
        } catch(error){
            console.log("error")
            alert("Error")
        }
    }

    return (
        <UserContext.Provider value={{
            infoAllUsers,
            colabs
        }}>
            {children}
        </UserContext.Provider>
    )
}