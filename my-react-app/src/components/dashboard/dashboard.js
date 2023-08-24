import * as React from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import DisplayPreviousOrdersForSeller from '../../routes/seller/previousOrders';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import LogoutIcon from '@mui/icons-material/Logout';
import ArticleIcon from '@mui/icons-material/Article';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useSelector , useDispatch} from 'react-redux'
import { setLog } from '../../store/user/actions'
import { setVerif } from '../../store/sellers/actions';
import { Logged } from '../../routes/sign-in/sign-in.component'
import { Button } from '@mui/material';
import { IsAdmin, IsUser, IsSeller, IsVerif } from '../../routes/sign-in/sign-in.component';
import { setSelleer } from '../../store/sellers/actions';
import DisplayAllArticleInShop from '../../routes/user/allArticlesInShop';
import Profile from '../../routes/profile/profile.component';

import DisplayAllArticle from '../../routes/seller/allArticles';
import Stack from '@mui/material/Stack';

import ArticleCompo from '../../routes/seller/Article';
import DisplayAllOrders from '../../routes/user/showAllOrders';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import AllOrdersForAdmin from '../../routes/admin/allOrdersWithStatus';
import Person2Icon from '@mui/icons-material/Person2';
import DisplayNewOrdersForSeller from '../../routes/seller/newOrders';
import useHttp from '../../requests-service/useHttp';
import Swal from 'sweetalert2';
import Sellers from './sellers.component';
import { setUser } from '../../store/user/actions';
const drawerWidth = 200;

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
  })(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
  }));

  
const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
      '& .MuiDrawer-paper': {
        position: 'relative',
        whiteSpace: 'nowrap',
        width: drawerWidth,
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
        boxSizing: 'border-box',
        ...(!open && {
          overflowX: 'hidden',
          transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
          width: theme.spacing(7),
          [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9),
          },
        }),
      },
    }),
  );
// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

