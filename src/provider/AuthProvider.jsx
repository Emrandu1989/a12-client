import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext(null)
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import app from "../firebase/firebase.config";
 const googleProvider = new GoogleAuthProvider();


const AuthProvider = ({children}) => {
     const [user, setUser] = useState(null);
     const [loading, setLoading] = useState(true)
      

    const auth = getAuth(app);

     const createUser = (email,password) =>{
          return createUserWithEmailAndPassword(auth, email,password)
     }
     const signIn = (email,password) =>{
         return  signInWithEmailAndPassword(auth,email,password,)
     }

      const logOut = () =>{
          return signOut(auth)
      }

      const signInWithGoogle = () =>{
            return signInWithPopup(auth, googleProvider)
      }

      const updateUserProfile = (name, photo) =>{
           return updateProfile(auth.currentUser, {
               displayName: name,
               photoURL: photo,
           })
      }

      
      
     useEffect(()=>{
          const unsubscribed =  onAuthStateChanged(auth, (currentUser) =>{
                  console.log('currentUser', currentUser);
                  setUser(currentUser)
                  setLoading(false)
            })
            return () =>{
                 return unsubscribed()
            }
     },[])

    const authInfo = {
         user,
        createUser,
        signIn, 
        logOut,
        signInWithGoogle,
        loading,
        updateUserProfile
    }
    return (
        <AuthContext.Provider value={authInfo}>
             {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;