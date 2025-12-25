import { createContext, useContext, useEffect, useState } from "react";
import type { Priority } from "../../../models/proiroty";
import type { Status } from "../../../models/status";
import { get_priorities } from "../../../api/Priorities";
import { useAuth } from "../auth";
import { get_statuses } from "../../../api/Statuses";
import { delete_ticket } from "../../../api/Tickets"; 
import { handleApiError, toast } from "../../../utils/alert";

interface TicketContextType {
    priorities: Priority[];
    statuses: Status[];
    getPriorities: () => Promise<void>;
    getStatuses: () => Promise<void>;
    deleteTicketById: (id: number) => Promise<boolean>; 
    prioritiesLoading: boolean;
    statusesLoading: boolean;
}

const TicketsContext = createContext<TicketContextType | undefined>(undefined);

export const TicketsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { token } = useAuth();
    const [priorities, setPriorities] = useState<Priority[]>([]);
    const [statuses, setStatuses] = useState<Status[]>([]);
    const [prioritiesLoading, setPrioritiesLoading] = useState(false);
    const [statusesLoading, setStatusesLoading] = useState(false);

    const getPriorities = async () => {
        setPrioritiesLoading(true);
        try {
            if (!token) return;
            const data = await get_priorities(token);
            setPriorities(data);
        } catch (err) {
            handleApiError(err, "Failed to fetch priorities");
        } finally {
            setPrioritiesLoading(false);
        }
    };

    const getStatuses = async () => {
        setStatusesLoading(true);
        try {
            if (!token) return;
            const data = await get_statuses(token);
            setStatuses(data);
        } catch (err) {
            handleApiError(err, "Failed to fetch statuses");
        } finally {
            setStatusesLoading(false);
        }
    };

    const deleteTicketById = async (id: number): Promise<boolean> => {
        try {
            if (!token) return false;
            await delete_ticket(token, id); 
            toast("the ticket was deleted successfully", "success");
            return true; 
        } catch (err) {
            handleApiError(err, "נכשל במחיקת הפנייה");
            return false;
        }
    };

    useEffect(() => {
        if (token) {
            getPriorities();
            getStatuses();
        }
    }, [token]);

    return (
        <TicketsContext.Provider value={{ 
            priorities, 
            statuses, 
            getPriorities, 
            getStatuses, 
            deleteTicketById,
            prioritiesLoading,
            statusesLoading,
        }}>
            {children}
        </TicketsContext.Provider>
    );
}

export const useTickets = (): TicketContextType => {
    const context = useContext(TicketsContext);
    if (!context) {
        throw new Error("useTickets must be used within a TicketsProvider");
    }
    return context;
}