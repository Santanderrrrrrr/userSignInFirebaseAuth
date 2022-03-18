import React, {useContext} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AppBar, Toolbar, Box, Button, Typography } from '@mui/material'
import {GlobalContext} from "../ContextApi/GlobalContext"

const Home = () => {
  const { logOut, token } = useContext(GlobalContext)
  const navigate = useNavigate();

  const logout=()=>{
    logOut()
    
    navigate('/Signin')

    
  }
  return (
    <>
      <AppBar position="static" className="bg-dark">
        
        <Box sx={{ display: 'flex' , justifyContent: 'space-between'}}>
          <Toolbar>
            <Link sx={{mx: 1.25}} to='/'>Home</Link>   
          </Toolbar>    
          <Box sx={{ width: '30%'}}>
            <Toolbar sx={{display: 'flex', wrap: "wrap", justifyContent: 'space-between'}}>
              {token?(
                <Button variant="contained" color="error" onClick={logout} to='/signin'>Log Out</Button> 

              ):(
                <Typography variant="h6" color="error"> Token Error</Typography>
              )}               
            </Toolbar>
          </Box>
        </Box>    
        
      </AppBar>
    </>
  )
}

export default Home