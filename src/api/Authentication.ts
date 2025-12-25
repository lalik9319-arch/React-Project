import type { LoginProps, RegisterProps, User } from "../models/User";
import axios from "axios";
const API_URL = "http://localhost:4000/auth";

export const login_user = async (data: LoginProps) => {
        const res = await axios.post(`${API_URL}/login`, data);
        const response = res.data;
        return response;
};              

export const register_user = async (data: RegisterProps) => {
        const res = await axios.post(`${API_URL}/register`, data);
        const response = res.data;
        return response;
};
export const get_current_user = async (token: string) :Promise<User>=> {
        const res = await axios.get(`${API_URL}/me`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        const response = res.data;
        return response;
};