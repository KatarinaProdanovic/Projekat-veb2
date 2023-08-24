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
import Swal from 'sweetalert2';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { setArticle } from '../../store/article/actions';
import DrawerAppBar from '../../components/navigation/nav.component';
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import dayjs from 'dayjs';
import {ImageUploadContainer, ImageUploadLabel, UploadedImage, UploadPlaceholder, ImageUploadInput} from "../sign-up/sign-up.styles"
import { RestaurantMenu, VolunteerActivismOutlined } from '@mui/icons-material';
import { useSelector } from 'react-redux'
import { IsAdmin, IsUser, IsSeller, IsVerif } from '../sign-in/sign-in.component';
import { Logged } from '../sign-in/sign-in.component';
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
  };

  const logg = useSelector(state => state.isLogg.isLogged);
  const verify = useSelector(state => state.isVerif);
  
  //const token = localStorage.getItem("token")
 const [loging, setLoging] = React.useState(false)//inicijalno nema token(nije ulogovan)
 const [isStatus, setIsStat] = React.useState(false)//inicijalno nema token(nije ulogovan)
  const[getStat, setGetStat] = React.useState('')

  const[verifying, setVeriff] = React.useState(false)
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
  
  const article = useSelector(state => state.articles);
  console.log(article)
  const [password, setPassword] = React.useState('');

  const [productName, setProductName] = React.useState("");
  const [Quantity, setQuantity] = React.useState(0);
  const [Description, setDescription] = React.useState("");
  const [Price, setPrice] = React.useState(0);
 

  const [selectedDate, setSelectedDate] = React.useState(null);
  const { sendRequest, isLoading } = useHttp()
  const [selectedImage, setSelectedImage] = React.useState(null);
  const [base64String, setImagsetBaseURL] = React.useState('');
  const [isReguesting, setRequesting] = React.useState(false);
  const [picture, setPicture] = React.useState("");
  const [mojTip, setMojTip] = React.useState('');
  
  const [photoP, setPhotoP] = React.useState("");
  const [adminRole, setAdminRole] = React.useState(false)
  const [userRole, setUserRole] = React.useState(false)//inicijalno nema token(nije ulogovan)
  const [selerRole, setSelerRole] = React.useState(false)
  const [showAlert, setShowAlert] = React.useState(false);

  const myUser = useSelector(state => state.user.user);
  console.log(myUser)
 
  React.useEffect(() => {
       
    setProductName(article.articles.productName)
    setQuantity(article.articles.quantity)
    setDescription(article.articles.description)
    setPrice(article.articles.price) 
    setPhotoP(article.articles.photo)
         
       



    const i = Logged(JSON.parse(decodeURIComponent(atob(localStorage.getItem("token").split('.')[1].replace(/-/g, '+').replace(/_/g, '/'))))['exp'])
       setLoging(i)

    const roleIsAdmin = IsAdmin(JSON.parse(decodeURIComponent(atob(localStorage.getItem("token").split('.')[1].replace(/-/g, '+').replace(/_/g, '/'))))['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'])
       setAdminRole(roleIsAdmin)
       const roleIsUser = IsUser(JSON.parse(decodeURIComponent(atob(localStorage.getItem("token").split('.')[1].replace(/-/g, '+').replace(/_/g, '/'))))['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'])
       setUserRole(roleIsUser)
        
     
       const roleIsSeler = IsSeller(JSON.parse(decodeURIComponent(atob(localStorage.getItem("token").split('.')[1].replace(/-/g, '+').replace(/_/g, '/'))))['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'])
       setSelerRole(roleIsSeler)

       if(roleIsSeler){
       const ver = IsVerif(JSON.parse(decodeURIComponent(atob(localStorage.getItem("token").split('.')[1].replace(/-/g, '+').replace(/_/g, '/'))))['isVerified'])

       setVeriff(ver)

       console.log(roleIsUser)
       console.log(roleIsAdmin)
       console.log(roleIsSeler)
       
       }
       
       
       if(logg){
           if(!loging && (adminRole || userRole || selerRole)){
             Swal.fire({
               icon: 'warning',
               title: 'Token expired',
               text: 'Your session has expired. Please log in again.',
             }).then(() => {
               navigate('/');
             });
           }
        }

    
   }, [])
  const handleEmailChange = (e) => {
    const value = e.target.value;
    setPrice(value);
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
  const handleNameChange = (e) => {
    console.log(e.target.value)
    const value = e.target.value;
    setProductName(value);
    if (value.length < 3) {
      setNameError('Name must be at least 2 characters long');
    } else {
      setNameError('');
    }
  };
  const handleLastNameChange = (e) => {
    const value = e.target.value;
    setQuantity(value);
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
    setDescription(value);
    if (value.length < 6) {
      setAddressError('Incorrect description');
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
console.log(myUser.loggedUser)
    try {
      
      const baseURL = process.env.REACT_APP_URL;
      const endpoint = '/products/edit';
      console.log(type)
     
      setProductName(data.get('name'))
      setQuantity(data.get('lastName'))
      setDescription( data.get('adresa'))
      setPrice(data.get('email'))

     
      const requestConfigForExternalUser1 = {
        url: `${baseURL}${endpoint}`,
        method: 'POST',
      
        body: JSON.stringify({
          Id: article.articles.id,
          ProductName: data.get('name'),
          Quantity: data.get('lastName'),
          Description: data.get('adresa'),
          SellerId: myUser.id,
          Price : Number(data.get('email')),
          Photo : picture,
      
        }),
       headers: {
          'Content-Type': 'application/json',
          Authorization: "Bearer " + localStorage.getItem("token")
        }
      }
     
  
     const dataExternalUser = await sendRequest(requestConfigForExternalUser1)
     console.log(dataExternalUser)
      if(dataExternalUser !== null){
       //tu mi je vracen ceo objekat korisnika koji je 
        dispatch(setArticle(dataExternalUser))
        setRequesting(true)
        setOpen(true)
        setProductName("")
        setQuantity("")
        setDescription("")
        setSelectedImage(null);
        setPicture(null);
        setPrice("")
        setPhotoP("")
      
        
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
            Edit article successfully
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
              <ImageUploadContainer >
          <ImageUploadLabel htmlFor="image-upload">
            {selectedImage ? (
              <UploadedImage src={URL.createObjectURL(selectedImage)} alt="Selected" />
            ) : (
              <UploadedImage src={photoP} alt="Selected" />
            )}
            <UploadPlaceholder>Add photo</UploadPlaceholder>
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
                
                  required
                  fullWidth
                  id="name"
                  label="Name"
                  name="name"
                  autoComplete="name"
                  onChange={handleNameChange}
                  error={!!nameError}
                  helperText={nameError}
                  value={productName}
                />
                
              </Grid>
              
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Price"
                  name="email"
                type='number'
                  autoComplete="price"
                  onChange={handleEmailChange}
                  error={!!emailError}
                  helperText={emailError}
                  value={Price}
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
                  value={Quantity}
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
                  value={Description}
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
            Edit article
            </ColorButton>
            
          </Box>
        </Box>
      </Container>)}
      
    </ThemeProvider>
    </>
  
  );
}