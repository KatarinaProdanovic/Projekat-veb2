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
import useHttp from '../../requests/useHttp';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import dayjs from 'dayjs';
import {ImageUploadContainer, ImageUploadLabel, UploadedImage, UploadPlaceholder, ImageUploadInput} from "./sign-up.styles"


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
  const [selectedDate, setSelectedDate] = React.useState(null);
  const { sendRequest } = useHttp()
  const [selectedImage, setSelectedImage] = React.useState(null);
  const [base64String, setImagsetBaseURL] = React.useState('');
 
  const handleImageChange = (event) => {
  const file = event.target.files[0];
  setSelectedImage(file);

  const reader = new FileReader();
  reader.onload = (event) => {
  setImagsetBaseURL(event.target.result.split(',')[1]);
     
  };
   reader.readAsDataURL(file);
   
};
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  
  async function handleSubmit (event){
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    try {
      const baseURL = process.env.REACT_APP_URL;
      const endpoint = '/users/registration';
     
      
   
 console.log({
      userName: data.get('userName'),
      email: data.get('email'),
      password: data.get('password'),
      confirmpassword : data.get('confirmpassword'),
      name : data.get('name'),
      lastName : data.get('lastName'),
      type : data.get('tip'),
      adress : data.get('adresa'),
      dateOfBirth : dayjs(selectedDate).format('YYYY-MM-DD'),
      
      photo : base64String

  
    });

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
          Type : data.get('tip'),
          Adress : data.get('adresa'),
          DateOfBirth : dayjs(selectedDate).format('YYYY-MM-DD'),
          Photo : base64String
          
        }),
       headers: {
          'Content-Type': 'application/json'
        }
      }
     const dataExternalUser = await sendRequest(requestConfigForExternalUser)
      if(dataExternalUser !== null){
        console.log(dataExternalUser)//tu mi je vracen ceo objekat korisnika koji je 
        //registrovan(to mogu da sacuvam u reduxu i da sluzi za prikaz podataka)
      }
    } catch (error) {
      console.log('failed', error)
    }

  };
  const roles = [
    
    { label: 'User'},
    { label: 'Customer'},
  ]
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
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
            <Grid item xs={5}>
              <ImageUploadContainer>
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
                />
              </Grid>
              <Grid item xs={12} sm={6}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker label ="Date of birth" value={selectedDate} onChange={handleDateChange} />
    </LocalizationProvider>
              </Grid>
              <Grid item xs={12} sm={6}>

              <Autocomplete
               disablePortal
                 id="combo-box-demo"
                 options={roles}
                  sx={{ width: 190 }}
                  renderInput={(params) => <TextField {...params} 
                   required
                  fullWidth
                  id="tip"
                  label="Type of user"
                  name="tip"
                  autoComplete="tip" />}
                  />
               
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="adresa"
                  label="Address"
                  name="adresa"
                  autoComplete="adresa"
                />
              </Grid>
            
             

            </Grid>
            <ColorButton
              type="submit"
              fullWidth
              variant="contained"
          
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
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}