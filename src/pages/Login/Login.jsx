
import { Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import Swal from 'sweetalert2';

const Login = () => {
      const {signIn} = useAuth()

      const handleLogin = (event) =>{
          event.preventDefault();
          const form = event.target;
          const email = form.email.value;
          const password = form.password.value;
          const user = {email,password};
          console.log(user)
          signIn(email,password)
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
          })
          .catch(error=>{
             console.log(error)
          })
      }
    return (
        <>
        <div className="hero min-h-screen bg-base-200">
<div className="hero-content flex-col ">

<div className="card w-full  shadow-2xl bg-base-100">
 <form onSubmit={handleLogin} className="card-body">
 <h1 className="text-4xl text-center text-pink-300 font-bold">Login Now</h1>
   <div className="form-control">
     <label className="label">
       <span className="label-text">Email</span>
     </label>
     <input type="email" name='email' placeholder="email" className="input input-bordered" required />
   </div>
   <div className="form-control">
     <label className="label">
       <span className="label-text">Password</span>
     </label>
     <input type="password" name='password' placeholder="password" className="input input-bordered" required />
     <label className="label">
       <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
     </label>
   </div>
   <div className="form-control mt-6">
     <button className="btn btn-primary">Login</button>
   </div>
   <p className="text-center ">New To This Site Please <Link className="btn btn-link" to='/signUp'>SignUp</Link> </p>
 </form>
</div>
</div>
</div>   
   </>
    );
};

export default Login;