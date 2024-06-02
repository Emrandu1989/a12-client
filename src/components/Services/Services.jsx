import { useEffect, useState } from "react";
import ServiceCard from "./ServiceCard";


const Services = () => {
    const [services, setServices] = useState([])
    console.log(services)
    useEffect(()=>{
           fetch("service.json")
           .then(res=>res.json())
           .then(data=>{
            setServices(data)
           })
    },[])
    return (
       <>  
               <div>
                      <h3 className="text-3xl my-5 font-bold text-gray-400 text-center">Services Machine World are providing:</h3>
               </div>
         <div className="grid grid-cols-3 gap-5">
            {services.map(service=><ServiceCard
             key={service.id}
             service={service}
            ></ServiceCard> )}
        </div>
       </>
    );
};

export default Services;