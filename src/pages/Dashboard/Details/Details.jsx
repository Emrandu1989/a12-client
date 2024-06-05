import { useLoaderData } from "react-router-dom";


const Details = () => {
     const userDetails = useLoaderData();
     console.log(userDetails)
     const {name, image, designation} = userDetails;
    return (
        <div className="flex justify-center">
            <div className="card  p-6 w-1/2 card-side bg-base-100 shadow-xl">
  <figure><img className="w-[300px] h-[200px]" src={image} alt="Movie"/></figure>
  <div className="card-body">
    <h2 className="card-title font-bold">Name:{name}</h2>
    <h4 className="text-xl font-semibold">Designation:{designation}</h4>
  
  </div>
</div>
        </div>
    );
};

export default Details;