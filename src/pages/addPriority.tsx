import { useState } from "react";
import { Box, TextField, Button, Typography, Paper, Container, CircularProgress ,Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/auth/auth";
import { toast, handleApiError } from "../utils/alert";
import { post_priority } from "../api/Priorities";
import { useTickets } from "../contexts/auth/tikets";

const AddPriority = () => {
    const { token } = useAuth();
    const { getPriorities, prioritiesLoading: globalLoading } = useTickets();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const [priorityName, setPriorityName] = useState("");
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!priorityName.trim()) return;
        setLoading(true);
        try {
            await post_priority(token!, priorityName);
            await getPriorities();
            await toast("new priority added successfully!", "success");
            navigate("/dashboard");
        } catch (err: any) {
            handleApiError(err, "Failed to add priority. Please try again later.");
        } finally {
            setLoading(false);
        }
    };
    if (globalLoading && !loading) {
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
                    add a new priority
                </Typography>
                <Stack component="form" onSubmit={handleSubmit} spacing={3}>
                    <TextField
                        fullWidth
                        label="Priority Name"
                        variant="outlined"
                        value={priorityName}
                        onChange={(e) => setPriorityName(e.target.value)}
                        required
                    />
                    <Stack direction="row" spacing={2}>
                        <Button
                            fullWidth
                            variant="contained"
                            color="primary"
                            type="submit"
                            disabled={loading || !priorityName}
                            startIcon={loading ? <CircularProgress size={20} color="inherit" /> : null}
                        >
                            {loading ? "Saving..." : "Save Priority"}
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
};

export default AddPriority;