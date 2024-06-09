import { Link } from 'react-router-dom';
import img from '../../assets/page-found-with-people-connecting-plug-concept-illustration_114360-1888.avif'

const ErrorPage = () => {
    return (
        <>
           <div className="flex justify-center flex-col items-center text-xl font-bold mt-24 space-y-6">
           
         
           <img className='h-[600px]'  src={img} alt="" />
             <div>
                  <Link to='/' className='btn btn-link'>Back To Home</Link>
             </div>
           </div>   
        </>
    );
};

export default ErrorPage;