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


import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import DrawerAppBar from '../../components/navigation/nav.component';
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setUser } from '../../store/user/actions';
import dayjs from 'dayjs';
import {ImageUploadContainer, ImageUploadLabel, UploadedImage, UploadPlaceholder, ImageUploadInput} from "../sign-up/sign-up.styles"
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

export default function ArticleCompo() {
  

  const [type, setType] = React.useState('');

  

  
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
    setRequesting(false)
    navigate("/signin")
  };


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


  const [selectedDate, setSelectedDate] = React.useState(null);
  const { sendRequest, isLoading } = useHttp()
  const [selectedImage, setSelectedImage] = React.useState(null);
  const [base64String, setImagsetBaseURL] = React.useState('');
  const [isReguesting, setRequesting] = React.useState(false);
  const [picture, setPicture] = React.useState(false);
  const [mojTip, setMojTip] = React.useState('');
  

  const handleEmailChange = (e) => {
    const value = e.target.value;
    if (!value.length === 0) {
      setEmailError('Incorrect price');
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
    if (value.length === 0) {
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
          'Content-Type': 'application/json',
          Authorization: "Bearer " + localStorage.getItem("token")
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
          'Content-Type': 'application/json',
          Authorization: "Bearer " + localStorage.getItem("token")
        }
      }

      if(type === 0){
        const dataExternalUser = await sendRequest(requestConfigForExternalUser)
     console.log(dataExternalUser)
      if(dataExternalUser !== null){
       //tu mi je vracen ceo objekat korisnika koji je 
        dispatch(setUser(dataExternalUser))//to je samo korisnik koji ce se prikazivati u profilu
        setRequesting(true)
        setOpen(true)
       
        //registrovan(to mogu da sacuvam u reduxu i da sluzi za prikaz podataka)
      }
      }
      else{
     const dataExternalUser = await sendRequest(requestConfigForExternalUser1)
     console.log(dataExternalUser)
      if(dataExternalUser !== null){
       //tu mi je vracen ceo objekat korisnika koji je 
        dispatch(setUser(dataExternalUser))//to je samo korisnik koji ce se prikazivati u profilu
        setRequesting(true)
        setOpen(true)
       
        
      }//registrovan(to mogu da sacuvam u reduxu i da sluzi za prikaz podataka)
      }
    } catch (error) {
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
              {"Add new article"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
            Add article succedfully
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
         
         
          <Typography component="h1" variant="h5">
         Add new article
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
             <ImageUploadInput type="file" accept="image/*" onChange={handleImageChange} />

          </ImageUploadLabel>
        </ImageUploadContainer>
              </Grid>
              <Grid item xs={12}>
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
              
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Price"
                  name="email"
                  type="number"
                  autoComplete="price"
                  onChange={handleEmailChange}
                  error={!!emailError}
                  helperText={emailError}
                />
              </Grid>
              
           
              
              <Grid item xs={12} >
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Quantity"
                  name="lastName"
                  autoComplete="quantity"
                  type ="number"
                  onChange={handleLastNameChange}
                  error={!!lastNameError}
                  helperText={lastNameError}
                />
              </Grid>
             
        
              
               
              
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="adresa"
                  label="Description"
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
            Add article
            </ColorButton>
            
          </Box>
        </Box>
      </Container>)}
      
    </ThemeProvider>
    </>
  
  );
}