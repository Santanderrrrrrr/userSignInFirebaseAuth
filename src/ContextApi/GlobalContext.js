import { createContext, useState } from "react";
import { createUserWithEmailAndPassword,  
    linkWithRedirect,
    signInWithEmailAndPassword, 
    GoogleAuthProvider,
    FacebookAuthProvider,
    TwitterAuthProvider, 
    signInWithPopup,
    fetchSignInMethodsForEmail,
    
     } from "firebase/auth"
import  {auth, so }  from '../firebase/firebase'


export const GlobalContext = createContext({});

const GlobalProvider=({children})=>{

    const [token, setToken]= useState(localStorage.getItem("token")|| "")
    const [isLoading, setIsLoading] = useState(false);
    const [isSigninError, setIsSigninError] = useState(true);
    const [loginError, setLoginError] = useState("");
    const [user, setUser] = useState({});
    const [currEmail, setCurrEmail] = useState('');
    const [currPassword, setCurrPassword] = useState('');
    const [isFacebookError, setIsFacebookError] = useState(false)
    const [facebookCred, setFacebookCred] = useState(false)

    

    

    

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
        
            await signInWithEmailAndPassword( auth, email, password).then((res)=>
                {
                    if(res){
                        setUser(res.user)
                        if(isFacebookError){
                            res.user.linkWithCredential(facebookCred)
                        }
                        email="";
                        password="";
                        localStorage.setItem("token", res.user.accessToken)
                        setToken(res.user.accessToken)
                        
                    } 
                }
            )
            .catch ((error)=> {
                setLoginError(error.message);
            })
        
        setIsLoading(false) 
        
    }

    
    


    const logOut=async()=>{
        await so
        setToken("")
        localStorage.removeItem("token")
        setLoginError("");
    }



    const googleSignIn=async()=>{
        setIsLoading(true);
        const provider = new GoogleAuthProvider();
        await signInWithPopup(auth, provider).then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            localStorage.setItem("token", credential.accessToken)
            setToken(credential.accessToken)
            if(isFacebookError){
                const provider = new FacebookAuthProvider();
                // result.user.linkWithCredential(facebookCred)
                linkWithRedirect(auth.currentUser, provider).then((result) => {
                    const credential = FacebookAuthProvider.credentialFromResult(result)
                    localStorage.setItem("token", credential.accessToken)
                    setUser(result.user);
                }
                )}
            
            // The signed-in user info.
            setUser(result.user);
            console.log(result.user);
            console.log(credential);

            setIsLoading(false)
        // ...
        })
    }

    



    const facebookSignIn=async()=>{
        
        const provider = new FacebookAuthProvider();
        provider.addScope('public_profile','email');

        await signInWithPopup(auth, provider).then((result) => {
                setUser(result.user)
                console.log(result.user)
                

                // This gives you a Facebook Access Token. You can use it to access the Facebook API.
                const credential = FacebookAuthProvider.credentialFromResult(result);
                console.log(credential)
                setToken(credential.accessToken);
                console.log(credential)
                setIsLoading(false)

            }).catch((error)=>{
                if (error.message.includes("with-different-credential")){
                    setLoginError("Account exists with different credentials. Please Sign In to link the existing email with your facebook account") ;
                    setFacebookCred(FacebookAuthProvider.credentialFromError(error))                    
                }
                setIsFacebookError(true);
            })
            
    }



    const twitterSignIn=async()=>{
        
        const provider = new TwitterAuthProvider();

        await signInWithPopup(auth, provider)
            .then((result) => {
                setUser(result.user)
                console.log(result.user)

                // This gives you a Facebook Access Token. You can use it to access the Facebook API.
                const credential = TwitterAuthProvider.credentialFromResult(result);
                setToken(credential.accessToken);
                console.log(credential)
                setIsLoading(false)
            }).catch((error)=>{
                setLoginError(error.message)
            })
            
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
            loginError,
            googleSignIn,
            facebookSignIn,
            twitterSignIn,
            currEmail,
            setCurrPassword,
            isFacebookError,
            setIsFacebookError
        }}>
            {children}
        </GlobalContext.Provider>
    )
}

export default GlobalProvider;