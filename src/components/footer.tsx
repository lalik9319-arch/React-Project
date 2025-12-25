import { Box, Typography, Container, Link, Stack } from "@mui/material";

const Footer = () => {
    return (
        <Box
            component="footer"
            sx={{
                py: 3,
                px: 2,
                mt: 'auto',
                backgroundColor: 'primary.main',
                color: 'primary.contrastText',
                textAlign: 'center'
            }}
        >
            <Container maxWidth="lg">
                <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" alignItems="center" spacing={2}>
                    <Typography variant="body2">
                        {`© ${new Date().getFullYear()} TicketSystem. All Rights Reserved.`}
                    </Typography>
                    <Stack direction="row" spacing={2} justifyContent="center">
                        <Link href="mailto:support@tickets.com" color="inherit" underline="hover">Contact Us</Link>
                        <Link href="/privacy" color="inherit" underline="hover">Privacy Policy</Link>
                    </Stack>
                </Stack>
            </Container>
        </Box>
    );
};

export default Footer;