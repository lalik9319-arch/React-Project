import { useState } from "react";
import { useAuth } from "../contexts/auth/auth";
import { create_ticket } from "../api/Tickets";
import type { New_Ticket } from "../models/Ticket";
import { useTickets } from "../contexts/auth/tikets";
import { handleApiError, toast } from "../utils/alert";
import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading";
import { CircularProgress, Container, Paper, Stack, Typography, TextField, Button, FormControl, InputLabel, Select, MenuItem } from "@mui/material";

const NewTicket = () => {
    const navigate = useNavigate();
    const { token } = useAuth();
    const { priorities } = useTickets();
    const [ticket, setTicket] = useState<New_Ticket>({ subject: "", description: "", priority_id: 0 });
    const [isSubmitting, setIsSubmitting] = useState(false);

    if (!priorities || priorities.length === 0) {
        return <Loading />;
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | (Event & { target: { value: string; name: string } })) => {
        const { name, value } = e.target;
        setTicket(prev => ({ ...prev, [name]: value }));
    };

    const handleSelectChange = (event: any) => {
        setTicket(prev => ({ ...prev, priority_id: Number(event.target.value) }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (ticket.priority_id === 0) {
            toast("Please select a priority.", "error");
            return;
        }
        setIsSubmitting(true);
        try {
            await create_ticket(token!, ticket);
            await toast("Ticket created successfully!", "success");
            navigate("/tickets");
        } catch (err: any) {
            handleApiError(err, "Failed to create ticket. Please try again later.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Container maxWidth="md">
            <Paper sx={{ p: 4, mt: 4 }}>
                <Stack component="form" onSubmit={handleSubmit} spacing={3}>
                    <Typography variant="h4" component="h1" gutterBottom>
                        Create New Ticket
                    </Typography>
                    <TextField
                        name="subject"
                        label="Subject"
                        value={ticket.subject}
                        onChange={handleChange}
                        fullWidth
                        required
                    />
                    <TextField
                        name="description"
                        label="Description"
                        value={ticket.description}
                        onChange={handleChange}
                        fullWidth
                        required
                        multiline
                        rows={4}
                    />
                    <FormControl fullWidth required>
                        <InputLabel id="priority-select-label">Priority</InputLabel>
                        <Select
                            labelId="priority-select-label"
                            id="priority-select"
                            value={ticket.priority_id === 0 ? '' : ticket.priority_id}
                            label="Priority"
                            onChange={handleSelectChange}
                        >
                            <MenuItem value="" disabled><em>Select a priority</em></MenuItem>
                            {priorities.map((priority) => (
                                <MenuItem key={priority.id} value={priority.id}>{priority.name}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <Button
                        type="submit"
                        variant="contained"
                        size="large"
                        disabled={isSubmitting}
                        startIcon={isSubmitting ? <CircularProgress size={20} color="inherit" /> : null}
                        sx={{ alignSelf: 'flex-start' }}
                    >
                        {isSubmitting ? "Creating..." : "Create Ticket"}
                    </Button>
                </Stack>
            </Paper>
        </Container>
    );
}
export default NewTicket;