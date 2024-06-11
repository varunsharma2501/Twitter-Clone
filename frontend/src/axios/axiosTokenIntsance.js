import axios from 'axios' 

export const axiosTokenInstance = () => {
    const token = localStorage.getItem('jwt'); 
    return axios.create({
        headers : {
            Authorization : token 
        }
    })
}