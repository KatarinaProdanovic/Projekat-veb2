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
import useHttp from '../../requests-service/useHttp';
import DrawerAppBar from '../../components/navigation/nav.component';
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setVerif } from '../../store/sellers/actions';

import { setLoggedUser,setLog } from '../../store/user/actions';
import { purple } from '@mui/material/colors';
import { styled } from '@mui/material/styles';

import { setUser } from '../../store/user/actions';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
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

export function Logged(tokenExp){
  const currentTime = Math.floor(Date.now() / 1000);
 
if (tokenExp < currentTime) {
  return false;//token istekao
} else {
  return true;
}
}


export function IsUser(role){
 

if (role === "Customer") {
  return true;
} else {
  return false;
}
}

export function IsSeller(role){
 

  if (role === "Seller") {
    return true;
  } else {
    return false;
  }
  }


  export function IsAdmin(role){
 

    if (role === "Admin") {
      return true;
    } else {
      return false;
    }
    }
export function IsVerif(verif){//to cu koristiit za neke druge stranice
 

  if (verif ==='Approved') {
    return true;
  } else {
    return false;
  }
  }

export default function SignIn() {
  const [emailError, setEmailError] = React.useState('');
  const [passwordError, setPasswordError] = React.useState("");
  
  const { sendRequest } = useHttp()

  const[isError, setIsError] = React.useState(false);
    const[message, setMessage] = React.useState("");
   

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleEmailChange = (e) => {
    const value = e.target.value;
    if (!value.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,}$/)) {
      setEmailError('Incorrect email');
    } else {
      setEmailError('');
    }
  };
  const handlePasswordChange = (e) => {
    const value = e.target.value;
    
    if (value.length < 6) {
      setPasswordError('Password must be at least 6 characters long');
    } else {
      setPasswordError('');
    }
  };

  const user = useSelector(state => state.user);
  console.log(user)
  async function handleSubmit (event){
    event.preventDefault();
    const data = new FormData(event.currentTarget);


    if (!data.get('email')) {
     
      setEmailError('Email is required');
      return;
    }
    else if (!data.get('password')) {
      
      setPasswordError('Password is required');
      return;
    }

    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
    try {
      const baseURL = process.env.REACT_APP_URL;
      const endpoint = '/users/loginUser';
    
      const requestConfigForExternalUser = {
        url: `${baseURL}${endpoint}`,
        method: 'POST',
        body: JSON.stringify({
          
          email: data.get('email'),
          password: data.get('password'),
        
          
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      }
      const token = await sendRequest(requestConfigForExternalUser)
      if(token == null){
       
          setIsError(true)
          console.log("Nijeee")
          setMessage("Incorrect email od password")
        
      }

      if(token !== null){
       
        const decodedToken = decodeURIComponent(atob(token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/')));
        const tokenData = JSON.parse(decodedToken);
        localStorage.setItem('token', token);
        const role = tokenData['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];

        const mail1 =   JSON.parse(decodeURIComponent(atob(localStorage.getItem("token").split('.')[1].replace(/-/g, '+').replace(/_/g, '/'))))['email']
        console.log(mail1)
        const requestBody = JSON.stringify(mail1);
        
        const baseURL = process.env.REACT_APP_URL;
        const endpoint = '/users/getUser';

        const requestConfigForExternalUser1 = {
          url: `${baseURL}${endpoint}`,
          method: 'POST',
          body: requestBody,
          headers: {
            'Content-Type': 'application/json',
            Authorization: "Bearer " + localStorage.getItem("token")
          }
        }
  
       
      
       const dataExternalUser = await sendRequest(requestConfigForExternalUser1)
       console.log(dataExternalUser)
      
        if(dataExternalUser !== null){
         
          localStorage.setItem("loging", "nogoogle")
         //tu mi je vracen ceo objekat korisnika koji je 
          dispatch(setUser(dataExternalUser))//to je samo korisnik koji ce se prikazivati u profilu
         
          
       
        }
        

        if(role === "Customer"){
          dispatch(setLog(true))
          const email = tokenData['email'];
          const expiresAt = tokenData['exp'];
          const issuer = tokenData['iss'];
          const user = {
            role, email, expiresAt, issuer
          }
        
        dispatch(setLoggedUser(user))
        console.log(role)
          navigate("/userPage")
        
        } else if(role === "Seller"){
          dispatch(setLog(true))
          const email = tokenData['email'];
          const expiresAt = tokenData['exp'];
          const issuer = tokenData['iss'];
          const verif = tokenData['isVerified'];
          const user = {
            role, email, expiresAt, issuer, verif
          }
          console.log(verif)
        dispatch(setLoggedUser(user))
       

        if(verif === 'Approved'){
          dispatch(setVerif(true))
        }
        console.log(verif)
          navigate("/sellerPage")
        
        }
        else{
          dispatch(setLog(true))
          const email = tokenData['email'];
          const expiresAt = tokenData['exp'];
          const issuer = tokenData['iss'];
          const user = {
            role, email, expiresAt, issuer
          }
          dispatch(setLoggedUser(user))
         


        console.log(role)
          navigate("/adminPage")
        }
        
        
      
      
    
      /*
      console.log(role); // 'User'
      console.log(email); // 'kristinatodorovic853@gmail.com'
      console.log(expiresAt); // 1686260239
      console.log(issuer); // 'http://localhost:7006'
      */ 
      }
      
    } catch (error) {
      console.log('failed', error)
    }
  };
    
 
  //console.log(user1.loggedUser.email)
  return (
    <>
    <DrawerAppBar/>
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
          {isError && (<Stack sx={{ width: '100%' }} spacing={2}>
      <Alert severity="error">{message}</Alert>
     
    </Stack>)}
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
              onChange={handleEmailChange}
              error={!!emailError}
              helperText={emailError}
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
              onChange={handlePasswordChange}
              error={!!passwordError}
              helperText={passwordError}
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
    </>
  );
}