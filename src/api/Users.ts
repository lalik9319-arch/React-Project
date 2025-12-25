import axios from "axios";
import type { Createser } from "../models/User";

const API_URL = "http://localhost:4000/users";

export const get_users = async (token: string) => {
    const res = await axios.get(`${API_URL}`, {
        headers: { Authorization: `Bearer ${token}` }
    });
    const response = res.data;
    return response;
}

export const post_user = async (token: string, user: Createser   ):Promise<Createser>=>{
    const res = await axios.post(`${API_URL}`, user ,{
        headers: { Authorization: `Bearer ${token}` }
    });
    return res.data;
}

