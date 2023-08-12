import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { purple } from '@mui/material/colors';
import { styled } from '@mui/material/styles';
import useHttp from '../../requests-service/useHttp';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';
import Resizer from "react-image-file-resizer";
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setVerif } from '../../store/sellers/actions';

import { setLoggedUser,setLog } from '../../store/user/actions';


import { setUser } from '../../store/user/actions';
import Alert from '@mui/material/Alert';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import DrawerAppBar from '../../components/navigation/nav.component';

import dayjs from 'dayjs';
import {ImageUploadContainer, ImageUploadLabel, UploadedImage, UploadPlaceholder, ImageUploadInput} from "./sign-up.styles"
import { RestaurantMenu, VolunteerActivismOutlined } from '@mui/icons-material';



import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

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

export default function SignUp() {
  

  const [type, setType] = React.useState('');

  

  
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    if(mesageReg ==="You can't register with the same acount!!"){
      setOpen(false);
    setRequesting(false)
    navigate("/signup")
    }
    else{
    setOpen(false);
    setRequesting(false)
    navigate("/signin")
    }
  };
  const handleCallbackResponse = async (response) => {
    //console.log("Encoded JWT ID token: " + response.credential);
    //setGoogleToken(response.credential);
    //var userObject = jwt_decode(response.credential);
    //setUser(userObject);
    //send request for insert in database
    var gtoken = response.credential;
    const input = {
      googleToken: gtoken,
    };
    const baseURL = process.env.REACT_APP_URL;
    const endpoint = '/users/registerGoogle';
    const requestConfigForExternalUser1 = {
      url: `${baseURL}${endpoint}`,
      method: 'POST',
    
      body: JSON.stringify({
        
        googleToken: gtoken,

        
      }),
     headers: {
        'Content-Type': 'application/json'
      }
    }

   
  
   const resp = await sendRequest(requestConfigForExternalUser1)
   console.log(resp)
   if(resp !== null){
    localStorage.setItem("loging", "google")
    const decodedToken = decodeURIComponent(atob(resp.split('.')[1].replace(/-/g, '+').replace(/_/g, '/')));
    const tokenData = JSON.parse(decodedToken);
    localStorage.setItem('token', resp);
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
  
   console.log(resp)
   // handleGoogleLogin(res.data);//da se uloguje
    return navigate("/userPage");
  };
  React.useEffect(() => {
    /*global google*/ // Ovaj komentar može biti koristan za neke alate za statičku analizu
    if (typeof google !== 'undefined' && google.accounts) {
      google.accounts.id.initialize({
        client_id: '153217510821-8nm0cbg02q4mtcapqtlcfvnk1qeh4eke.apps.googleusercontent.com',
        callback: handleCallbackResponse,
      });
      google.accounts.id.renderButton(document.getElementById('signInDiv'), {
        theme: 'outline',
        size: 'large',
      });

      google.accounts.id.prompt();
    }
  }, [handleCallbackResponse]);//f anything in this array changes it is going to run useEffect again, but we want this effect to only run once


  //const user = useSelector(state => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [userNameError, setUserNameError] = React.useState('');
  const [emailError, setEmailError] = React.useState('');
  const [passwordError, setPasswordError] = React.useState('');
  const [dateError, setDataError] = React.useState('');
  const [confirmPasswordError, setConfirmError] = React.useState('');
  const [nameError, setNameError] = React.useState('');
  const [lastNameError, setLastNameError] = React.useState('');
  const [typeError, setTypeError] = React.useState('');
  const [addressError, setAddressError] = React.useState('');

  const[isDesabled, setDesabled] = React.useState(false)
  
  
  const [password, setPassword] = React.useState('');

const[mesageReg, setMes]= React.useState("");
  const [selectedDate, setSelectedDate] = React.useState(null);
  const { sendRequest, isLoading } = useHttp()
  const [selectedImage, setSelectedImage] = React.useState(null);
  const [base64String, setImagsetBaseURL] = React.useState('');
  const [isReguesting, setRequesting] = React.useState(false);
  const [picture, setPicture] = React.useState(false);
  const [mojTip, setMojTip] = React.useState('');
  const handleUserNameChange = (e) => {
    const value = e.target.value;
    
   if (value.length < 3) {
      setUserNameError('User Name must be at least 2 characters long');
    } else {
      setUserNameError('');
    }
  };

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
    setPassword(value)
    if (value.length < 6) {
      setPasswordError('Password must be at least 6 characters long');
    } else {
      setPasswordError('');
    }
  };
  const handleConfirmPasswordChange = (e) => {
    const value = e.target.value;
   
    if (value.length < 6) {
      setConfirmError('Confirm password must be at least 6 characters long');

    } 
    else if(value !== password)
    {
      setConfirmError('Confirm password must be equal to password');
    }
    else {
      setConfirmError('');
    }
  };


  const handleNameChange = (e) => {
    const value = e.target.value;
    if (value.length < 3) {
      setNameError('Name must be at least 2 characters long');
    } else {
      setNameError('');
    }
  };
  const handleLastNameChange = (e) => {
    const value = e.target.value;
    if (value.length < 3) {
      setLastNameError('Last name must be at least 3 characters long');
    } else {
      setLastNameError('');
    }
  };
  const resizeFile = (file) =>
    new Promise((resolve) => {
      Resizer.imageFileResizer(
        file,
        300,
        300,
        "JPEG",
        100,
        0,
        (uri) => {
          resolve(uri);
        },
        "base64"
      );
    });

  const handleImageChange = async (event) => {
    try {
      const file = event.target.files[0];
      setSelectedImage(file);
      const image = await resizeFile(file);
      setPicture(image);
    } catch (err) {
      console.log(err);
    }
  };


