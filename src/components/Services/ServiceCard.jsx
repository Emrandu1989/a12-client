const ServiceCard = ({ service }) => {
  const { description, service_img, service_name } = service;

  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white">
      <img className="w-full h-64 object-cover" src={service_img} alt={service_name} />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{service_name}</div>
        <p className="text-gray-700 text-base">{description}</p>
      </div>
      <div className="px-6 pt-4 pb-2">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full w-full">
          Book Now
        </button>
      </div>
    </div>
  );
};

export default ServiceCard;
