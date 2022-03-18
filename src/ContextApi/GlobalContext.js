import { createContext, useState } from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth"
import  {auth, so }  from '../firebase/firebase'
import { onAuthStateChanged } from "firebase/auth";

export const GlobalContext = createContext({});

const GlobalProvider=({children})=>{

    const [token, setToken]= useState(localStorage.getItem("token")|| "")
    const [isLoading, setIsLoading] = useState(false);
    const [isSigninError, setIsSigninError] = useState(true);
    const [loginError, setLoginError] = useState("");
    const [user, setUser] = useState("");

    

    const monitorAuthState=async()=>{
        onAuthStateChanged(auth, user=>{
            user ? setIsSigninError(false) : setIsSigninError(true)   
        })
    }

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
                setUser(userCredential.user)
                email="";
                password="";
                localStorage.setItem("token", userCredential.user.accessToken)
                setToken(userCredential.user.accessToken)
            }     
        } catch (error) {
            setLoginError(error.message);
              
        }
        console.log({token})
        setIsLoading(false) 
        monitorAuthState(auth, user)
    }

    
    


    const logOut=async()=>{
        await so
        setToken("")
        localStorage.removeItem("token")
        monitorAuthState(auth, user)
    }



    return(
        <GlobalContext.Provider value={{token, setToken, signIn, signUp, isLoading, logOut, isSigninError, loginError}}>
            {children}
        </GlobalContext.Provider>
    )
}

export default GlobalProvider;