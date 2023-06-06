import { React } from 'react'
import { Routes, Route } from 'react-router-dom'
// import MainHeader from './routes/navigation/main.component'
// import Navigation from './routes/navigation/navigation.component'
import Home from './routes/home/home.component'
import { Grid } from '@mui/material'
import DrawerAppBar from '../src/components/navigation/nav.component'
import SignUp from './routes/sign-up/sign-up.component'
import SignIn from './routes/sign-in/sign-in.component'
const App = () => {
  // const dispatch = useDispatch();
return (
    <Grid container spacing={6}>
       <Grid item xs={12} sm={12} md={12}> {/* postavljanje medija upita */}
       <DrawerAppBar/>
      </Grid>
      <Grid item xs={12} sm={12} md={12}> {/* postavljanje medija upita */}
      <Routes>
     <Route path='/' element={<Home />}/>
     <Route path='/signup' element={<SignUp />}/>
     <Route path='/signin' element={<SignIn />}/>
    
    </Routes>
      </Grid>
   </Grid>
  )
}

export default App
