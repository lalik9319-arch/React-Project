import { useAuth } from "../contexts/auth/auth";
import AdminDashboard from "./AdminDashboard";
import AgentDashboard from "./AgentDashboard";
import CustomerDashboard from "./CustomerDashboard";
import { Box, Paper, Typography } from "@mui/material";

const Dashboard = () => {
    const { user } = useAuth();
    return (
        <Paper sx={{ p: 4 }}>
            <Box sx={{ mb: 4 }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Welcome to the Helpdesk
                </Typography>
                <Typography variant="h6" component="h2">
                    Hello, {user?.name}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    We are here to help you with all your requests.
                </Typography>
            </Box>

            {user?.role === "admin" && <AdminDashboard />}
            {user?.role === 'agent' && <AgentDashboard />}
            {user?.role === 'customer' && <CustomerDashboard />}
        </Paper>
    );
};
export default Dashboard;