import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";


const SignUp = () => {
     const {createUser} = useAuth()
      
      const handleSignUp = event =>{
          event.preventDefault();
          const form = event.target;
          const email = form.email.value;
          const password = form.password.value;
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
            <span className="label-text">Password</span>
          </label>
          <input type="password" name="password" placeholder="password" className="input input-bordered" required />
          <label className="label">
            <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
          </label>
        </div>
        <div className="form-control mt-6">
          <button className="btn btn-primary">SignUp</button>
        </div>
         <p className="text-center ">Already Have an account <Link className="btn btn-link" to='/login'>Login</Link> </p>
      </form>
    </div>
  </div>
</div>   
        </>
    );
};

export default SignUp;