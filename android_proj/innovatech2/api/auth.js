import axios from 'axios'

export const registerRequest = user => axios.post(`http://10.0.2.2:3000/register`,user).catch(function (error){
    if(error.response){
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    } else if (error.request) {
        console.log(error.request);
    } else {
        console.log('Error', error.message);
    }
}) 