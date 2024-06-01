import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext(null)
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import app from "../firebase/firebase.config";
const AuthProvider = ({children}) => {
     const [user, setUser] = useState(null);
      

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
      
     useEffect(()=>{
          const unsubscribed =  onAuthStateChanged(auth, (currentUser) =>{
                  console.log('currentUser', currentUser);
                  setUser(currentUser)
            })
            return () =>{
                 return unsubscribed()
            }
     },[])

    const authInfo = {
         user,
        createUser,
        signIn, 
        logOut
    }
    return (
        <AuthContext.Provider value={authInfo}>
             {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;