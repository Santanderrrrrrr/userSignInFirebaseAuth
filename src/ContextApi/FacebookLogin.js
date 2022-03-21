import { useContext } from 'react';
import {   
    signInWithEmailAndPassword, 
    
    FacebookAuthProvider,
     
    signInWithPopup, 
    fetchSignInMethodsForEmail} from "firebase/auth"
import  {auth }  from '../firebase/firebase'


const facebookSignIn=async()=>{
        
    const provider = new FacebookAuthProvider();

    await signInWithPopup(auth, provider)
        .then((result) => {
            setUser(result.user)
            console.log(result.user)
            // console.log(result.user)

            // This gives you a Facebook Access Token. You can use it to access the Facebook API.
            const credential = FacebookAuthProvider.credentialFromResult(result);
            setToken(credential.accessToken);
            // console.log(credential)
            setIsLoading(false)
        }).catch((error)=>{
            // console.log(error.message)
            const credential= FacebookAuthProvider.credentialFromError(error)
            const email=error.email;
            fetchSignInMethodsForEmail(auth, email).then(methods=>{
                if(methods[0] === 'password'){
                    const password = promptUserForPassword();
                    signInWithEmailAndPassword(email,password).then(result=>{
                        return result.user.linkWithCredentials(credential)
                    }).then(()=>{
                        setIsLoading(false);
                    })
                }
            })




            setToken(credential.accessToken);
            console.log(credential)
            setToken(credential.accessToken);
        // The signed-in user info.
            setUser(error.user);
            setIsLoading(false)
        })
}




setIsFacebookError(true);
                
const credential= FacebookAuthProvider.credentialFromError(error)
setUser(error.user);

setCurrEmail(error.email);
console.log(currEmail);
fetchSignInMethodsForEmail(auth, currEmail).then(methods=>{
    if(methods[0] === 'password'){
        promptUserForPassword();
        signInWithEmailAndPassword(email,currPassword).then(result=>{
            return result.user.linkWithCredentials(credential)
        }).then(()=>{
            setIsLoading(false);
        })
    }
})
// setToken(credential.accessToken);
// console.log(credential);
// setToken(credential.accessToken);
// // The signed-in user info.
// setUser(error.email);

// setIsLoading(false)

