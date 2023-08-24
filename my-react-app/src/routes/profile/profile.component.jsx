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

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
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
import { LocalConvenienceStoreOutlined, RestaurantMenu, VolunteerActivismOutlined } from '@mui/icons-material';
import  Resizer  from 'react-image-file-resizer';
import { useSelector } from 'react-redux'
import { useEffect } from 'react';
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

export default function Profile() {
  

    const myUser = useSelector(state => state.user.user);
    console.log(myUser)


    const [userName1, setUserName1] = React.useState('');
    const [email1, setEmail1] = React.useState('');
    const [password1, setPassword1] = React.useState('');
    const [date1, setData1] = React.useState('');
    const [confirmPassword1, setConfirm1] = React.useState('');
    const [name1, setName1] = React.useState('');
    const [lastName1, setLastName1] = React.useState('');
    const [type1, setType1] = React.useState(-1);
    const [address, setAddress1] = React.useState('');
    const [photoP, setPhotoP] = React.useState('');

    const[isDesabled, setDesabled] = React.useState(false)
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
  const [buttonClickCount, setButtonClickCount] = React.useState(0);
  
  const [password, setPassword] = React.useState('');
  const [picture, setPicture] = React.useState('');

  const [selectedDate, setSelectedDate] = React.useState(null);
  const { sendRequest, isLoading } = useHttp()
  const [selectedImage, setSelectedImage] = React.useState(null);
  const [base64String, setImagsetBaseURL] = React.useState('');
  const [isReguesting, setRequesting] = React.useState(false);
  const [mojTip, setMojTip] = React.useState(0);
     const typeOfLoging = localStorage.getItem("loging");
    useEffect(() => {
       
        
      if(myUser.Type === "Customer" || myUser.type === 1){
        setMojTip(1)
      }else if(myUser.Type === "Seller" || myUser.type === 2){ setMojTip(2)}
      else
      {
        setMojTip(0) 
      }


         setUserName1(myUser.userName); 
         setEmail1(myUser.email);
         setPassword1(myUser.password);
         setData1(myUser.dateOfBirth);
         setConfirm1(myUser.confirmPassword);
         setName1(myUser.name);
         setLastName1(myUser.surname);


         if(myUser.type === 0 || myUser.type === "Admin"){
            setType1(0); 
         }else if(myUser.type === 1 || myUser.type === "Customer"){
          setType1(1); 
         }
         else
         {
            setType1(2);
         }
        
         setAddress1(myUser.adress);
        
         
         const initialDate = dayjs(myUser.dateOfBirth);
         console.log(initialDate)
         setSelectedDate(initialDate)
        setPhotoP(myUser.photoPath)

        // setSelectedDate(parsedDate)
        


        
       }, [])
  const [type, setType] = React.useState('');

  

  
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
    setRequesting(false)
    setButtonClickCount(prevCount => prevCount + 1);
    
  };
  
  //const user = useSelector(state => state.user);

  const handleUserNameChange = (e) => {
    const value = e.target.value;
    setUserName1(value)
   if (value.length < 3) {
      setUserNameError('User Name must be at least 2 characters long');
    } else {
      setUserNameError('');
    }
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail1(value)
    if (!value.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,}$/)) {
      setEmailError('Incorrect email');
    } else {
      setEmailError('');
    }
  };
  const handlePasswordChange = (e) => {
    
    const value = e.target.value;
    setPassword1(value)
    setPassword(value)
    
  };
  const handleConfirmPasswordChange = (e) => {
    const value = e.target.value;
    setConfirm1(value)
   
 
  };
  const handleNameChange = (e) => {
    const value = e.target.value;
    setName1(value)
    if (value.length < 3) {
      setNameError('Name must be at least 2 characters long');
    } else {
      setNameError('');
    }
  };
  const handleLastNameChange = (e) => {
    
    const value = e.target.value;
    setLastName1(value)
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
    setAddress1(value)
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
      const endpoint = '/users/edit';
      console.log(myUser.Type)
      console.log(type)
     
       console.log(selectedDate)
      
    console.log(myUser)
      const requestConfigForExternalUser = {
        url: `${baseURL}${endpoint}`,
        method: 'PUT',
      
        body: JSON.stringify({
          Id: myUser.id,
          UserName: data.get('userName'),
          Email: data.get('email'),
          Password: data.get('password'),
          ConfirmPassword : data.get('confirmpassword'),
          Name : data.get('name'),
          Surname : data.get('lastName'),
          Tip : type1,
          Adress : data.get('adresa'),
          DateOfBirth: isValidDate(selectedDate) ? dayjs(selectedDate).format('YYYY-MM-DD') : null,
          Photo : picture,

          
        }),
       headers: {
          'Content-Type': 'application/json',
          Authorization: "Bearer " + localStorage.getItem("token")
        }
      }

      const requestConfigForExternalUser1 = {
        url: `${baseURL}${endpoint}`,
        method: 'PUT',
      
        body: JSON.stringify({
          Id: myUser.id,
          UserName: data.get('userName'),
          Email: data.get('email'),
          Password: data.get('password'),
          ConfirmPassword : data.get('confirmpassword'),
          Name : data.get('name'),
          Surname : data.get('lastName'),
          Tip : 0,
          Adress : data.get('adresa'),
          DateOfBirth : dayjs(selectedDate).format('YYYY-MM-DD') || '0000-00-00',
          Photo : picture,
          
          

          
        }),
       headers: {
          'Content-Type': 'application/json'
        }
      }

    const dataExternalUser = await sendRequest(requestConfigForExternalUser)
     console.log(dataExternalUser)
      if(dataExternalUser !== null){
       //tu mi je vracen ceo objekat korisnika koji je 
        dispatch(setUser(dataExternalUser))//to je samo korisnik koji ce se prikazivati u profilu
        setRequesting(true)
        setOpen(true)
       
        //registrovan(to mogu da sacuvam u reduxu i da sluzi za prikaz podataka)
      }
      
     
    } catch (error) {
      console.log('failed', error)
    }

  };
  function isValidDate(date) {
    // Proveri da li je datum null ili "Invalid Date"
    if (date === null || isNaN(date) || date.toString() === "Invalid Date") {
      return false;
    }
    return true;
  }
 
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
              You have changed profile
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
         
         <Avatar alt="Remy Sharp" src={photoP} />
          
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
            <Grid item xs={5}>
            <ImageUploadContainer>
  <ImageUploadLabel htmlFor="image-upload">
    {selectedImage ? (
      <UploadedImage src={URL.createObjectURL(selectedImage)} alt="Selected" />
    ) : (
      <UploadedImage src={photoP} alt="Selected" />
    )}
    { 
      <ImageUploadInput type="file" id="image-upload" onChange={handleImageChange} />
    }
  </ImageUploadLabel>
