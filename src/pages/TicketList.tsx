import { useEffect, useState } from "react";
import type { Ticket } from "../models/Ticket";
import { get_tickets } from "../api/Tickets";
import { useAuth } from "../contexts/auth/auth";
import TicketDetails from "./TicketDetails";
import { Outlet, useNavigate } from "react-router-dom";
import { handleApiError } from "../utils/alert";
import Loading from "../components/Loading";
import EmptyState from "../components/emptyState";
import { Grid, Typography, Box } from "@mui/material";

const TicketList = () => {
    const { token } = useAuth();
    const [tickets, setTickets] = useState<Ticket[]>([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTickets = async () => {
            try {
                const data = await get_tickets(token!);
                setTickets(data);
            } catch (err) {
                handleApiError(err, "Failed to load tickets. Please try again later.");
            } finally {
                setLoading(false);
            }
        };
        if (token) fetchTickets();
    }, [token]);

    const handleOpen = (id: number) => {
        navigate(`${id}`);
    };

    if (loading) return <Loading />;

    if (tickets.length === 0) {
        return <EmptyState message="No tickets found." navigateTo="/dashboard" buttonText="Go to Dashboard" />;
    }

    return (
        <Box>
            <Typography variant="h4" component="h1" gutterBottom>
                My Tickets
            </Typography>
            <Grid container spacing={3}>
                {tickets.map((ticket) => (
                    <Grid item xs={12} sm={6} md={4} key={ticket.id}>
                        <Box 
                            onClick={() => handleOpen(ticket.id)} 
                            sx={{ 
                                cursor: 'pointer',
                                '&:hover': {
                                    transform: 'translateY(-4px)',
                                    boxShadow: 6,
                                },
                                transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
                                borderRadius: '12px',
                                overflow: 'hidden',
                            }}
                        >
                            <TicketDetails ticket={ticket} />
                        </Box>
                    </Grid>
                ))}
            </Grid>
            <Outlet />
        </Box>
    );
};
export default TicketList;