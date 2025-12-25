import { useNavigate } from "react-router-dom";
import { Stack, Button, Typography, Box } from "@mui/material";

const CustomerDashboard = () => {
    const navigate = useNavigate();

    return (
        <Box>
            <Typography variant="h5" component="h3" gutterBottom>Customer Actions</Typography>
            <Stack direction="row" spacing={2}>
                <Button variant="contained" onClick={() => navigate('/tickets')}>View My Tickets</Button>
                <Button variant="contained" onClick={() => navigate('/tickets/new')}>Create New Ticket</Button>
            </Stack>
        </Box>
    );
};
export default CustomerDashboard;