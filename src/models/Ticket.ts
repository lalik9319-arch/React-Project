import type { commentTicket } from "./Comment";

export interface Ticket {
    id: number;
    subject: string;
    description: string;
    status_id: number;
    priority_id: number;
    created_by: number;
    assigned_to: number | null;
    created_at: string;
    updated_at: string;
    status_name: string;
    priority_name: string;
    created_by_name: string;
    assigned_to_name: string | null;
    comments?: commentTicket[];
    Comments_count?: number;
}
export interface New_Ticket {
    subject: string;
    description: string;
    priority_id: number;
}

export interface putTicket {
    status_id: number;
    priority_id: number;
    assigned_to: number ;
}