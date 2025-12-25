const API_URL = "http://localhost:4000/priorities";
import axios from "axios";
import type { Priority } from "../models/proiroty";

export const get_priorities = async (token: string):Promise<Priority[]> => {
    const res = await axios.get(`${API_URL}`, {
        headers: { Authorization: `Bearer ${token}` }   
    });
    const response = res.data;
    return response;
}

export const post_priority = async (token: string, name: string):Promise<Priority>  => {
    const res = await axios.post(`${API_URL}`, { name }, {
        headers: { Authorization: `Bearer ${token}` }   
    });
    const response = res.data;
    return response;
}