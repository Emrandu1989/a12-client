import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import { FaGoogle } from "react-icons/fa";
import { useState } from "react";
import { FaRegEye } from "react-icons/fa6";
import { FaEyeSlash } from "react-icons/fa";

const SignUp = () => {
     const {createUser, signInWithGoogle, } = useAuth()
      const navigate = useNavigate()
      const [showPassword, setShowPassword] = useState(false)
      
      const handleSignUp = event =>{
          event.preventDefault();
          const form = event.target;
          const email = form.email.value;
          const password = form.password.value;
           
          // Regular expressions for password validation
           const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/
           if(!passwordRegex.test(password)){
            Swal.fire({
              position: "center",
              icon: "error",
              title:
                "Password must have at least 6 characters, one uppercase, and one lowercase letter",
              showConfirmButton: false,
              timer: 3000,
            }); 
            return
           }
          const user = {email,password};
          console.log(user)
          createUser(email,password)
          .then(result => {
            const loggedUser = result.user;
            console.log(loggedUser)
             



            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "User Created Successfully",
                showConfirmButton: false,
                timer: 1500
              });
              navigate('/')
          })
          .catch(error=>{
                  console.log(error)
          })
          
      }

      const handleGoogleSignUp = ()=>{
          signInWithGoogle()
          .then(result=>{
              const loggedUser = result.user;
              console.log(loggedUser)
              Swal.fire({
                position: "top-end",
                icon: "success",
                title: "User login Successfully",
                showConfirmButton: false,
                timer: 1500
              });
              navigate('/')
          })
          .catch(error=>{
            console.log(error)
          })
      }
    return (
        <>
             <div className="hero min-h-screen bg-base-200">
  <div className="hero-content flex-col ">
   
    <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
      <form onSubmit={handleSignUp} className="card-body">
      <h1 className="text-5xl font-bold">Register Now</h1>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input type="email" name="email" placeholder="email" className="input input-bordered" required />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Role</span>
          </label>
          <select className="select select-bordered w-full max-w-xs">
  <option disabled selected>What is your Role?</option>
  <option>Employee</option>
  <option>HR</option>
</select>
        </div>
        <div className="form-control relative">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input type={showPassword ? "text" : "password"} name="password" placeholder="password" className="input input-bordered" required />
          <div className="absolute top-12 right-4 text-2xl" onClick={()=>setShowPassword(!showPassword)}>
              {showPassword ?  <FaEyeSlash/> : <FaRegEye />   }
          </div>
          <label className="label">
            <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
          </label>
        </div>
        <div className="form-control mt-6">
          <button className="btn btn-primary">SignUp</button>
        </div>
         <p className="text-center ">Already Have an account <Link className="btn btn-link" to='/login'>Login</Link> </p>
      </form>
         <div className="flex justify-center my-5">
         <button onClick={handleGoogleSignUp} className="btn"><FaGoogle /></button>
         </div>
    </div>
  </div>
</div>   
        </>
    );
};

export default SignUp;