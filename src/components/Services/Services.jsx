import { useEffect, useState } from "react";
import ServiceCard from "./ServiceCard";

const Services = () => {
  const [services, setServices] = useState([]);
  //       const axiosPublic = useAxiosPublic();
  //      axiosPublic.get("/services")
  //        .then(res=>{
  //               // //console.log(res.data)
  //              setServices(res.data)
  //        })

  useEffect(() => {
    fetch("http://localhost:3000/services")
      .then((response) => response.json())
      .then((json) => setServices(json));
  }, []);

  return (
    <>
      <div>
        <h3 className="text-3xl my-5 font-bold text-gray-400 text-center">
          Services Machine World are providing:
        </h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {services.map((service) => (
          <ServiceCard key={service._id} service={service}></ServiceCard>
        ))}
      </div>
    </>
  );
};

export default Services;
