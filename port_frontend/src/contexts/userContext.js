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
    const [infoUser, setInfoUser] = useState(null);

    const infoAllUsers = async (id) =>{
        try{
            const res = await infoAllUsersRequest(id);
            setColabs(res.data.data)
        } catch(error){
            console.log("error")
            alert("Error")
        }
    }

    const getInfoUser = async (id) => {
        try{
            const res = await getUserRequest(id)
            setInfoUser(res.data.data);
            console.log(res.data.data)
        } catch(error){
            console.log(error)
            alert("Error")
        }
    }

    const editUser = async (data, id) => {
        try{
            const res = await editUserRequest(data, id)
            console.log(res)
            alert(res.data.message)
        } catch(error) {
            console.log(error)
            alert("Error")
        }
    }
    return (
        <UserContext.Provider value={{
            infoAllUsers,
            colabs,
            getInfoUser,
            infoUser, 
            editUser
        }}>
            {children}
        </UserContext.Provider>
    )
}