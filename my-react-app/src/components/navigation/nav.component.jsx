
import { useState, React, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
// import { useDispatch } from 'react-redux'
// import { setLogged } from '../../store/users/users.action'
import PropTypes from 'prop-types'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import CssBaseline from '@mui/material/CssBaseline'
import Divider from '@mui/material/Divider'
import Drawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import MenuIcon from '@mui/icons-material/Menu'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import { styled } from "@mui/system";
import { useSelector , useDispatch} from 'react-redux'
import { setLog } from '../../store/user/actions'
import { Logged } from '../../routes/sign-in/sign-in.component'

const drawerWidth = 240
const navItems = [ 'Sign up', 'Sign in', 'Log out']


export const MyAppBar = styled(AppBar)({
  backgroundColor: "#b45ba2",
  boxShadow : "none",
  height: 50
});



function DrawerAppBar (props) {
  const navigate = useNavigate()
  const logg = useSelector(state => state.isLogg.isLogged);
  console.log(logg)
  //const token = localStorage.getItem("token")
 const [loging, setLoging] = useState(false)//inicijalno nema token(nije ulogovan)
  useEffect(() => {
   
   const i = Logged(JSON.parse(decodeURIComponent(atob(localStorage.getItem("token").split('.')[1].replace(/-/g, '+').replace(/_/g, '/'))))['exp'])
      setLoging(i)
      if(logg){
          if(!loging){
       alert("Istekao vam je token iz nav bar")
       
        navigate("/")
          }
      }
     
   /*
      fetch('/api/Artikli')
      .then((response) => response.json())
      .then((actualData) => {dispatch(updateItems(actualData)); dispatch(updateItems1(actualData))});

      setChe(true) */
   
  }, [loging,logg])


  const user = useSelector(state => state.loggedUser);
    //console.log(user)
    /*if(user !== {} && user !== undefined && user != null ){
        const vr = Logged(user.logedUser.expiresAt)
        
        
    }*/
    
  
   
    const dispatch = useDispatch();
// const v = Logged(user.logedUser)
 
  
  
   // inicajalno nije ulogovan
  // const dispatch = useDispatch()
  const { window } = props
  const [mobileOpen, setMobileOpen] = useState(false)
  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState)
    // setLogg(false)
  }
  const handleSignUp = () => {
    navigate('/signup')
  }
  
  const handleLogin = () => {
    navigate('/signin')
  }
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
  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        SHOP
      </Typography>
      <Divider />
      <List id = 'my_component'>
         {((!loging) || (!logg)) && <ListItem key={navItems[0]} disablePadding>
            <ListItemButton sx={{ textAlign: 'center' }}>
              {<ListItemText primary={navItems[0]} onClick={handleSignUp}/>}
            </ListItemButton>
          </ListItem>}
          {((!loging) || (!logg))  &&
          (<ListItem key={navItems[1]} disablePadding>
            <ListItemButton sx={{ textAlign: 'center' }}>
              {<ListItemText primary={navItems[1]} onClick={handleLogin}/>}
            </ListItemButton>
          </ListItem>)}
          {((loging) && (logg)) &&
          (<ListItem key={navItems[2]} disablePadding>
            <ListItemButton sx={{ textAlign: 'center' }}>
              {<ListItemText primary={navItems[2]} onClick={handleClick}/>}
            </ListItemButton>
          </ListItem>)}
      </List>
    </Box>
  )

  const container = window !== undefined ? () => window().document.body : undefined

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <MyAppBar component="nav">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            SHOP
          </Typography>
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
             {((!loging) || (!logg)) && (< Button key={navItems[0]} sx={{ color: '#fff' }} onClick={handleSignUp}>
                {navItems[0]}
              </Button>)} 
             
             {((!loging) || (!logg))  && (<Button key={navItems[1]} sx={{ color: '#fff' }} onClick={handleLogin}>
                {navItems[1]}
              </Button>)}
              {((loging) && (logg))   && (<Button key={navItems[2]} sx={{ color: '#fff' }} onClick={handleClick}>
                {navItems[2]}
              </Button>)}
          </Box>
        </Toolbar>
      </MyAppBar>
      <Box component="nav">
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth }
          }}
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  )
}

DrawerAppBar.propTypes = {
  window: PropTypes.func
}

export default DrawerAppBar
