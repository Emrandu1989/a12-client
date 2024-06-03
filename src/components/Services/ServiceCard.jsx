

const ServiceCard = ({service}) => {
    console.log(service)
      const {description, service_img, service_name} = service;
    return (
        <div>
            <div className="card  bg-base-100 shadow-xl">
  <figure className="px-10 pt-10">
    <img  src={service_img} alt="Shoes" className="rounded-xl w-[400px] h-[400px]" />
  </figure>
  <div className="card-body items-center text-center">
    <h2 className="card-title">{service_name}</h2>
    <p>{description}</p>
    <div className="card-actions">
      <button className="btn btn-primary btn-outline mt-2">Book Now</button>
    </div>
  </div>
</div>
        </div>
    );
};

export default ServiceCard;