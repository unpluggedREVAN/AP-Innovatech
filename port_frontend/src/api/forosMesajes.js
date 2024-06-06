import axios from './axios.js'

export const createForoRequest = (data) => axios.post(`/createForo`, data)

export const createMessageRequest = (data) => axios.post(`/createMessage`, data)

export const editForoRequest = (id, data) => axios.put(`/editForo/${id}`, data)

export const infoAllForosRequest = () => axios.get(`/infoAllForos`)

export const infoForoRequest = (id) => axios.get(`/infoForo/${id}`)