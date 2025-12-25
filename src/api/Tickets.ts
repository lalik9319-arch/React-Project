import axios from "axios";
import type { New_Ticket, putTicket, Ticket } from "../models/Ticket";

const API_URL = "http://localhost:4000/tickets";

export const get_tickets = async (token: string): Promise<Ticket[]> => {
    const res = await axios.get(`${API_URL}`, {
        headers: { Authorization: `Bearer ${token}` }
    });
    const response = res.data;
    return response;
};

export const get_ticket_by_id = async (token: string, ticket_id: number): Promise<Ticket> => {
    const res = await axios.get(`${API_URL}/${ticket_id}`, {
        headers: { Authorization: `Bearer ${token}` }
    });
    const response = res.data;
    return response;
};
export const put_comment_by_ticket_id = async (token: string, ticketId: number, content: putTicket) => {
    const response = await axios.patch(
        `${API_URL}/${ticketId}`, content,
        {
            headers: { Authorization: `Bearer ${token}` }
        }
    );
    return response.data;
}
export const create_ticket = async (token: string, ticket: New_Ticket): Promise<Ticket> => {
    const response = await axios.post(
        `${API_URL}`,
        ticket,
        {
            headers: { Authorization: `Bearer ${token}` }
        }
    );
    return response.data;
}
export const delete_ticket = async (token: string, id: number) => {
    const response = await axios.delete(`${API_URL}/tickets/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
};