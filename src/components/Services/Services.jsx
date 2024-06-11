import { useEffect, useState } from "react";
import ServiceCard from "./ServiceCard";

const Services = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    const fetchServices = async () => {
      const response = await fetch(
        "https://machine-world-server.vercel.app/services"
      );
      const json = await response.json();
      setServices(json);
    };

    fetchServices();
  }, []);

  return (
    <div className="flex justify-center items-center flex-col   py-8">
      <h3 className="text-3xl my-5 font-bold text-gray-400 text-center  ">
        Discover Our Cutting-Edge Services
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service) => (
          <ServiceCard key={service._id} service={service} />
        ))}
      </div>
    </div>
  );
};

export default Services;
