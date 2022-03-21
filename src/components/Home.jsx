import React from 'react'
import {Typography, Card, Grid, Container, CardContent } from '@mui/material';
import NavBar from './NavBar'
import { auth } from '../firebase/firebase'

const Home = () => {

  
  const user =  auth.currentUser;

  return (
    <>
      <NavBar/>
      <Container sx={{my: 6.25}}>
        <Grid container justifyContent="center">
          <Grid item xl={6} lg={6} md={8} sm={8} xs={12}>
            <Card>
              <CardContent>
                <Typography component="div" variant="h3"> 
                  Hi {user?.displayName }
                </Typography>
              </CardContent>  
            </Card>  
          </Grid>
        </Grid>
      </Container>
    </>
  )
}

export default Home