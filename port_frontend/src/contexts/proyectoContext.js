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

    const getAllProjects = async () => {
        try{
            const res = await getAllProjectRequest();
            setProjects(res.data.data)
        } catch(error) {
            console.log(error)
            alert("Error")
        }
    }
    return (
        <ProjectContext.Provider value={{
            createProject,
            isCreateProject,
            getAllProjects,
            projects
        }}>
            {children}
        </ProjectContext.Provider>
    )
}