import { React } from 'react'
import { Routes, Route } from 'react-router-dom'
// import MainHeader from './routes/navigation/main.component'
// import Navigation from './routes/navigation/navigation.component'
import Home from './routes/home/home.component'
import { Grid } from '@mui/material'
import DrawerAppBar from '../src/components/navigation/nav.component'
import SignUp from './routes/sign-up/sign-up.component'
import SignIn from './routes/sign-in/sign-in.component'
import UserPage from './routes/user/userHome'
import SelerPage from './routes/seller/sellerPage'
import { IsUser, Logged, IsSeller, IsAdmin } from './routes/sign-in/sign-in.component'
import { useSelector} from 'react-redux'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import AdminPage from "../src/routes/admin/adminPage"
import ArticleCompo from './routes/seller/articleEdit'
const App = () => {
  const navigate = useNavigate()
  const [loging, setLoging] = useState(false)//inicijalno nema token(nije ulogovan)
  const [userRole, setUserRole] = useState(false)//inicijalno nema token(nije ulogovan)
  const [selerRole, setSelerRole] = useState(false)
  const [adminRole, setAdminRole] = useState(false)

  const logg = useSelector(state => state.isLogg.isLogged);
  useEffect(() => {
   
   const i = Logged(JSON.parse(decodeURIComponent(atob(localStorage.getItem("token").split('.')[1].replace(/-/g, '+').replace(/_/g, '/'))))['exp'])
      setLoging(i)//ako je token istekao onda je false
      
      
      //ako je user vraca true
     const roleIsUser = IsUser(JSON.parse(decodeURIComponent(atob(localStorage.getItem("token").split('.')[1].replace(/-/g, '+').replace(/_/g, '/'))))['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'])
     setUserRole(roleIsUser)
      
     const roleIsSeler = IsSeller(JSON.parse(decodeURIComponent(atob(localStorage.getItem("token").split('.')[1].replace(/-/g, '+').replace(/_/g, '/'))))['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'])
     setSelerRole(roleIsSeler)

     const roleIsAdmin = IsAdmin(JSON.parse(decodeURIComponent(atob(localStorage.getItem("token").split('.')[1].replace(/-/g, '+').replace(/_/g, '/'))))['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'])
     setAdminRole(roleIsAdmin)
      /*
      fetch('/api/Artikli')
      .then((response) => response.json())
      .then((actualData) => {dispatch(updateItems(actualData)); dispatch(updateItems1(actualData))});

      setChe(true) */
  
     
   
  }, [loging, userRole, logg, selerRole])
 
console.log(userRole)
console.log(selerRole)
console.log(loging)
console.log(logg)
return (
    <Grid container spacing={6}>
       <Grid item xs={12} sm={12} md={12}> {/* postavljanje medija upita */}
     
      </Grid>
      <Grid item xs={12} sm={12} md={12}> {/* postavljanje medija upita */}
      <Routes>
      

     
     
    <Route path='/signup' element={<SignUp />}/>
     <Route path='/signin' element={<SignIn />}/>
     <Route path='/edit-article' element={< ArticleCompo/>}/>
     {(userRole &&  loging && logg ) ? (<Route path='/userPage' element={<UserPage />}/> ) : (<Route path='/' element={<Home />}/>)}
     {(selerRole &&  loging && logg ) ? (<Route path='/sellerPage' element={<SelerPage />}/> ) : (<Route path='/' element={<Home />}/>)}
     {(adminRole &&  loging && logg ) ? (<Route path='/adminPage' element={<AdminPage />}/> ) : (<Route path='/' element={<Home />}/>)}
    
    </Routes>
      </Grid>
   </Grid>
  )
}

export default App