</ImageUploadContainer>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  autoComptlete="given-name"
                  name="userName"
                  required
                  fullWidth
                  id="userName"
                  label="User Name"
                  autoFocus
                  onChange={handleUserNameChange}
                  value={userName1}
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
                  value={email1}
                  onChange={handleEmailChange}
                  error={!!emailError}
                  helperText={emailError}
                />
              </Grid>
              {typeOfLoging !== "google" && (
  <>
    <Grid item xs={12}>
      <TextField
        required
        fullWidth
        name="password"
        label="Old password"
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
        label="New password"
        type="password"
        id="confirmpassword"
        autoComplete="confirm-password"
        onChange={handleConfirmPasswordChange}
        error={!!confirmPasswordError}
        helperText={confirmPasswordError}
      />
    </Grid>
  </>
)}
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="name"
                  label="Name"
                  name="name"
                  value={name1}
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
                  value={lastName1}
                  autoComplete="family-name"
                  onChange={handleLastNameChange}
                  error={!!lastNameError}
                  helperText={lastNameError}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker  onChange={handleDateChange} label ="Date of birth"  value={isValidDate(selectedDate) ? selectedDate : null}
                  />
    </LocalizationProvider>
              </Grid>
        <Grid item xs={12} sm={6}>
        <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Type</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={type1}
          label="Type"
          readOnly
          onChange={handleTypeChange}
        >
          <MenuItem value={0}>Admin</MenuItem>
          <MenuItem value={1}>Customer</MenuItem>
          <MenuItem value={2}>Seller</MenuItem>
          
          
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
                  value={address}
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
             Change profile
            </ColorButton>
            
          </Box>
        </Box>
      </Container>)}
      
    </ThemeProvider>
    </>
  
  );
}