const handleTypeChange = (event) => {
  setType(event.target.value);
  console.log(type)
};
  const handleDateChange = (date) => {
   setSelectedDate(date);
   if (!date) {
    setDataError('Date of birth is required');
  } else {
    setDataError('');
  }
  };
  /*
  const handleTypeChange = (e) => {
    const value = e.target.value;
    console.log(value)
    if (value !== "User" || value !== "Customer") {
      setTypeError('Choose one type');
    } else {
      setTypeError('');
    }
  };*/

  const handleAddressChange = (e) => {
    const value = e.target.value;
    if (value.length < 6) {
      setAddressError('Incorrect address');
    } else {
      setAddressError('');
    }
  };
  async function handleSubmit (event){

    event.preventDefault();
    const data = new FormData(event.currentTarget);
   
  
   /*
    if (!data.get('userName')) {
      setDesabled(true)
      setUserNameError('User name is required');
      return;
    } else if (!data.get('email')) {
      setDesabled(true)
      setEmailError('Email is required');
      return;
    }
    else if (!data.get('password')) {
      setDesabled(true)
      setPasswordError('Password is required');
      return;
    }
    else if (!data.get('confirmpassword')) {
      setDesabled(true)
      setConfirmError('Confirm password is required');
      return;
    }
    else if (!data.get('name')) {
      setDesabled(true)
      setNameError('Name is required');
      return;
    }
    else if (!data.get('lastName')) {
      setDesabled(true)
      setLastNameError('Last name is required');
      return;
    }
    else if (!selectedDate) {
      setDesabled(true)
      setDataError('Date of birth is required');
      return;
    }
    else if (!data.get('tip')) {
      setDesabled(true)
      setTypeError('Type of user is required');
      return;
    }
    else if (!data.get('adresa')) {
      setDesabled(true)
      setAddressError('Address is required');
      return;
    }
*/

    try {
      const baseURL = process.env.REACT_APP_URL;
      const endpoint = '/users/registration';
      console.log(type)
     
      
   
      const requestConfigForExternalUser = {
        url: `${baseURL}${endpoint}`,
        method: 'POST',
      
        body: JSON.stringify({
          
          UserName: data.get('userName'),
          Email: data.get('email'),
          Password: data.get('password'),
          ConfirmPassword : data.get('confirmpassword'),
          Name : data.get('name'),
          Surname : data.get('lastName'),
          Tip : type,
          Adress : data.get('adresa'),
          DateOfBirth : dayjs(selectedDate).format('YYYY-MM-DD'),
          Photo : picture
          
        }),
       headers: {
          'Content-Type': 'application/json'
        }
      }

      const requestConfigForExternalUser1 = {
        url: `${baseURL}${endpoint}`,
        method: 'POST',
      
        body: JSON.stringify({
          
          UserName: data.get('userName'),
          Email: data.get('email'),
          Password: data.get('password'),
          ConfirmPassword : data.get('confirmpassword'),
          Name : data.get('name'),
          Surname : data.get('lastName'),
          Tip : type,
          Adress : data.get('adresa'),
          DateOfBirth : dayjs(selectedDate).format('YYYY-MM-DD'),
          Photo : picture,
          IsVerified : "InProcessing"

          
        }),
       headers: {
          'Content-Type': 'application/json'
        }
      }

     
    
     const dataExternalUser = await sendRequest(requestConfigForExternalUser1)
     console.log(dataExternalUser.email)
      if(dataExternalUser !== null){
        if(dataExternalUser.email === null){
          setOpen(true)
          setRequesting(true)
          setMes("You can't register with the same acount!!");
        }
        else{
       //tu mi je vracen ceo objekat korisnika koji je 
        dispatch(setUser(dataExternalUser))//to je samo korisnik koji ce se prikazivati u profilu
        setRequesting(true)
        setMes("You have successfully registered")
        setOpen(true)
       
        }
     
      }
      else{
        setOpen(true)
        setMes("You can't register with the same acount!!");
      }
    } catch (error) {
      setOpen(true)
      setMes("You can't register with the same acount!!");
      console.log('failed', error)
    }

  };
 
 
  return (
  
    <><DrawerAppBar/>
    <ThemeProvider theme={defaultTheme}>
       {isLoading && (
         <Box
         sx={{
           display: 'flex',
           justifyContent: 'center',
           alignItems: 'center',
           height: '100vh',
         }}
       >
         <Stack sx={{ color: 'grey.500' }} spacing={2} direction="row">
           <CircularProgress color="secondary" />
           <CircularProgress color="success" />
           <CircularProgress color="inherit" />
         </Stack>
       </Box>
        )}
         {isReguesting && ( <div>
          <Dialog 
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {"Registration"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
             {mesageReg}
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Ok</Button>
              
            </DialogActions>
          </Dialog>
        </div>)}
        
        {!isLoading && (<Container component="main" maxWidth="xs">
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
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
            <Grid item xs={5}>
              <ImageUploadContainer >
          <ImageUploadLabel htmlFor="image-upload">
            {selectedImage ? (
              <UploadedImage src={URL.createObjectURL(selectedImage)} alt="Selected" />
            ) : (
              <UploadPlaceholder>Add photo</UploadPlaceholder>
            )}
            <ImageUploadInput
              type="file"
              id="image-upload"
              onChange={handleImageChange}
            />
          </ImageUploadLabel>
        </ImageUploadContainer>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  autoComplete="given-name"
                  name="userName"
                  required
                  fullWidth
                  id="userName"
                  label="User Name"
                  autoFocus
                  onChange={handleUserNameChange}
                  error={!!userNameError}
                  helperText={userNameError}
                  
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onChange={handleEmailChange}
                  error={!!emailError}
                  helperText={emailError}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  onChange={handlePasswordChange}
                  error={!!passwordError}
                  helperText={passwordError}
                />
              </Grid>
             
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="confirmpassword"
                  label="Confirm password"
                  type="password"
                  id="confirmpassword"
                  autoComplete="confirm-password"
                  onChange={handleConfirmPasswordChange}
                  error={!!confirmPasswordError}
                  helperText={confirmPasswordError}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="name"
                  label="Name"
                  name="name"
                  autoComplete="name"
                  onChange={handleNameChange}
                  error={!!nameError}
                  helperText={nameError}
                />
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  onChange={handleLastNameChange}
                  error={!!lastNameError}
                  helperText={lastNameError}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker onChange={handleDateChange} label ="Date of birth" value={selectedDate}  
                  />
    </LocalizationProvider>
              </Grid>
        <Grid item xs={12} sm={6}>
        <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Type</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={type}
          label="Type"
          onChange={handleTypeChange}
        >
          <MenuItem value={0}>Customer</MenuItem>
          <MenuItem value={1}>Seller</MenuItem>
          
        </Select>
      </FormControl>
              
               
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="adresa"
                  label="Address"
                  name="adresa"
                  autoComplete="adresa"
                  onChange={handleAddressChange}
                  error={!!addressError}
                  helperText={addressError}
                />
              </Grid>
            
             

            </Grid>
            <ColorButton
              type="submit"
              fullWidth
              variant="contained"
              desabled = {isDesabled}
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </ColorButton>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <MyLink href="/signin" variant="body2">
                  Already have an account? Sign in
                </MyLink>
              </Grid>
            </Grid>
            <Grid>
            <div id="signInDiv"></div>
            </Grid>
          </Box>
        </Box>
      </Container>)}
      
    </ThemeProvider>
    </>
  
  );
}