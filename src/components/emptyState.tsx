import { useNavigate } from "react-router-dom";
import { Box, Typography, Button, Stack } from "@mui/material";
import InboxIcon from '@mui/icons-material/Inbox';

interface EmptyStateProps {
    message: string;
    buttonText?: string;
    navigateTo?: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({ message, buttonText, navigateTo }) => {
    const navigate = useNavigate();

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', p: 4, minHeight: '200px' }}>
            <Stack spacing={2} alignItems="center">
                <InboxIcon sx={{ fontSize: 60, color: 'text.disabled' }} />
                <Typography variant="h6" color="text.secondary">
                    {message}
                </Typography>
                {buttonText && navigateTo && (
                    <Button variant="contained" onClick={() => navigate(navigateTo)}>
                        {buttonText}
                    </Button>
                )}
            </Stack>
        </Box>
    );
};

export default EmptyState;