import React, { useContext} from 'react';
import { 
  FacebookLoginButton, 
    GoogleLoginButton,  
    TwitterLoginButton } from "react-social-login-buttons";
import {Box } from '@mui/material';
import {GlobalContext} from '../ContextApi/GlobalContext'
import {useNavigate} from 'react-router-dom';


const SocialSignInButtons=()=>{

    const {googleSignIn, 
        isLoading,
        facebookSignIn,
        twitterSignIn} = useContext(GlobalContext);
      const navigate = useNavigate()

    const googleSi=async()=>{
        await googleSignIn().then(()=>navigate(isLoading? "/Signin":"/Home"));
    }
    const facebookSi=async()=>{
        await facebookSignIn().then(()=>navigate(isLoading? "/Signin":"/Home"));
    }
    const twitterSi=async()=>{
        await twitterSignIn().then(()=>navigate(isLoading? "/Signin":"/Home"));
    }


    return (
        <>
            {/*social login buttons*/}
            <Box
              sx={{
                marginTop: 2,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <GoogleLoginButton  onClick={googleSi} />
              <FacebookLoginButton onClick={facebookSi} />
              <TwitterLoginButton onClick={twitterSi} />
            </Box>  
        
        </>

    )
}

export default SocialSignInButtons;