import { Box, Typography, Button, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
    const navigate = useNavigate();

    return (
        <Container maxWidth="md">
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '80vh',
                    textAlign: 'center'
                }}
            >
                <Typography variant="h1" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                    404
                </Typography>
                <Typography variant="h4" sx={{ mb: 2 }}>
                    Oops! Page Not Found
                </Typography>
                <Typography variant="body1" sx={{ mb: 4, color: 'text.secondary' }}>
                    The page you are looking for doesn't exist or has been moved.
                </Typography>
                <Button 
                    variant="contained" 
                    size="large" 
                    onClick={() => navigate('/')}
                >
                    Back to Home
                </Button>
            </Box>
        </Container>
    );
};

export default NotFound;