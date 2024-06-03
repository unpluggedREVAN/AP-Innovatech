import {createContext, useState, useContext, useEffect} from 'react'
import {createProjectRequest, getProjectRequest, getAllProjectRequest, editProjectRequest, deleteProjectRequest} from '../api/proyectos.js'

export const ProjectContext = createContext();

export const useProject = () => {
    const context = useContext(ProjectContext);
    if(!context) {
        throw new Error("useAuth must be used within an authProvider")
    }
    return context;
}

export const ProjectProvider = ({children}) => {

    //Banderas
    const [isCreateProject, setIsCreateProject] = useState(false);
    const [projects, setProjects] = useState([]);
    const [project, setProject] = useState(null)

    const createProject = async (data) => {
        try{
            const res = await createProjectRequest(data)
            alert(res.data.message)
            setIsCreateProject(true);
        } catch(error) {
            console.log(error)
            alert("Error")
        }
    }

    const editProject = async (id, data) => {
        try{
            const res = await (editProjectRequest(data, id))
            console.log(res.data)
        } catch(error){
            alert("Error")
            console.log(error)
        }
    }

    const getProject = async (id) => {
        try{
            const res = await getProjectRequest(id);
            setProject(res.data.data)
        } catch(error){
            console.log(error)
            alert("error")
        }
    }

    const getAllProjects = async () => {
        try{
            const res = await getAllProjectRequest();
            setProjects(res.data.data)
        } catch(error) {
            console.log(error)
            alert("Error")
        }
    }

    const deleteProject = async (idProject) => {
        try{
            const res = await deleteProjectRequest(idProject)
            alert(res.data.message)
        } catch(error){
            console.log(error)
            alert("Error")
        }
    }
    return (
        <ProjectContext.Provider value={{
            createProject,
            isCreateProject,
            getAllProjects,
            projects,
            getProject,
            project,
            setProject,
            editProject, 
            deleteProject
        }}>
            {children}
        </ProjectContext.Provider>
    )
}