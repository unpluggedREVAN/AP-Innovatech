import axios from 'axios'

const API = 'http://192.168.0.14:3000'

//Peticion de register - POST
export const registerRequest = user => axios.post(`${API}/register`,user).catch(error => {
    console.log(error.message)
})

//Peticion de login - POST
export const loginRequest = user => axios.post(`${API}/login`, user)

//Peticion de logout - POST
export const logoutResquest = async () => await axios.post(`${API}/logout`)

//Peticion de solicitar datos del usuario - GET
export const colabRequest = async () => {
    try {
        const response = await axios.get(`${API}/colaboradores/colab`);
        console.log("Respuesta:", response.data)
        return response.data;
    } catch (error){
        return error.response
    }
}