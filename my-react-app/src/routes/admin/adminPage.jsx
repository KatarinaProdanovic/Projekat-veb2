import React from 'react'
import { Outlet } from 'react-router-dom'
import { Logged } from '../sign-in/sign-in.component'

import { Grid } from '@mui/material'

import { useSelector } from 'react-redux'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Dashboard from '../../components/dashboard/dashboard'

const AdminPage = () => {
  const navigate = useNavigate()
  const logg = useSelector(state => state.isLogg.isLogged);
  console.log(logg)
  //const token = localStorage.getItem("token")
 
  
  return (
    <div><Dashboard/></div>
   
  )
}
export default AdminPage
