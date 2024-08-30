import axios from "axios";


export const apiManager = axios.create({
    baseURL : "https://shark-app-57lcm.ondigitalocean.app/api/v1",
    responseType : 'json',
    withCredentials : true
})