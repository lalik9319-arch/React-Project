import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { AuthProvider } from '../contexts/auth/auth';
import { TicketsProvider } from '../contexts/auth/tikets';
import theme from '../theme/theme';

// כאן תייבאי בעתיד עוד Providers אם יהיו

interface AppProvidersProps {
  children: React.ReactNode;
}

const AppProviders: React.FC<AppProvidersProps> = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <TicketsProvider>
          {children}
        </TicketsProvider>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default AppProviders;