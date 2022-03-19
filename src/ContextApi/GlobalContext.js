import { createContext, useState } from "react";
import { createUserWithEmailAndPassword,  signInWithEmailAndPassword } from "firebase/auth"
import  {auth, so }  from '../firebase/firebase'

export const GlobalContext = createContext({});

const GlobalProvider=({children})=>{

    const [token, setToken]= useState(localStorage.getItem("token")|| "")
    const [isLoading, setIsLoading] = useState(false);
    const [isSigninError, setIsSigninError] = useState(true);
    const [loginError, setLoginError] = useState("");
    const [user, setUser] = useState({});

    

    

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
            await signInWithEmailAndPassword( auth, email, password).then((res)=>
            
                {
                    if(res){
                        setUser(res.user)
                        email="";
                        password="";
                        localStorage.setItem("token", res.user.accessToken)
                        setToken(res.user.accessToken)
                    } 
                }
            )
        } catch (error) {
            setLoginError(error.message);
              
        }
        console.log(token)
        console.log(user)
        setIsLoading(false) 
        
    }

    
    


    const logOut=async()=>{
        await so
        setToken("")
        localStorage.removeItem("token")
        
    }



    return(
        <GlobalContext.Provider value={{ auth,
            user, 
            token, 
            setToken, 
            signIn,
            signUp, 
            isLoading, 
            logOut, 
            setIsSigninError,
            isSigninError, 
            loginError
        }}>
            {children}
        </GlobalContext.Provider>
    )
}

export default GlobalProvider;