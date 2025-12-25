import type { Ticket } from "../models/Ticket";
import { Card, CardContent, Typography, Stack, Chip, Box } from "@mui/material";

const TicketDetails: React.FC<{ ticket: Ticket }> = ({ ticket }) => {
    const getStatusColor = (status: string) => {
        switch (status.toLowerCase()) {
            case 'open':
                return 'primary';
            case 'in progress':
                return 'warning';
            case 'closed':
                return 'success';
            default:
                return 'default';
        }
    };

    return (
        <Card sx={{ width: '100%' }}>
            <CardContent>
                <Stack spacing={2}>
                    <Typography variant="h5" component="div">
                        {ticket.subject}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {ticket.description}
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
                        <Typography variant="body2"><strong>Assigned to:</strong> {ticket.assigned_to_name || 'Unassigned'}</Typography>
                        <Chip label={ticket.status_name} color={getStatusColor(ticket.status_name)} size="small" />
                    </Box>
                    <Typography variant="body2"><strong>Priority:</strong> {ticket.priority_name}</Typography>
                    <Typography variant="body2"><strong>Created by:</strong> {ticket.created_by_name}</Typography>
                    <Typography variant="caption" color="text.secondary">
                        Last updated: {new Date(ticket.updated_at).toLocaleString()}
                    </Typography>
                </Stack>
            </CardContent>
        </Card>
    );
}
export default TicketDetails;