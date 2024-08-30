import {apiManager} from './apiManager';
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const authToken = AsyncStorage.getItem('AuthToken');

export const getCategories = async () => {
    try {
        const result = await axios.get(`https://shark-app-57lcm.ondigitalocean.app/api/v1/categorie`, {
            headers: {
                'Authorization': `Bearer ${authToken._j}`
            },
        });
        return result;
    } catch (error) {
        if (error.response) {
            return error.response.data;
        } else {
            console.error('error.response is undefined', error);
        }
    }
}

export const createCategory = async data => {
    try {
        const result = await apiManager("/categories", {
            method : "POST",
            headers : {
                'Content-Type' : "application/json",
                'Authorization': `Bearer ${authToken._j}`
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