
import { apiManager } from "./apiManager";
import axios from "axios";

export const login = async data => {
    try {
        const result = await apiManager("/user/login", {
            method : "POST",
            headers : {
                'Content-Type' : "application/json"
            },
            data : data
        })
        return result;
    } catch (error) {
        if (error.response) {
            return error.response.data;
        } else {
            console.error('error.response is undefined', error);
        }
    }
}