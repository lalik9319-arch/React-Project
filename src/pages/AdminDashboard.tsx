import { useNavigate } from "react-router-dom";
import { Stack, Button, Typography, Box } from "@mui/material";

const AdminDashboard = () => {
    const navigate = useNavigate();
    return (
        <Box>
            <Typography variant="h5" component="h3" gutterBottom>Admin Actions</Typography>
            <Stack direction="row" spacing={2} flexWrap="wrap">
                <Button variant="contained" onClick={() => navigate('/tickets')}>View All Tickets</Button>
                <Button variant="contained" onClick={() => navigate('/addPriority')}>Add Priority</Button>
                <Button variant="contained" onClick={() => navigate('/addStatus')}>Add Status</Button>
                <Button variant="contained" onClick={() => navigate('/addUser')}>Add User</Button>
                <Button variant="contained" onClick={() => navigate('/allUsers')}>View All Users</Button>
            </Stack>
        </Box>
    );
};

export default AdminDashboard;