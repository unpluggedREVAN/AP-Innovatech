import axios from './axios.js'

//----------------Peticiones de reuniones---------------------//

export const createMeetigRequest = (data) => axios.post(`/createMeeting`, data)

export const infoMeetingRequest = (id) => axios.get(`/infoMeeting/${id}`)

export const infoAllMeetingsRequest = (idProject) => axios.get(`/infoAllMeetings/${idProject}`)

export const editMeetingRequest = (data, id) => axios.put(`/editMeeting/${id}`, data)

export const deleteMeetingRequest = (id) => axios.delete(`/deleteMeeting/${id}`)