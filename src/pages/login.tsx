import { useState } from "react";
import { useAuth } from "../contexts/auth/auth";
import { getEmailError, getPasswordError } from "../utils/validation";
import { useNavigate } from "react-router-dom";
import { handleApiError } from "../utils/alert";
import { Button, CircularProgress, Container, Paper, Stack, TextField, Typography } from "@mui/material";

const Login: React.FC = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("example@example.com");
    const [password, setPassword] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [emailError, setEmailError] = useState("");
    const { login, loading } = useAuth();

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
            await login({ email, password });
            navigate("/dashboard");
        } catch (err: any) {
            handleApiError(err, "Failed to login. Please try again later.");
        }
    };

    const isFormValid = email.length > 0 &&
        password.length > 0 &&
        !emailError &&
        !passwordError &&
        !loading;

    return (
        <Container maxWidth="xs">
            <Paper sx={{ p: 4, mt: 8 }}>
                <Stack component="form" onSubmit={sendData} spacing={2}>
                    <Typography variant="h4" component="h1" align="center" gutterBottom>
                        Login
                    </Typography>
                    <TextField
                        label="Email"
                        value={email}
                        onChange={(e) => validateEmail(e.target.value)}
                        error={Boolean(emailError)}
                        helperText={emailError}
                        fullWidth
                        required
                    />
                    <TextField
                        label="Password"
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
                        {loading ? "Logging in..." : "Login"}
                    </Button>
                    <Stack direction="row" justifyContent="center" alignItems="center" sx={{ pt: 1 }}>
                        <Typography variant="body2">Don't have an account?</Typography>
                        <Button
                            variant="text"
                            onClick={() => navigate("/register")}
                        >
                            Register here
                        </Button>
                    </Stack>
                </Stack>
            </Paper>
        </Container>
    );
};
export default Login;



