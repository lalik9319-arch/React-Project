import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/auth/auth";
import { useTickets } from "../contexts/auth/tikets";
import { useState } from "react";
import { post_status } from "../api/Statuses";
import {  handleApiError, toast } from "../utils/alert";
import { Box, Button, CircularProgress, Container, Paper, TextField, Typography, Stack } from "@mui/material";

const AddStatus = () => {
    const { token } = useAuth();
    const { getStatuses, statusesLoading: globalLoading } = useTickets();
    const navigate = useNavigate();
    const [statusName, setStatusName] = useState("");
    const [loading, setLoading] = useState(false);
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!statusName.trim()) return;
        setLoading(true);
        try {
            await post_status(token!, statusName);
            await getStatuses();
            await toast("new status added successfully!", "success");
            navigate("/dashboard");
        } catch (err: any) {
           handleApiError(err,"Failed to add status. Please try again later.");
        }finally {
            setLoading(false);
        }
    };
    if(globalLoading && !loading) {
        return (
            <Box display="flex" justifyContent="center" mt={10}>
                <CircularProgress />
            </Box>
        );
    }
    return (
        <Container maxWidth="sm">
            <Paper elevation={3} sx={{ p: 4, mt: 8, textAlign: 'center' }}>
                <Typography variant="h5" gutterBottom>
                    add a new status
                </Typography>
                <Stack component="form" onSubmit={handleSubmit} spacing={3}>
                    <TextField
                        fullWidth
                        label="Status Name"
                        variant="outlined"
                        value={statusName}
                        onChange={(e) => setStatusName(e.target.value)}
                        required
                    />
                    <Stack direction="row" spacing={2}>
                        <Button
                            fullWidth
                            variant="contained"
                            color="primary"
                            type="submit"
                            disabled={loading || !statusName}
                            startIcon={loading ? <CircularProgress size={20} color="inherit" /> : null}
                        >
                            {loading ? "Saving..." : "Save Status"}
                        </Button>
                        <Button
                            fullWidth
                            variant="outlined"
                            onClick={() => navigate(-1)}
                        >
                            Cancel
                        </Button>
                    </Stack>
                </Stack>
            </Paper>
        </Container>
    );
}
export default AddStatus;
