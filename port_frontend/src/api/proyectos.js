import axios from './axios.js'

//--------------Peticiones de proyecto------------------//

export const createProjectRequest = (data) => axios.post(`/createProject`, data)

export const getProjectRequest = (id) => axios.get(`/getProject/${id}`)

export const getAllProjectRequest = () => axios.get(`/getAllProjects`)

export const editProjectRequest = (data, id) => axios.put(`/editProject/${id}`, data)

export const deleteProjectRequest = (id) => axios.delete(`/deleteProject/${id}`)