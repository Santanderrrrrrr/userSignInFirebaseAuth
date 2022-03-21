import { createContext, useState } from "react";
import { createUserWithEmailAndPassword,  
    signInWithEmailAndPassword, 
    GoogleAuthProvider,
    // FacebookAuthProvider,
    TwitterAuthProvider, 
    signInWithPopup,
    fetchSignInMethodsForEmail,
    currentUser
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
            setToken(credential.accessToken);
            // The signed-in user info.
            setUser(result.user);
            console.log(result.user);
            console.log(credential);

            setIsLoading(false)
        // ...
        })
    }

    const promptUserForPassword=async()=>{
        console.log("isfacebookError")
        return isFacebookError?{currPassword}: "";
    }



    // const facebookSignIn=async()=>{
        
    //     const provider = new FacebookAuthProvider();
    //     provider.addScope('public_profile','email');

    //     await signInWithPopup(auth, provider)
    //         .then((result) => {
    //             setUser(result.user)
    //             console.log(result.user)
    //             // console.log(result.user)

    //             // This gives you a Facebook Access Token. You can use it to access the Facebook API.
    //             const credential = FacebookAuthProvider.credentialFromResult(result);
    //             // console.log(credential)
    //             setToken(credential.accessToken);
    //             // console.log(credential)
    //             setIsLoading(false)
    //         }).catch((error)=>{
    //             setIsFacebookError(true)
    //             const credential = FacebookAuthProvider.credentialFromError(error);
    //             const email=error.customData.email;
    //             fetchSignInMethodsForEmail(auth, email).then(async (methods)=>{
    //                 if(methods[0]==='password'){
    //                     var password = await promptUserForPassword();
    //                     signInWithEmailAndPassword( auth, email, password).then((result)=>{
    //                         return result.user.linkWithCredential(credential);
    //                     }).then(()=>{
    //                         setIsLoading(false);
    //                         setIsFacebookError(false);
    //                     })
    //                     return
    //                 }
    //                 var provider = currentUser.provider(methods[0]);
    //             })


    //         })
    //         console.log(isFacebookError)
    // }

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
            // facebookSignIn,
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