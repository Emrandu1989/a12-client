import { createContext } from "react";

export const AuthContext = createContext(null)
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import app from "../firebase/firebase.config";
const AuthProvider = ({children}) => {

    const auth = getAuth(app);

     const createUser = (email,password) =>{
          return createUserWithEmailAndPassword(auth, email,password)
     }

    const authInfo = {
        createUser 
    }
    return (
        <AuthContext.Provider value={authInfo}>
             {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;