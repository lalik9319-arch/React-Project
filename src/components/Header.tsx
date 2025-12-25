import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/auth/auth";
import { toast } from "../utils/alert";
import { AppBar, Toolbar, Typography, Button, Box, IconButton } from "@mui/material";
import AdbIcon from '@mui/icons-material/Adb';
import React from "react";

const NavLinkStyled = ({ to, children }: { to: string, children: React.ReactNode }) => (
    <Button
        component={NavLink}
        to={to}
        sx={{
            color: 'white',
            textDecoration: 'none',
            '&.active': {
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
            },
            '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
            },
            mx: 1,
        }}
    >
        {children}
    </Button>
);

const Header = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const handleLogout = () => {
        logout();
        toast("התנתקת בהצלחה", "info");
        navigate("/login");
    };
    return (
        <AppBar position="static">
            <Toolbar>
                <IconButton edge="start" color="inherit" aria-label="logo" onClick={() => navigate("/")} sx={{ mr: 2 }}>
                    <AdbIcon />
                </IconButton>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1, cursor: 'pointer' }} onClick={() => navigate("/")}>
                    TicketSystem
                </Typography>

                <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                    {user && (
                        <>
                            <NavLinkStyled to="/dashboard">home</NavLinkStyled>
                            <NavLinkStyled to="/tickets">my tickets</NavLinkStyled>
                        </>
                    )}
                    {user?.role === 'customer' && (
                        <NavLinkStyled to="/tickets/new">new ticket</NavLinkStyled>
                    )}
                </Box>

                <Box sx={{ flexGrow: 0, ml: 2 }}>
                    {user ? (
                        <>
                            <Typography component="span" sx={{ mr: 2, color: 'white' }}>
                                Hello, {user.name}
                            </Typography>
                            <Button color="inherit" variant="outlined" onClick={handleLogout}>Logout</Button>
                        </>
                    ) : (
                        <NavLinkStyled to="/login">Login</NavLinkStyled>
                    )}
                </Box>
            </Toolbar>
        </AppBar>
    );
}
export default Header;