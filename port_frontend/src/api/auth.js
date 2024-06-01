import axios from './axios.js'

// ------------------- Peticiones para autenticación ------------------------
export const registerRequest = user => axios.post(`/register`, user);

export const loginRequest = user => axios.post(`/login`, user)

//Falta logout