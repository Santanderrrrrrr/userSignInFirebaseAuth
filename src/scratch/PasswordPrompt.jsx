import React, { useContext, useState } from 'react'
import { Typography,
    Box,
    Container,
    Grid,
    Button,
    CssBaseline,
    TextField } from '@mui/material'
import { GlobalContext } from '../ContextApi/GlobalContext'
import { createTheme, ThemeProvider } from '@mui/material/styles';



const PasswordPrompt = () => {

    const [password, setPassword] = useState("");
    const theme = createTheme();
    const { currEmail, setCurrPassword, setIsFacebookError } = useContext(GlobalContext);

    const passwordSubmit =async(e)=>{
        e.preventDefault();
        const data={
          password
        }
        setCurrPassword(data)
        setIsFacebookError(false)
    }


  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          
          <Typography component="h1" variant="h5">
            An account with a similar email {currEmail} has been found. Enter the password to allow Facebook login.
          </Typography>
          <Box component="form" noValidate onSubmit={passwordSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  value={password}
                  onChange={(e)=>setPassword(e.target.value)}
                />
              </Grid>
              
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Submit
            </Button>
            
          </Box>
        </Box>
        
      </Container>
    </ThemeProvider>
  )
}

export default PasswordPrompt