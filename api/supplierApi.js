import {apiManager} from './apiManager';
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from 'axios';

const authToken = AsyncStorage.getItem('AuthToken');

export const getSuppliers = async () => {
    try {
        const result = await axios.get(`https://shark-app-57lcm.ondigitalocean.app/api/v1/supplier`, {
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

export const createSupplier = async data => {
    try {
        const result = await apiManager("/supplier", {
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