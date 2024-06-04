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
    const [taskToDo, setTaskToDo] = useState([]);
    const [taskProgress, setTaskProgress] = useState([]);
    const [taskDone, setTaskDone] = useState([]);

    const infoTaskToDo = async (idProject) => {
        try{
            const res = await infoTaksToDoRequest(idProject)
            setTaskToDo(res.data.data)
        } catch(error) {
            console.log(error)
            alert("Error")
        }
    }

    const infoTaskPogress = async (idProject) => {
        try{
            const res = await infoTasksProgressRequest(idProject)
            setTaskProgress(res.data.data)
        } catch(error) {
            console.log(error)
            alert("Error")
        }
    }

    const infoTaskDone = async (idProject) => {
        try{
            const res = await infoTasksDoneRequest(idProject)
            setTaskDone(res.data.data)
        } catch(error) {
            console.log(error)
            alert("Error")
        }
    }

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

    const deleteTask = async (idTask) => {
        try{
            const res = await deleteTaskRequest(idTask)
            console.log(res.data.message)
            alert("Tarea eliminada")
        } catch (error) {
            console.log(error)
            alert("Error")
        }
    }
    return (
        <TaskContext.Provider value={{
            createTask,
            idTask,
            setIdTask, 
            infoTaskToDo,
            infoTaskPogress,
            infoTaskDone,
            taskToDo,
            taskProgress,
            taskDone,
            deleteTask
        }}>
            {children}
        </TaskContext.Provider>
    )
}