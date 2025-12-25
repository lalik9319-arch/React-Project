import axios from "axios";

const ApiUrl = 'http://localhost:4000/tickets';
export const add_comment_by_ticket_id = async (token: string, ticketId: number, content: string) => {
    const response = await axios.post(
        `${ApiUrl}/${ticketId}/comments`,
        { content: content },
        {
            headers: { Authorization: `Bearer ${token}` }
        }
    );
    return response.data;
};

