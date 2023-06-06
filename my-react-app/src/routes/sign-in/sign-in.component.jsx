import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import useHttp from '../../requests/useHttp';

import { purple } from '@mui/material/colors';
import { styled } from '@mui/material/styles';
const ColorButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(purple[500]),
  backgroundColor: purple[500],
  '&:hover': {
    backgroundColor: purple[700],
  },
}));
const MyLink = styled(Link)({
  color : "black"
});
const defaultTheme = createTheme();


export default function SignIn() {
  const { sendRequest } = useHttp()

  async function handleSubmit (event){
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
    try {
      const baseURL = process.env.REACT_APP_URL;
      const endpoint = '/users/addUser';
      const dateString = "2023-05-28";
      const date = new Date(dateString);
      const requestConfigForExternalUser = {
        url: `${baseURL}${endpoint}`,
        method: 'POST',
        body: JSON.stringify({
          userName: "Kaca",
          email: data.get('email'),
          password: data.get('password'),
          name : "GlJ",
          surname : "GlJ",
          dateOfBirth : date,
          adress : "GlJ",
          type : "GlJ",
          photo : "kdffksd"
          
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      }
      const dataExternalUser = await sendRequest(requestConfigForExternalUser)
      if(dataExternalUser !== null){
        console.log("kacaaa")
      }
    } catch (error) {
      console.log('failed', error)
    }
  };
    
  

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <ColorButton
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </ColorButton>
            <Grid container>
              <Grid item>
                <MyLink href="/signup" variant="body2" >
                  {"Don't have an account? Sign Up"}
                </MyLink>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}