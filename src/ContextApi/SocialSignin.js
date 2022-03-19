import { createContext, useState } from "react";
import  {auth, so }  from '../firebase/firebase'
import { onAuthStateChanged } from "firebase/auth";

const SocialSigninContext = createContext({});
    
const SocialSigninProvider = ({children})=>{










    return(
        <SocialSigninContext.Provider value={{}}>
            {children}
        </SocialSigninContext.Provider>
    )
}

export default SocialSigninProvider;