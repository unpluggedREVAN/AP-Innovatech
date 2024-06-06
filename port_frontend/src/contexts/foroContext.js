import {createContext, useState, useContext, useEffect} from 'react'
import {createForoRequest, createMessageRequest, editForoRequest, infoAllForosRequest, infoForoRequest} from '../api/forosMesajes.js'

export const ForoContext = createContext();

export const useForo = () => {
    const context = useContext(ForoContext)
    if(!context) {
        throw new Error("useForo must be used within an authProvider")
    }
    return context;
}

export const ForoProvider = ({children}) => {
    const [foros, setForos] = useState([]);
    const [foroInfo, setForoInfo] = useState(null);

    const createForo = async (data) => {
        try{
            const res = await createForoRequest(data)
            alert("Foro creado")
        } catch(error){
            console.log(error)
            alert("Error")
        }
    }

    const createMesage = async (data) => {
        try{
            const res = await createMessageRequest(data)
            alert("Mensaje creado")
        } catch(error){
            console.log(error)
            alert("Error")  
        }
    }

    const editForo = async (id, data) => {
        try{
            const res = await editForoRequest(id, data)
            alert("Foro editado")
        } catch(error){
            console.log(error)
            alert("Error")
        }
    }

    const infoAllForos = async () => {
        try{
            const res = await infoAllForosRequest();
            setForos(res.data.data)
        } catch(error) {
            console.log(error)
            alert("Error")
        }
    }

    const infoForo = async (id) => {
        try{    
            const res = await infoForoRequest(id);
            setForoInfo(res.data.data)
        } catch(error) {
            console.log(error)
            alert("Error")
        }
    }
    return (
        <ForoContext.Provider value={{
            createForo,
            createMesage,
            editForo,
            infoAllForos,
            infoForo,
            foros,
            foroInfo,
            setForoInfo
        }}>
            {children}
        </ForoContext.Provider>
    )
}