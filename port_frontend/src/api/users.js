import axios from './axios.js'

//---------------Peticiones de usuario------------------//

export const editUserRequest = (data, id) => axios.put(`/editUser/${id}`, data)

export const getUserRequest = (id) => axios.get(`/getUser/${id}`)

export const infoAllUsersRequest = () => axios.get(`/infoAllUsers`)

export const deleteUserRequest = (id) => axios.delete(`/deleteUser/${id}`)