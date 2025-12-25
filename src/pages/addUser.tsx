import { useState } from 'react';
import type { Createser } from '../models/User';
import { useAuth } from '../contexts/auth/auth';
import { post_user } from '../api/Users';
import {  handleApiError, toast } from '../utils/alert';
import { Stack, Button, CircularProgress, Container, MenuItem, Paper, TextField, Typography } from '@mui/material';
import { getEmailError, getPasswordError } from "../utils/validation";
const CreateUser = () => {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState<Createser>({
        name: '',
        email: '',
        role: 'customer'
        , password: ""
    });
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const { token } = useAuth();
    const handleEmailChange = (value: string) => {
        setFormData({ ...formData, email: value });
        setEmailError(getEmailError(value));
    };

    const handlePasswordChange = (value: string) => {
        setFormData({ ...formData, password: value });
        setPasswordError(getPasswordError(value));
    };
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | { name?: string; value: unknown }>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name as string]: value });
    };
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await post_user(token!, formData);
            await toast('You succeeded to create user', 'success');
            setFormData({ name: '', email: '', role: 'customer', password: "" });
            setEmailError("");
            setPasswordError("");
        } catch (err: any) {
            handleApiError(err, "Failed to create user. Please try again later.");
        } finally {
            setLoading(false);
        }
    };
    const isFormValid =
        formData.name.trim().length > 0 &&
        formData.email.length > 0 &&
        formData.password.length > 0 &&
        !emailError &&
        !passwordError &&
        !loading;

    return (
        <Container maxWidth="sm">
            <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
                <Typography variant="h5" gutterBottom align="center">
                    Create a New User
                </Typography>

                <Stack component="form" onSubmit={handleSubmit} spacing={2} sx={{ mt: 2 }}>
                    <TextField
                        fullWidth
                        label="Name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        disabled={loading}
                    />
                    <TextField
                        fullWidth
                        label="Email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleEmailChange(e.target.value)}
                        error={Boolean(emailError)}
                        helperText={emailError}
                        required
                        disabled={loading}
                    />
                    <TextField
                        fullWidth
                        label="Password"
                        name="password"
                        type="password"
                        value={formData.password}
                        onChange={(e) => handlePasswordChange(e.target.value)}
                        error={Boolean(passwordError)}
                        helperText={passwordError}
                        required
                        disabled={loading}
                    />
                    <TextField
                        fullWidth
                        select
                        label="Role"
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                        disabled={loading}
                    >
                        <MenuItem value="customer">Customer</MenuItem>
                        <MenuItem value="agent">Agent</MenuItem>
                        <MenuItem value="admin">Admin</MenuItem>
                    </TextField>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        size="large"
                        sx={{ mt: 1 }}
                        disabled={!isFormValid}
                        startIcon={loading ? <CircularProgress size={20} color="inherit" /> : null}
                    >
                        {loading ? "Creating..." : "Create User"}
                    </Button>
                </Stack>
            </Paper>
        </Container>
    );
};

export default CreateUser;