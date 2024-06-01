import axios from 'axios';

const instance = axios.create({
    baseURL : 'http://127.0.0.1:4000/Innovatech'
})

export default instance