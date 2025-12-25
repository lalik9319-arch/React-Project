import { useState } from "react";
import { useAuth } from "../contexts/auth/auth";
import { getEmailError, getPasswordError } from "../utils/validation";
import { useNavigate } from "react-router-dom";
import { handleApiError } from "../utils/alert";
import { Button, TextField, Typography, CircularProgress, Container, Paper, Stack } from "@mui/material";

export const Register = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [emailError, setEmailError] = useState("");

    const { register, loading } = useAuth();

    const validateEmail = (value: string) => {
        setEmail(value);
        setEmailError(getEmailError(value));
    };

    const validatePassword = (value: string) => {
        setPassword(value);
        setPasswordError(getPasswordError(value));
    };

    const sendData = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await register({ name, email, password });
            navigate("/dashboard");
        } catch (err: any) {
            handleApiError(err, "Failed to register. Please try again later.");
        }
    };

    const isFormValid = name.length >= 2 &&
        email.length > 0 &&
        password.length > 0 &&
        !emailError &&
        !passwordError &&
        !loading;

    return (
        <Container maxWidth="xs">
            <Paper sx={{ p: 4, mt: 8 }}>
                <Stack component="form" onSubmit={sendData} spacing={2}>
                    <Typography variant="h4" component="h1" align="center" gutterBottom>
                        הרשמה
                    </Typography>
                    <TextField
                        label="שם משתמש"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        fullWidth
                        required
                    />
                    <TextField
                        label="אימייל"
                        value={email}
                        onChange={(e) => validateEmail(e.target.value)}
                        error={Boolean(emailError)}
                        helperText={emailError}
                        fullWidth
                        required
                    />
                    <TextField
                        label="סיסמה"
                        type="password"
                        value={password}
                        onChange={(e) => validatePassword(e.target.value)}
                        error={Boolean(passwordError)}
                        helperText={passwordError}
                        fullWidth
                        required
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        fullWidth
                        size="large"
                        disabled={!isFormValid}
                        startIcon={loading ? <CircularProgress size={20} color="inherit" /> : null}
                    >
                        {loading ? "טוען..." : "הרשמה"}
                    </Button>
                </Stack>
            </Paper>
        </Container>
    );
};