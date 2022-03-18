import { createContext, useState } from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth"
import  {auth, so}  from '../firebase/firebase'

export const GlobalContext = createContext({});

const GlobalProvider=({children})=>{

    const [token, setToken]= useState(localStorage.getItem("token")|| "")
    const [isLoading, setIsLoading] = useState(false);
    const [isSigninError, setIsSigninError] = useState(true);
    const [loginError, setLoginError] = useState(false);

    


    const signUp=async({email, password})=>{
        setIsLoading(true);
        const userCredential = await createUserWithEmailAndPassword( auth, email, password)
        setIsLoading(false)
        if(userCredential){
            email="";
            password="";
        }
    }
    const signIn=async({email, password})=>{
        setIsLoading(true);
        try {
            const userCredential = await signInWithEmailAndPassword( auth, email, password)
        
            if(userCredential){
                console.log(userCredential.user)
                email="";
                password="";
                localStorage.setItem("token", userCredential.user.accessToken)
                setToken(userCredential.user.accessToken)
            
            }     
        } catch (error) {
            setLoginError(error.message);
            setIsSigninError(true);  
        }
        setIsLoading(false) 
    }


    const logOut=async()=>{
        await so
        setToken("")
        localStorage.removeItem("token")
    }



    return(
        <GlobalContext.Provider value={{token, setToken, signIn, signUp, isLoading, logOut, isSigninError, loginError}}>
            {children}
        </GlobalContext.Provider>
    )
}

export default GlobalProvider;