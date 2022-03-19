import React, {useState} from 'react';
import { FacebookLoginButton, 
    GoogleLoginButton, 
    InstagramLoginButton, 
    TwitterLoginButton } from "react-social-login-buttons";
    import { 
        Box } from '@mui/material';

const SocialSignInButtons=()=>{



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
              <GoogleLoginButton  onClick={() => alert("Hello")} />
              <InstagramLoginButton onClick={() => alert("Hello")} />
              <FacebookLoginButton onClick={() => alert("Hello")} />
              <TwitterLoginButton onClick={() => alert("Hello")} />
            </Box>  
        
        </>

    )
}

export default SocialSignInButtons;