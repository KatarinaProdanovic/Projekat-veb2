import React from 'react'
import { Outlet } from 'react-router-dom'
import { HomeHImage, HomeHImage1 } from './home.styles'
import shop from '../../components/images/imggg.png'
import { Grid } from '@mui/material'
import DrawerAppBar from '../../components/navigation/nav.component'
const Home = () => {
  return (
    <Grid container>
      <DrawerAppBar/>
       <Grid item xs={12} sm={12} md={12}> {/* postavljanje medija upita */}
       <HomeHImage>
       <HomeHImage1 src= {shop} alt ='A table full!'>
        </HomeHImage1>
        </HomeHImage>
        <Outlet/>
      </Grid>
   </Grid>
  )
}
export default Home
