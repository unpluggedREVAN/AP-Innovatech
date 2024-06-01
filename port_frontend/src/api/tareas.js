import axios from './axios.js'

//----------------Peticiones de tareas--------------------

export const createTaskRequest = (data) => axios.post(`/createTask`, data)

export const infoTaskRequest = (id) => axios.get(`/infoTask/${id}`)

export const infoTaksToDoRequest = (idProject) => axios.get(`/infoTasksToDo/${idProject}`)

export const infoTasksProgressRequest = (idProject) => axios.get(`/infoTasksProgress/${idProject}`)

export const infoTasksDoneRequest = (idProject) => axios.get(`/infoTasksDone/${idProject}`)

export const editTaskRequest = (data, id) => axios.put(`/editTask/${id}`, data)

export const deleteTaskRequest = (id) => axios.delete(`/deleteTask/${id}`)