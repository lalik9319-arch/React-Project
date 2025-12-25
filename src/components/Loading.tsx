import { Box, CircularProgress, Typography } from '@mui/material';

const Loading = () => {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100vh',
                gap: 2
            }}
        >
            <CircularProgress size={60} thickness={4} color="primary" />
            <Typography variant="h6" color="text.secondary">
                Loading, please wait...
            </Typography>
        </Box>
    );
};

export default Loading;