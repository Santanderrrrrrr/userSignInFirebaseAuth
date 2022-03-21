import * as React from 'react';
import { useState, useContext } from 'react';
import {useNavigate} from 'react-router-dom';
import {GlobalContext} from '../ContextApi/GlobalContext'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Button,
  CssBaseline,
  TextField,
  FormControlLabel,
  Checkbox,
  Link,
  Grid,
  Box,
  Typography,
  Container } from '@mui/material';
import SocialSignInButtons from './SocialLoginButtons'





function Copyright(props) {


  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Dla disertacja
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function SignIn() {
//   const handleSubmit = (event) => {
//     event.preventDefault();
//     const data = new FormData(event.currentTarget);
//     console.log({
//       email: data.get('email'),
//       password: data.get('password'),
//     });
//   };

  const navigate = useNavigate()

  const  { signIn,
    isLoading, 
    token,
    isFacebookError,
    isSigninError, 
    loginError, 
     
    }  = useContext(GlobalContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const monitorAuthState=async()=>{
  //   onAuthStateChanged(auth, user=>{
  //       user ? setIsSigninError(false) : setIsSigninError(true)   
  //   })
  // }

  // useEffect(() => {
  //   monitorAuthState(auth, user)
  // }, [user])

  const signin =async(e)=>{
    e.preventDefault();
    const data={
      email, password
    }
    await signIn(data).then(()=>navigate(isLoading? "/signin":"/home"))
    

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
            Sign in
          </Typography>
          
          <Box component="form" onSubmit={signin} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />

            <Typography 
              variant="body2" 
              color="error" 
              display={isSigninError? "flex":"none"}>{loginError}
            </Typography>
            
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}

            >
              {isLoading?"Signing in...": "Sign In"}
            </Button>

            
              <SocialSignInButtons />
            

            <Grid container sx={{mb: 2 }}>
              <Grid item xs>
                <Link href="/" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link variant="body2" href='/signup'>
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>


            

          </Box>
        </Box>
        <Copyright sx={{ mt: 3, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}