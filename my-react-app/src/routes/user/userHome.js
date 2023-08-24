import React from 'react'
import { Outlet } from 'react-router-dom'
import { Logged } from '../sign-in/sign-in.component'

import { Grid } from '@mui/material'

import { useSelector } from 'react-redux'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Dashboard from '../../components/dashboard/dashboard'
const UserPage = () => {
  const navigate = useNavigate()
  const logg = useSelector(state => state.isLogg.isLogged);
  console.log(logg)
  //const token = localStorage.getItem("token")
 const [loging, setLoging] = useState(false)//inicijalno nema token(nije ulogovan)
  useEffect(() => {
   
   const i = Logged(JSON.parse(decodeURIComponent(atob(localStorage.getItem("token").split('.')[1].replace(/-/g, '+').replace(/_/g, '/'))))['exp'])
   console.log(i) 
   
      
     
   /*
      fetch('/api/Artikli')
      .then((response) => response.json())
      .then((actualData) => {dispatch(updateItems(actualData)); dispatch(updateItems1(actualData))});

      setChe(true) */
   
  }, [])
  
  return (
    <><div><Dashboard /></div></>
  )
}
export default UserPage
