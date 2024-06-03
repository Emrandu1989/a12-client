import { useEffect, useState } from "react";


import { Swiper, SwiperSlide } from "swiper/react";
import '@smastrom/react-rating/style.css'

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { Rating } from "@smastrom/react-rating";

const Testimonials = () => {
  const [reviews, setReviews] = useState([]);
  useEffect(() => {
    fetch("reviews.json")
      .then((res) => res.json())
      .then((data) => {
        setReviews(data);
      });
  }, []);
  return (
    <>
      <section className="my-20">
        
                <h2 className="text-center text-3xl text-gray-400 font-bold">Feedback of our Customers</h2>

        <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
          {reviews.map((review) => (
            <SwiperSlide key={review._id}>

              <div className="my-16 mx-24 flex flex-col items-center">
              <h3 className="text-2xl text-orange-400">{review.name}</h3>
                <p className="py-5">{review.details}</p>
                <Rating style={{ maxWidth: 180 }} value={review.rating} readOnly />
              
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
    </>
  );
};

export default Testimonials;
