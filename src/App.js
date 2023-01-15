
import React, { useState, useEffect } from 'react';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import PeopleIcon from '@mui/icons-material/People';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { GoogleLogin } from '@react-oauth/google';

import { OrgChartComponent } from './OrgChartComponent'

import './App.css';

const mdTheme = createTheme();

function App() {
  const [data, setData] = useState(null);

  console.log(process.env.REACT_APP_CLIENT_ID);

  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_CLIENT_ID}>
      <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <MuiAppBar position="absolute">
          <Toolbar>
            <IconButton
              color="inherit"
            >
              <PeopleIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
            >
              Foundation Engineering
            </Typography>
          </Toolbar>
        </MuiAppBar>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <GoogleLogin
              onSuccess={credentialResponse => {
                console.log(credentialResponse);
              }}
              onError={() => {
                console.log('Login Failed');
              }}
            />
            <OrgChartComponent
              data={data}
            />
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
    </GoogleOAuthProvider>
  );
}

export default App;