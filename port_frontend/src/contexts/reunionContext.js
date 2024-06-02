import {createContext, useState, useContext, useEffect} from 'react'
import {createMeetigRequest, infoMeetingRequest, infoAllMeetingsRequest, editMeetingRequest, deleteMeetingRequest} from '../api/reuniones'

export const ReunionContext = createContext();

export const useReunion = () => {
    const context = useContext(ReunionContext);
    if(!context) {
        throw new Error("useAuth must be used within an authProvider")
    }
    return context;
}

export const ReunionProvider = ({children}) => {

    const [meetings, setMeetings] = useState([]);
    const [meeting, setMeeting] = useState(null);

    const infoAllMeetings = async () => {
        try{
            const res = await infoAllMeetingsRequest();
            setMeetings(res.data.data);
        } catch(error) {
            console.log(error)
            alert("Error")
        }
    }

    const infoMeeting = async (id) => {
        try{
            const res = await infoMeetingRequest(id);
            setMeeting(res.data.data)
        } catch(error) {
            console.log(error)
            alert("Error");
        }
    }

    const createMeeting = async (data) => {
        try{
            const res = await createMeetigRequest(data);
            console.log(res);
        } catch(error) {
            console.log(error);
            alert("Error")
        }
    }

    return (
        <ReunionContext.Provider value={{
            infoAllMeetings,
            createMeeting,
            meetings,
            infoMeeting,  
            meeting
        }}>
            {children}
        </ReunionContext.Provider>
    )
}