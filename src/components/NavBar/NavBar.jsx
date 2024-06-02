import { NavLink } from "react-router-dom";
import logo from '../../assets/Logo-1.png'
import useAuth from "../../hooks/useAuth";


const NavBar = () => {
     const {user, logOut} = useAuth();
   
     console.log(user)
      const handleLogOut = () =>{
            logOut()
            .then(result=>{
                console.log(result)
            })
            .catch(error=>{
                 console.log(error)
            })
      }
      const navLinks = <>
            <li> <NavLink to='dashboard'>DashBoard</NavLink>  </li>
            <li> <NavLink to='contact'>Contact Us</NavLink>  </li>

          
             {
                 user ? <>
                   
                  <button onClick={handleLogOut}> LogOut </button>
                
                 </> : <>
                 <li> <NavLink to='login'>Login</NavLink>  </li>
                 <li> <NavLink to='signUp'>SignUp</NavLink>  </li>
                 </>
             }
      </>
    return (
        <>
            <div className="navbar bg-base-100">
  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
      </div>
      <ul tabIndex={0} className="menu menu-sm dropdown-content  mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
           {navLinks}
      </ul>
    </div>
    <a className="btn btn-ghost bg-black text-white text-xl">
         <img className="w-36 px-2" src={logo} alt="" />
        World</a>
  </div>
  <div className="navbar-center hidden  lg:flex">
    <ul className="menu menu-horizontal font-semibold text-gray-500 text-lg px-1">
    {navLinks}
    </ul>
  </div>
  <button className="navbar-end">
      
        {user ? user.email : <></>}
  </button>
</div>   
        </>
    );
};

export default NavBar;