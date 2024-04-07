import axios from 'axios'

const API = 'http://172.18.103.18:3000'

// ------------------- Peticiones para autenticación ------------------------
//Peticion de register - POST
export const registerRequest = user => axios.post(`${API}/register`,user)

//Peticion de login - POST
export const loginRequest = user => axios.post(`${API}/login`, user)

//Peticion de logout - POST
export const logoutResquest = async () => await axios.post(`${API}/logout`)

// ------------------- Peticiones para colaboradores ------------------------
//Petecion para los colaboradores - GET
export const colaboradoresRequest = async () => {
    try{
        const response = await axios.get(`${API}/colaboradores/getcolaboradores`)
        return response.data
    }catch(error){
        return error.response
    }
}

//Petición de colaboradores libres - GET
export const colaboradoresFreeRequest = async () => {
    try{
        const response = await axios.get(`${API}/colaboradores/getcolaboradoresfree`);
        return response.data;
    } catch(error){
        return error.response;
    }
}

//Peticion de solicitar datos del usuario - GET
export const colabRequest = async () => {
    try {
        const response = await axios.get(`${API}/colaboradores/colab`);
        return response.data;
    } catch (error){
        return error.response
    }
}

//Peticion para editar datos de usuario - PAATCH
export const patchColabRequest = async (id, data) => {
    try{
        const patchRequest = await axios.patch(`${API}/colaboradores/patchcolaboradores/${id}`,data)
    }catch(error){
        return error.response
    }
}


//------------------------------- Peticiones para proyectos -------------------------------
//Peticion para crear Proyecto  - POST
export const postProyectoRequest = project => axios.post(`${API}/proyectos/postproyectos`, project);

//Peticion de proyectos - GET
export const getProyectosRequest = async () =>{
    try{
        const response = await axios.get(`${API}/proyectos/getproyectos`)
        return response.data;
    } catch (error) {
        return error.response;
    }
}

//Peticion de proyecto - GET
export const getProyectRequest = async (id) => {
    try{
        const getProyecto = await axios.get(`${API}/proyectos/getproyectosid/${id}`)
        return getProyecto.data;
    }catch(error){
        return error.response
    }
}

//Peticion de actualizar proyecto - PATCH
export const patchProjectRequest = async (id, data) => {
    try{
        const patchRequest = await axios.patch(`${API}/proyectos/patchproyectos/${id}`,data)
        console.log("Respuesta del cambio: ", patchRequest.data)
    }catch(error){
        return error.response
    }
}

//---------------------------- Peticiones para tareas ------------------------------------------
//Peticion para traer las tareas de un proyecto - GET
export const getTareasProjectRequest = async (idProject) => {
    try{
        const getTPRequest = await axios.get(`${API}/proyectos/${idProject}/tareas`)
        return getTPRequest.data;
    } catch{
        return error.message
    }
}

//Peticion para crear tarea - POST

//Petición para modificar tarea - PATCH
export const patchTareaRequest = async (id, data) => {
    try{
        const patchTaskRequest = await axios.patch(`${API}/tareas/patchtareas/${id}`, data);
        console.log(patchTaskRequest)
    }catch(error) {
        console.log(error);
        return error;
    }
}