function Dashboard() {
    const { sendRequest } = useHttp()
    const [open, setOpen] = React.useState(true);
    const toggleDrawer = () => {
      setOpen(!open);
    };
    const [click, setClick] = useState(false)

    const [buttonClickCount, setButtonClickCount] = useState(0);

    const dispatch = useDispatch();
    const navigate = useNavigate()
    const [adminRole, setAdminRole] = useState(false)
    const [userRole, setUserRole] = useState(false)//inicijalno nema token(nije ulogovan)
    const [selerRole, setSelerRole] = useState(false)
    const [showAlert, setShowAlert] = React.useState(false);

    const [alertClose, setAlert] = React.useState(false);
    //koja opcija je pritisnuta-admin
    const [seller, setSeller] = useState(false)
    const [allOrders, setAllOrders] = useState(false)

    const [allArticles, setAllArticles] = useState(false)
     //koja opcija je pritisnuta-prodavac
    const [dashbSel, setDashbSel] = useState(false)
   const [my, setMyO] = useState(false);
    const [newOrder, setNewOrder] = useState(false)
    const [newArticl, setNewArticl] = useState(false)

    //svi je imaju
    const [profilee, setProfile] = useState(false)

     //opcija koja je pritisnuta-customer
     const [userNewOrd, setUserNewOrd] = useState(false)
     const [userPrevOrd, setUserPrevOrd] = useState(false)


     const userLog = useSelector(state => state.loggedUser.logedUser);
    //dobijem bas objekat trenutno ulogovanog

    const logg = useSelector(state => state.isLogg.isLogged);
    const verify = useSelector(state => state.isVerif);
    
    //const token = localStorage.getItem("token")
   const [loging, setLoging] = useState(false)//inicijalno nema token(nije ulogovan)
   const [isStatus, setIsStat] = useState(false)//inicijalno nema token(nije ulogovan)
    const[getStat, setGetStat] = useState('')

    const[verifying, setVeriff] = useState(false)

    
 function BasicAlerts() {
  return (
    <Stack sx={{ width: '100%' }} spacing={2}>
      
      <Alert severity="info">Your token!</Alert>
      
    </Stack>
  );
}
    useEffect(() => {
       
        
      
         
       



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

     
    }, [buttonClickCount])
//admin

async function setSel1(){
   

    try {
        const baseURL = process.env.REACT_APP_URL;
        const endpoint = '/selers/allSeller';
      
        const requestConfigForExternalUser = {
          url: `${baseURL}${endpoint}`,
          method: 'GET',
          body: null,
          headers: {
            'Content-Type': 'application/json',
            Authorization: "Bearer " + localStorage.getItem("token")
          }
        }
        const token = await sendRequest(requestConfigForExternalUser)
        
        if(token !== null){
         console.log(token)
         dispatch(setSelleer(token))
            
        
        
        } } catch (error) {
            console.log('failed', error)
          }
 
   
  };
   const setSel = () =>{
        
             
        setSel1()
        
        setSeller(true);
        setAllOrders(false);
        setDashbSel(false)
        setProfile(false)


      
        setButtonClickCount(prevCount => prevCount + 1);
       
      };

      const setAllOrd = () => {
     
        setAllOrders(true);
        setSeller(false);
        setDashbSel(false)
        setProfile(false)
        setButtonClickCount(prevCount => prevCount + 1);
        
      };
  //prodavac
      

  const myOr = () => {
    setNewOrder(false)
    setMyO(true)
    setAllArticles(false);
    setNewArticl(false)
    setDashbSel(false)
    setProfile(false)
    setButtonClickCount(prevCount => prevCount + 1);
    
    
  };
      const newOrd = () => {
        setNewOrder(true)
        setMyO(false)
       
        setNewArticl(false)
        setDashbSel(false)
        setProfile(false)  
        setAllArticles(false);
        setButtonClickCount(prevCount => prevCount + 1);
        
        
      };
      const newArticle = () => {


        setNewArticl(true)
        setNewOrder(false)
        setMyO(false)
        setAllArticles(false);
        setDashbSel(false)
        setProfile(false)
        setButtonClickCount(prevCount => prevCount + 1);
        
      };
      
      const setStatus = () => {
        setDashbSel(true)
        setAllOrders(false);
        setNewOrder(false)
        setSeller(false);
        setNewArticl(false)
        setMyO(false)
        setAllArticles(false);
        setProfile(false)
        setButtonClickCount(prevCount => prevCount + 1);
       
        
      };
      const setArticles = () => {
        setAllArticles(true);
        setDashbSel(false)
        setAllOrders(false);
        setNewOrder(false)
        setSeller(false);
        setNewArticl(false)
        setMyO(false)
        setProfile(false)
        setButtonClickCount(prevCount => prevCount + 1);
       
        
      };

      //svi imaju:
    async function setProf() {

        const mail1 = JSON.parse(decodeURIComponent(atob(localStorage.getItem("token").split('.')[1].replace(/-/g, '+').replace(/_/g, '/'))))['email']
        console.log(mail1)
        const role1 = JSON.parse(decodeURIComponent(atob(localStorage.getItem("token").split('.')[1].replace(/-/g, '+').replace(/_/g, '/'))))['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']
        console.log(role1)
       
        console.log(localStorage.getItem("token"))
          try {
            const baseURL = process.env.REACT_APP_URL;
            const endpoint = '/users/profile';
            
              const requestConfigForExternalUser = {
                url: `${baseURL}${endpoint}`,
                method: 'POST',
                body: JSON.stringify({
                  
                  email: mail1,
                  type: role1
                
                  
                }),
                headers: {
                  'Content-Type': 'application/json',
                  Authorization: "Bearer " + localStorage.getItem("token")
                }
              }
              const userr = await sendRequest(requestConfigForExternalUser);
              
              if(userr !== null){
               console.log(userr)
               dispatch(setUser(userr))
             
             }        
            } catch (error) {
              console.log('failed', error)
            }
          

        setProfile(true)
        setNewOrder(false)
        setMyO(false)
        setNewArticl(false)
        setSeller(false);
        setDashbSel(false)
        setAllOrders(false);
        setUserPrevOrd(false);
        setUserNewOrd(false);
        setAllArticles(false);
/*

        const mail1 =  JSON.parse(decodeURIComponent(atob(localStorage.getItem("token").split('.')[1].replace(/-/g, '+').replace(/_/g, '/'))))['email']
        console.log(mail1)
        const requestBody = JSON.stringify(mail1);
        console.log(localStorage.getItem("token"))
          try {
              const baseURL = process.env.REACT_APP_URL;
              const endpoint = '/selers/status';
            
              const requestConfigForExternalUser = {
                url: `${baseURL}${endpoint}`,
                method: 'POST',
                body: requestBody,
                headers: {
                  'Content-Type': 'application/json',
                  Authorization: "Bearer " + localStorage.getItem("token")
                }
              }
              const token = await sendRequest(requestConfigForExternalUser);
              
              if(token !== null){
               console.log(token)
               if(token ==="Aproved"){
                  setVeriff(true)
                  dispatch(setVerif(true))
               }
               setShowAlert(true);
               setGetStat(token)
             }        
            } catch (error) {
              console.log('failed', error)
            }
          
  
      
        */

        setButtonClickCount(prevCount => prevCount + 1);
        
        
      };
      //customer
      const setNewUOrd = () => {
        setProfile(false)
        setUserNewOrd(true)
        setUserPrevOrd(false)
        setButtonClickCount(prevCount => prevCount + 1);
        
        
      };
      const setPrevUsOrd = () => {
        setUserPrevOrd(true)
        setProfile(false)
        setUserNewOrd(false)
        setButtonClickCount(prevCount => prevCount + 1);
        
        
      };

    async function statusClick() {
        setIsStat(true)
       const mail1 =   JSON.parse(decodeURIComponent(atob(localStorage.getItem("token").split('.')[1].replace(/-/g, '+').replace(/_/g, '/'))))['email']
      console.log(mail1)
      const requestBody = JSON.stringify(mail1);
      console.log(localStorage.getItem("token"))
        try {
            const baseURL = process.env.REACT_APP_URL;
            const endpoint = '/selers/status';
          
            const requestConfigForExternalUser = {
              url: `${baseURL}${endpoint}`,
              method: 'POST',
              body: requestBody,
              headers: {
                'Content-Type': 'application/json',
                Authorization: "Bearer " + localStorage.getItem("token")
              }
            }
            const token = await sendRequest(requestConfigForExternalUser);
            
            if(token !== null){
             console.log(token)
             if(token ==="Approved"){
                setVeriff(true)
                dispatch(setVerif(true))
                setShowAlert(true);
             }
             
             setGetStat(token)
           }        
          } catch (error) {
            console.log('failed', error)
          }
        


        setButtonClickCount(prevCount => prevCount + 1);//proverava istek tokena
        

        
      };


    const handleClick = (event) => {
        dispatch(setLog(false))//false je ako se izloguje
        //logg je false
      navigate("/")//kad se izloguje ide na pocetnu stranicu
    
       /* event.preventDefault()
    
        dispatch(setLogged(false))
        localStorage.setItem('logged', false)
        setLogg(localStorage.getItem('logged'))
        navigate('/')*/
      }
        
  const handleAlertClose = () => {
    setShowAlert(false);
    setVeriff(true)
   
        
  };
      return (
        <ThemeProvider theme={defaultTheme}>
          <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar position="absolute" open={open} sx={{ backgroundColor: '#b45ba2', boxShadow: 'none' }}>
              <Toolbar
                sx={{
                  pr: '24px', // keep right padding when drawer closed
                }}
              >
                <IconButton
                  edge="start"
                  color="inherit"
                  aria-label="open drawer"
                  onClick={toggleDrawer}
                  sx={{
                    marginRight: '36px',
                    ...(open && { display: 'none' }),
                  }}
                >
                  <MenuIcon />
                </IconButton>
                <Typography
                  component="h1"
                  variant="h6"
                  color="inherit"
                  noWrap
                  sx={{ flexGrow: 1 }}
                >
                  Dashboard
                </Typography>
                <LogoutIcon onClick={handleClick} />
              </Toolbar>
            </AppBar>
            <Drawer variant="permanent" open={open}>
              <Toolbar
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'flex-end',
                  px: [1],
                }}
              >
                <IconButton onClick={toggleDrawer}>
                  <ChevronLeftIcon />
                </IconButton>
              </Toolbar>
              <Divider />
              <List component="nav">
      <ListItemButton onClick={setProf}>
      <ListItemIcon>
        <Person2Icon />
      </ListItemIcon>
      <ListItemText primary="Profile" />
    </ListItemButton>
    {selerRole && (<ListItemButton onClick={setStatus}>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Status" />
    </ListItemButton>)}

     
    {selerRole && verifying && (<ListItemButton onClick={myOr}>
      <ListItemIcon>
      <ShoppingCartIcon />
      </ListItemIcon>
      <ListItemText primary="My Orders" />
    </ListItemButton>)}
    
    {selerRole && verifying && (<ListItemButton onClick={newOrd}>
      <ListItemIcon>
      <ShoppingCartIcon />
      </ListItemIcon>
      <ListItemText primary="New Orders" />
    </ListItemButton>)}
    
    {selerRole && verifying && (<ListItemButton onClick={newArticle}>
      <ListItemIcon>
        <ArticleIcon />
      </ListItemIcon>
      <ListItemText primary="New Article" />
    </ListItemButton>)}

    {selerRole && verifying && (<ListItemButton onClick={setArticles}>
      <ListItemIcon>
        <ArticleIcon />
      </ListItemIcon>
      <ListItemText primary="All articles" />
    </ListItemButton>)}
    {userRole && (<ListItemButton onClick={setNewUOrd}>
      <ListItemIcon>
        <ArticleIcon />
      </ListItemIcon>
      <ListItemText primary="New Order" />
    </ListItemButton>)}
    {userRole && (<ListItemButton onClick={setPrevUsOrd}>
      <ListItemIcon>
       <ShoppingCartIcon /> 
      </ListItemIcon>
      <ListItemText primary="My Orders" />
    </ListItemButton>)}
    {adminRole && (<ListItemButton  onClick={setAllOrd}>
      <ListItemIcon>
        <ShoppingCartIcon />
      </ListItemIcon>
      <ListItemText primary="All Orders" />
    </ListItemButton>)}
    
    {adminRole && (<ListItemButton onClick={setSel}>
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="Sellers" />
    </ListItemButton>)}
   
              </List>
            </Drawer>
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
                <Grid container spacing={3}>
                  
             
                  {/* Recent Orders */}
                  {seller && (<Grid item xs={12}>
                   
                     <Sellers />
                    
                  </Grid>)}
                 
                  {allOrders && (<Grid item xs={12}>
                    <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                    <AllOrdersForAdmin></AllOrdersForAdmin>
                    </Paper>
                  </Grid>)}
                  {dashbSel && (<Grid item xs={12}>
                    <div>
                {showAlert && (
                     <Alert severity="success" onClick={handleAlertClose}>
                           <AlertTitle>Success</AlertTitle>
                           You are successfuly verify
         
                             </Alert>
                    )}
    </div>
                    <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                    <h1>Your status of verification </h1>
                    <Button onClick={statusClick} color="secondary">Status</Button>
                    {isStatus && (<h2>{getStat}</h2>)}
                    </Paper>
                  </Grid>)}
                  {my && (<Grid item xs={12}>
                    <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                   <DisplayPreviousOrdersForSeller></DisplayPreviousOrdersForSeller>
                    </Paper>
                  </Grid>)}
                  {newOrder && (<Grid item xs={12}>
                    <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                  <DisplayNewOrdersForSeller></DisplayNewOrdersForSeller>
                    </Paper>
                  </Grid>)}
                  
                  {newArticl && (<Grid item xs={12}>
                    <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                  
                   <ArticleCompo/>
                    </Paper>
                  </Grid>)}
                  {allArticles && (<Grid item xs={12}>
                    <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                  
                   <DisplayAllArticle/>
                    </Paper>
                  </Grid>)}
                  {profilee && (<Grid item xs={12}>
                    <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                   <h1>Information about profile</h1>
                   <Profile />
                    </Paper>
                  </Grid>)}
                  {userNewOrd && (<Grid item xs={12}>
                    <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                  <DisplayAllArticleInShop></DisplayAllArticleInShop>
                    </Paper>
                  </Grid>)}
                  {userPrevOrd && (<Grid item xs={12}>
                    <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                   <DisplayAllOrders></DisplayAllOrders>
                    </Paper>
                  </Grid>)}
                </Grid>
             
              </Container>
            </Box>
          </Box>
        </ThemeProvider>
      ); 

}
export default Dashboard;