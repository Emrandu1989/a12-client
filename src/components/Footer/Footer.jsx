import logo from '../../assets/Logo-1.png'
 import { FaFacebook,FaLinkedin,FaTwitter,FaYoutube  } from "react-icons/fa";


const Footer = () => {
    return (
        <div>
            <footer className="footer p-10 bg-black text-white">
  <nav>
   
    <a className="link link-hover">
         <img className='w-[200px]' src={logo} alt="" />
    </a>
     <p>Machinex is a world best tech Company. <br /> It provide various service for their customers</p>
      <div className='flex gap-6 mt-6'>
      <FaFacebook  className='text-2xl'/>
     <FaTwitter className='text-2xl' />
      <FaLinkedin  className='text-2xl'/>
     <FaYoutube  className='text-2xl'/>
      </div>

     
    
  </nav> 
   <div className='flex gap-24'>
   <nav className='flex flex-col '>
    <h6 className="footer-title">Company</h6> 
    <a className="link link-hover">About us</a>
    <a className="link link-hover">Contact</a>
    <a className="link link-hover">Jobs</a>
    <a className="link link-hover">Press kit</a>
  </nav> 
  <nav className='flex flex-col'>
    <h6 className="footer-title">Legal</h6> 
    <a className="link link-hover">Terms of use</a>
    <a className="link link-hover">Privacy policy</a>
    <a className="link link-hover">Cookie policy</a>
  </nav> 
   </div>
  <form>
    <h6 className="footer-title">Newsletter</h6> 
    <fieldset className="form-control w-80">
      <label className="label">
        <span className="label-text">Enter your email address</span>
      </label> 
      <div className="join">
        <input type="text" placeholder="username@site.com" className="input input-bordered join-item" /> 
        <button className="btn btn-primary join-item">Subscribe</button>
      </div>
    </fieldset>
  </form>
</footer>
        </div>
    );
};

export default Footer;