import axios from './axios.js'

//---------------Peticiones de usuario------------------//

export const editUserRequest = (data, id) => axios.put(`/editUser/${id}`, data)

export const getUserRequest = (id) => axios.get(`/getUser/${id}`)

export const infoAllUsersRequest = (id) => axios.get(`/infoAllUsers/${id}`)

export const deleteUserRequest = (id) => axios.delete(`/deleteUser/${id}`)

export const changeUserStatusRequest = (id, status) => axios.post(`/userChangeStatus/${id}/${status}`)