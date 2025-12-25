const API_URL = "http://localhost:4000/statuses";
import axios from "axios";
import type { Status } from "../models/status";

export const get_statuses = async (token: string):Promise<Status[]> => {
    const res = await axios.get(`${API_URL}`, {
        headers: { Authorization: `Bearer ${token}` }   
    });
    const response = res.data;
    return response;
}

export const post_status = async (token: string, name: string):Promise<Status> => {
    const res = await axios.post(`${API_URL}`, {name}, {
        headers: { Authorization: `Bearer ${token}` }   
    });
    const response = res.data;
    return response;
}