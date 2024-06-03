import Banner from "../../components/Banner/Banner";
import ChooseUs from "../../components/ChooseUs/ChooseUs";
import Faq from "../../components/FaqSection/Faq";

import Services from "../../components/Services/Services";
import Testimonials from "../../components/Testimonials/Testimonials";

 

const Home = () => {
    return (
        <div>
             <Banner/>
             <Services />
             <ChooseUs />
             <Testimonials/>
             <Faq />
            
        </div>
    );
};

export default Home;