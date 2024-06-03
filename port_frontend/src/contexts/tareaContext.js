import {createContext, useState, useContext, useEffect} from 'react'
import {createTaskRequest, infoTaksToDoRequest, infoTasksProgressRequest, infoTasksDoneRequest, infoTaskRequest, editTaskRequest, deleteTaskRequest} from '../api/tareas'

export const TaskContext = createContext();

export const useTask = () => {
    const context = useContext(TaskContext);
    if(!context) {
        throw new Error("useAuth must be used within an authProvider")
    }
    return context;
}

export const TaskProvider = ({children}) => {
    const [idTask, setIdTask] = useState(null);

    const createTask = async (data) =>{
        try{
            const res = await createTaskRequest(data);
            console.log(res)
            setIdTask(res.data.data) //DFBBBXFVFVDBD5FV15
            alert("Tarea creada exitosamente")
        } catch(error) {
            console.log(error)
            alert("Error")
        }
    }
    return (
        <TaskContext.Provider value={{
            createTask,
            idTask,
            setIdTask
        }}>
            {children}
        </TaskContext.Provider>
    )
}