import React from 'react'
import { Outlet } from 'react-router-dom'
import { Logged } from '../sign-in/sign-in.component'

import { Grid } from '@mui/material'

import { useSelector } from 'react-redux'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
const SelerPage = () => {
  const navigate = useNavigate()
  const logg = useSelector(state => state.isLogg.isLogged);
  console.log(logg)
  //const token = localStorage.getItem("token")
 const [loging, setLoging] = useState(false)//inicijalno nema token(nije ulogovan)
  useEffect(() => {
   
   const i = Logged(JSON.parse(decodeURIComponent(atob(localStorage.getItem("token").split('.')[1].replace(/-/g, '+').replace(/_/g, '/'))))['exp'])
   console.log(i) 

          if(!i){
       alert("Istekao vam je token")
        navigate("/")
          }
      
     
   /*
      fetch('/api/Artikli')
      .then((response) => response.json())
      .then((actualData) => {dispatch(updateItems(actualData)); dispatch(updateItems1(actualData))});

      setChe(true) */
   
  }, [])
  
  return (
    <Grid container>
       <Grid item xs={12} sm={12} md={12}> {/* postavljanje medija upita */}
       <h1>Welcome seller </h1>
        <Outlet/>
      </Grid>
   </Grid>
  )
}
export default SelerPage
