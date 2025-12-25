import { useNavigate } from "react-router-dom";
import { Stack, Button, Typography, Box } from "@mui/material";

const AgentDashboard = () => {
    const navigate = useNavigate();

    return (
        <Box>
            <Typography variant="h5" component="h3" gutterBottom>Agent Actions</Typography>
            <Stack direction="row" spacing={2}>
                <Button variant="contained" onClick={() => navigate('/tickets')}>View My Tickets</Button>
            </Stack>
        </Box>
    );
}
export default AgentDashboard;